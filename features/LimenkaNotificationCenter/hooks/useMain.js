import React, { useEffect, useState } from "react";
import SkeletonFeatureService from "../services";
import { heads, initialData } from "../data";

export default function useMain() {
  const instance = new SkeletonFeatureService();
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  const [data, setData] = useState(initialData);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let resp = await instance.getData();
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const handleClickDeleteKeyWord = () => {
    setKeyword("");
  };

  return {
    results,
    count,
    keyword,
    isOpenPreview,

    tableData: {
      heads,
      data,
    },
  };
}
