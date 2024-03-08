import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./App.module.css";

function Hello({ title }) {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("I run when 'keyword' change");
  }, [text]);

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <input
        type="text"
        placeholder="keyword"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
    </div>
  );
}

Hello.propTypes = {
  title: PropTypes.string.isRequired,
};

function App() {
  const [btn, setBtn] = useState(false);
  const onClick = () => setBtn(!btn);

  return (
    <div>
      {btn ? null : <Hello title={"Hello world"} />}
      <button onClick={onClick}>{btn ? "Open" : "Hide"}</button>
    </div>
  );
}

export default App;
