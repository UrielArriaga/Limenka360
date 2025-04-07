import React, { useState } from "react";
import SkeletonFeatureService from "../services";

export default function useDirLogOrdenesCompras() {
  const instance = new SkeletonFeatureService();
  const [results, setResults] = useState([]);
  return {
    results,
  };
}
