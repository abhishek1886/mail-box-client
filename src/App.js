import React from "react";

import Header from "./components/layout/Header";
import AuthPage from "./components/pages/AuthPage";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <AuthPage />
    </React.Fragment>
  );
};

export default App;
