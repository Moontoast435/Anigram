import React from "react";
import { Outlet } from "react-router-dom";

const PageWrapper = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
      <footer>test</footer>
    </>
  );
};

export default PageWrapper;
