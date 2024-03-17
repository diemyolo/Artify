import React, { useEffect } from "react";
import axios from "axios";

const CheckOCB = () => {
  const api_key =
    "TC5LVQ71BIQUPRNWGJHJNLTQGO3ESUTYJPXSFLKZWV4YSMGWZ8M0TBOABIFXPMHX";
//   axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
//   axios.defaults.headers.common["Access-Control-Allow-Headers"] =
//     "Origin, X-Requested-With, Content-Type, Accept";
  // useEffect(() => {
  //   const response = axios.get(
  //     "https://my.sepay.vn/userapi/transactions/list",
  //     {
  //       headers: { Authorization: `Bearer ${api_key}` },
  //     }
  //   );
  //   console.log(response);
  // });
  return <div>CheckOCB</div>;
};

export default CheckOCB;
