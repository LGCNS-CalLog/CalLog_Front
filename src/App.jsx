import { useState } from "react";

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Layout>
          <Routes></Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
