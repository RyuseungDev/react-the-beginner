import { useEffect, useState } from "react";

function App() {
  const [loding, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);

  const [selectedCoinId, setSelectedCoinId] = useState("");

  const [money, setMoney] = useState(0);
  const [amount, setAmount] = useState(0);
  const [coinPrice, setCoinPrice] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setLoding(false);
        setSelectedCoinId(data[0].id);
      });
  }, []);

  useEffect(() => {
    if (selectedCoinId) {
      const coin = coins.find((coin) => coin.id === selectedCoinId);
      setCoinPrice(coin.quotes.USD.price);
      setLastUpdate(coin.last_updated);
    }
  }, [selectedCoinId, coins]);

  useEffect(() => {
    setAmount(money / coinPrice);
  }, [money, coinPrice]);

  const onSelect = (event) => {
    const coinId = event.target.value;
    setSelectedCoinId(coinId);
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
            <select onChange={onSelect}>
              {coins.map((coin, index) => (
                <option key={index} value={coin.id}>
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
            {<p>Last Update: {selectedCoinId ? lastUpdate : null}</p>}
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
