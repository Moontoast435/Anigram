import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

const NotFoundPage = () => {
  const navigator = useNavigate();

  const handleBack = () => {
    navigator(-1);
  };

  return (
    <>
      <Button
        onClick={(e) => {
          handleBack(e);
        }}
        text={<>Go Back</>}
      />
    </>
  );
};

export default NotFoundPage;
