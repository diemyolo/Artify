import React, { useEffect, useState } from 'react'
import NavBar from "../../components/NavBar";
import {Button} from 'antd';
import { Spin } from "antd";
import axios from "axios";
const AddMoneyInput = () => {
  const [inputMoney, setInputMoney] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const showLoader = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleAmountChange = (e) => {
    setInputMoney(e.target.value);
  };

  const addToWallet = () => {
    const requestData = {
      input_money: inputMoney,
    };
    axios
      .post(`http://localhost:8080/api/auth/pay?input_money=${inputMoney}`)
      .then((response) => {
        console.log(response.data);
        window.location.href = response.data;
      })
      .catch((error) => {
        console.error("Error adding to wallet:", error);
      });
  };
  return (
	<div>
	<div className="flex items-center">
	<label htmlFor="price" className="mr-5 block text-sm font-medium leading-6 text-gray-900">
        Số tiền muốn nạp
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="mr-5 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="mr-5 text-gray-500 sm:text-sm">VND</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="block rounded-md border-0 py-1.5 pl-14 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
		  onChange={handleAmountChange} value={inputMoney}
		/>
	</div>
	<Button onClick={addToWallet}>Nạp</Button>
	</div>
	<div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Cổng thanh toán
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
            alt="Transistor"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
            alt="Reform"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
            alt="Tuple"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
            alt="SavvyCal"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
            alt="Statamic"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
	</div>
  )
}

export default AddMoneyInput