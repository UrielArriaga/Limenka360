import React, { useState } from "react";

export default function useOptions() {
  const [options, setOptions] = useState({
    paymentaccount: [],
    taxregimendef: [],
    cfdidef: [],
    paymentwaydef: [],
    paymentmethod: [],
    typesales: [],
  });
  return {
    options,
    setOptions,
  };
}
