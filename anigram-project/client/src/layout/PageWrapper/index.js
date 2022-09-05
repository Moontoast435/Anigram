import React from "react";
import { Outlet } from "react-router-dom";

const PageWrapper = () => {
  return (
    <>
      <h1>test wrapper</h1>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default PageWrapper;
