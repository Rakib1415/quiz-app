import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Analysis from "../Analysis";
import Summary from "../Summary";

const Result = () => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state);

  return (
    <>
      <Summary />
      <Analysis />
    </>
  );
};

export default Result;
