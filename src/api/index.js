import axios from "axios";
import qs from "qs";

import {
  login,
  logout,
  triggerBan,
  maintenance,
} from "../redux/Token/tokenSlice";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let storeRef = null;
export const injectStore = (_store) => {
  storeRef = _store;
};

// --- 요청 인터셉터 ---
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = storeRef?.getState().token.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const handleLogoutForInterceptor = () => {
  storeRef?.dispatch(logout());
  window.location.href = "/expired-page";
  console.error("User logged out from interceptor due to token issues.");
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const currentRefreshToken = storeRef?.getState().token.refreshToken;

    if (
      error.response?.status === 401 &&
      error.response.data?.message === "관리자에 의해 삭제처리된 계정입니다."
    ) {
      storeRef?.dispatch(triggerBan());
      window.location.href = "/banned-user-page";
      return Promise.reject(error);
    }

    if (
      error.response?.status === 503 &&
      error.response.data?.message === "현재 서버 점검 중입니다."
    ) {
      storeRef?.dispatch(maintenance());
      window.location.href = "/maintenance-page";
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/members/refresh"
    ) {
      if (error.response.data?.message === "로그아웃된 토큰입니다.") {
        handleLogoutForInterceptor();
        return Promise.reject(
          new Error(
            error.response.data?.message || "Invalid token, user logged out."
          )
        );
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newAccessToken) => {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      if (!currentRefreshToken) {
        isRefreshing = false;
        processQueue(new Error("Refresh token not found."), null);
        handleLogoutForInterceptor();
        return Promise.reject(
          new Error("Refresh token not found. Cannot refresh.")
        );
      }

      try {
        console.log("Attempting to refresh token...");
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/user/refresh`,
          { refreshToken: currentRefreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const responseData = refreshResponse.data;

        if (responseData?.code === "OK" && responseData.data?.access?.token) {
          const newAccessToken = responseData.data.access.token;
          console.log("New access token obtained:", newAccessToken);

          // accessToken만 업데이트, refreshToken은 그대로 유지
          storeRef?.dispatch(
            login({
              accessToken: newAccessToken,
              refreshToken: currentRefreshToken,
            })
          );

          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);

          return apiClient(originalRequest);
        } else {
          console.error(
            "New access token not found in refresh response:",
            responseData
          );
          throw new Error("New access token not found or invalid response.");
        }
      } catch (refreshError) {
        console.error(
          "Failed to refresh token:",
          refreshError.response?.data || refreshError.message
        );
        processQueue(refreshError, null);
        handleLogoutForInterceptor();
        const errMsg =
          refreshError.response?.data?.message ||
          refreshError.message ||
          "Failed to refresh token.";
        return Promise.reject(new Error(errMsg));
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
