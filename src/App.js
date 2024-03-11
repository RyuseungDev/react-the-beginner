import { useEffect, useState } from "react";

function App() {
  const [loding, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);

  const [selectCoin, setSelectCoin] = useState({});
  const [money, setMoney] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setLoding(false);
        setSelectCoin(data[0]);
      });
  }, []);

  const onSelect = (event) => {
    const id = event.target.value;
    const coin = coins.find((coin) => coin.id === id);
    setSelectCoin(coin);
  };

  const handleInput = (event) => {
    setMoney(event.target.value);
  };

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
            <p>Last Update: {selectCoin ? selectCoin.last_updated : null}</p>
            <h2>
              You can get {money / selectCoin.quotes.USD.price}
              coins
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
