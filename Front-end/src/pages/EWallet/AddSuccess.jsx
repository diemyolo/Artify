import React, { useState, useEffect } from "react";
import { Button, Result } from "antd";
import axios from "axios";
const AddSuccess = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const [transaction,setTransaction] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/auth/getTransaction?id=${id}`)
      .then((response) => {
        console.log(response.data);
        setTransaction(response.data.payload);
      });
  },[]);
  return (
    <div>
      <Result
        status="success"
        title="Hoàn thành giao dịch"
        subTitle={`Mã giao dịch : ${transaction.transactionId}`}
        extra={[
          <Button type="primary" key="console">
            Nạp thêm
          </Button>,
          <Button key="buy">Về Trang Chủ</Button>,
        ]}
      />

      
    </div>
  );
};

export default AddSuccess;
