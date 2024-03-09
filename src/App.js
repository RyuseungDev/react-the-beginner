import { useEffect, useState } from "react";

function App() {
  const [loding, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinPrice, setCoinPrice] = useState(0);
  const [money, setMoney] = useState(0);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((data) => {
        setLoding(false);
        setCoins(data);
        setCoinPrice(data[0].quotes.USD.price);
      });
  }, []);
  useEffect(() => {
    setAmount(money / coinPrice);
  }, [coinPrice, money]);

  const onSelect = (event) => {
    setCoinPrice(event.target.value);
  };
  const handleInput = (event) => setMoney(event.target.value);
  return (
    <div>
      <h1>The Coin! ({coins.length})</h1>
      {loding ? (
        <strong>Loding ...</strong>
      ) : (
        <div>
          <form>
            <select onChange={onSelect} value={coinPrice}>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.quotes.USD.price}>
                  {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
                </option>
              ))}
            </select>
            <input
              id="entertCoin"
              type="number"
              placeholder="Please enter dollars."
              onChange={handleInput}
              value={money}
            ></input>
          </form>
          <div>
            <h2>
              You can get {typeof amount === "number" ? amount : "0"} coins
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
