import React, { useEffect, useState } from "react";
import Dropdowns from "./Dropdowns";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);

  let [fromCurrency, setFromcurrency] = useState("USD");
  let [toCurrency, setTocurrency] = useState("INR");

  const [convertedAmount, setConvertedamount] = useState("");

  const [converting, setConverting] = useState(false);

  // const [error,setError]=useState(false)

  const convertAmount = async () => {
    if (!amount) {
      return alert("Please Enter Amount");
    }
    setConverting(true);

    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();

      setConvertedamount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error :", error);
    } finally {
      setConverting(false);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(" https://api.frankfurter.app/currencies");
      const data = await response.json();
      console.log(data);
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    convertAmount();
  }, [toCurrency]);

  console.log(currencies);

  const swapCurrencies = () => {
    setFromcurrency(toCurrency);
    setTocurrency(fromCurrency);
  };

  // https://api.frankfurter.app/currencies
  // https://api.frankfurter.app/latest?amount=1&from=USD&to=INR`
  return (
    <div className="max-w-xl mx-auto my-10 p-10 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>
      <div className="grid grid-cols-1  sm:grid-cols-3 gap-4 items-end sm:mb-0">
        <Dropdowns
          currencies={currencies}
          title="From"
          currency={fromCurrency}
          setCurrency={setFromcurrency}
        />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 rounded-md bg-gray-50 hover:bg-gray-200"
          >
            <i class="fa fa-exchange"></i>
          </button>
        </div>
        <Dropdowns
          currencies={currencies}
          title="To"
          currency={toCurrency}
          setCurrency={setTocurrency}
        />
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block mt-5 text-sm font-medium text-gray-700"
        >
          Enter Amount :
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="outline-none border-spacing-1 p-1 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          className={`px-5 py-2 bg-green-500 hover:bg-indigo-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
      
        ${converting ? "animate-pulse" : ""}`}
          onClick={convertAmount}
        >
          Convert
        </button>
      </div>
      <div className="mt-4 flex  font-medium text-right text-blue-500">
        {`Converted Amount : ${convertedAmount} `}
      </div>
    </div>
  );
}

export default CurrencyConverter;
