import "./App.css";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { SingleValue } from "react-select";
import AsyncSelect from "react-select/async";

type TokenOption = {
  value: string;
  label: string;
  image: string;
};

type PriceData = {
  currency: string;
  date: string;
  price: number;
};
type PriceDataList = {
  [key: string]: PriceData;
};

const App: React.FC = () => {
  const [tokens, setTokens] = useState<TokenOption[]>([]);
  const [prices, setPrices] = useState<PriceDataList>({});
  const [fromToken, setFromToken] = useState<TokenOption | null>(null);
  const [toToken, setToToken] = useState<TokenOption | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const tokenIconsURL = import.meta.env.VITE_TOKEN_ICONS_URL;
  const priceDataURL = import.meta.env.VITE_PRICE_API_URL;

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await axios.get(priceDataURL);
        const convertedPrices = data.reduce(
          (acc: PriceDataList, price: PriceData) => {
            acc[price.currency] = price;
            return acc;
          },
          {} as Record<string, PriceData>
        );
        setPrices(convertedPrices);

        const tokenOptions = data.map((price: PriceData) => ({
          value: price.currency,
          label: price.currency,
          image: `${tokenIconsURL}${price.currency}.svg`,
        }));
        console.log("🚀 ~ tokenOptions ~ tokenOptions:", tokenOptions);

        setTokens(tokenOptions);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch token prices. Please try again later.");
      }
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    if (fromToken && toToken) {
      const rate = prices[toToken.value].price / prices[fromToken.value].price;
      setExchangeRate(rate);
    }
  }, [fromToken, toToken, prices]);

  const filterColors = (inputValue: string) => {
    return tokens.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: TokenOption[]) => void
  ) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };

  const handleSwap = () => {
    if (!fromToken || !toToken || !amount) {
      setError("Please complete all fields before swapping.");
      return;
    }
    if (fromToken.value === toToken.value) {
      setError("Cannot swap the same currency.");
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Invalid amount.");
      return;
    }

    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <div className="app">
      <h1 className="app-title">Currency Swap</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="form-row">
        <label htmlFor="fromToken">From:</label>
        <AsyncSelect
          className="select"
          id="fromToken"
          value={fromToken}
          onChange={(selectedOption: SingleValue<TokenOption>) =>
            setFromToken(selectedOption)
          }
          defaultOptions={tokens}
          loadOptions={loadOptions}
          cacheOptions
          getOptionLabel={(record: TokenOption) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={record.image}
                alt={record.label}
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              {record.label}
            </div>
          )}
        />
      </div>

      <div className="form-row">
        <label htmlFor="toToken">To:</label>
        <AsyncSelect
          className="select"
          value={toToken}
          id="toToken"
          onChange={(selectedOption: SingleValue<TokenOption>) =>
            setToToken(selectedOption)
          }
          defaultOptions={tokens}
          loadOptions={loadOptions}
          cacheOptions
          getOptionLabel={(record: TokenOption) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={record.image}
                alt={record.label}
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              {record.label}
            </div>
          )}
        />
      </div>

      <div className="form-row">
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="form-row result">
        {exchangeRate && (
          <div>
            {amount || 1} {fromToken?.label} = <br />
            <h1 className="result-amount">
              {(Number(amount || 1) * exchangeRate).toFixed(4)} {toToken?.label}
            </h1>
          </div>
        )}
      </div>

      {exchangeRate && (
        <div className="exchange-rate">
          Exchange Rate: 1 {fromToken?.label} = {exchangeRate.toFixed(4)}{" "}
          {toToken?.label}
        </div>
      )}

      <button onClick={handleSwap} className="swap-button">
        Swap
      </button>
    </div>
  );
};

export default App;
