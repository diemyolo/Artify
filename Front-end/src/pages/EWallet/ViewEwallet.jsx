import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import login from "../../assets/login.jpg"
import NavBar from "../../components/NavBar";
import {Button} from 'antd'
const ViewEwallet = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [inputMoney, setInputMoney] = useState("");
  const [customer, setCustomer] = useState({});
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Gọi API để lấy thông tin khách hàng và số dư ví
    const fetchData = async () => {
      try {
        const customerResponse = await axios.get(
          "http://localhost:8080/api/auth/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCustomer(customerResponse.data.payload);

        const ewalletResponse = await axios.get(
          "http://localhost:8080/api/auth/viewEwallet",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAmount(ewalletResponse.data.payload.totalAmount);

        const transactionsResponse = await axios.get(
          "http://localhost:8080/api/auth/viewTransactions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransactions(transactionsResponse.data.payload);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Gọi hàm fetchData khi component được mount
  }, []);

  console.log(transactions);

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
  const stats = [
	{ id: 1, name: 'Number of transactions', value: transactions.length },
	{ id: 2, name: 'Account Balance', value: `${amount} VND` },
	{ id: 3, name: 'New users annually', value: '46,000' },
  ]
  return (
    <div>
      {/* {amount}
      <div>{customer.userName}</div>
      <div className="flex -space-x-1 overflow-hidden">
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={customer.imagePath}
          alt=""
        />
      </div>

      {transactions.length > 0
        ? transactions.map((item, index) => (
			<div key={index}>{item.totalMoney}</div>
		))
        : null} */}
		<NavBar/>
		<div className="mt-12">
        <input type="text" onChange={handleAmountChange} value={inputMoney} />
        <button onClick={addToWallet}>Send</button>
      </div>
	  {/* Banner intro */}
	<div className="bg-white">
      <div className="mx-auto max-w-7xl py-8 sm:px-6 sm:py-12 lg:px-8">
	  
        <div className="relative isolate overflow-hidden bg-gray-100 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
		<div className="py-3 -space-x-1 overflow-hidden">
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={customer.imagePath}
          alt=""
        />
      </div>
		  <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2  sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
		
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back
              <br />
			  <h1 className="text-4x1 sm:text-5xl">
			  	{customer.userName}
			  </h1>
            </h2>
            {/* <p className="mt-6 text-lg leading-8 text-gray-300">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
            </p> */}
            {/* <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div> */}
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src={login}
              alt="App screenshot"
            />
			{/* <div className="flex -space-x-1 overflow-hidden">
        		<img
          			className="inline-block h-100 w-100 rounded-full ring-2 ring-white"
          			src={customer.imagePath}
          			alt=""
        	/>
      </div> */}
          </div>
        </div>
      </div>
    </div>
	{/* Stats */}
	<div className="mx-auto max-w-4xl py-24 sm:px-6 sm:py-8 lg:px-8 bg-gray-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-white text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-white">{stat.name}</dt>
              <dd className="order-first text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
	{/* Transactions  */}
  <div className="but-container flex items-center justify-center">
    <Button className="flex">Add money</Button>
  </div>
	<ul role="list" className="divide-y divide-gray-100">
      {transactions.length > 0 ? transactions.map((transaction) => (
        <li key={transaction.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={transaction.imageUrl} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{transaction.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{transaction.email}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{transaction.role}</p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time dateTime={transaction.lastSeenDateTime}>{transaction.transactionDate}</time>
              </p>
          </div>
        </li>
      )) : null}
    </ul>
</div>
	
  );
};

export default ViewEwallet;
