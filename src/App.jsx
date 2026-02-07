import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [filteredList, setFilteredList] = useState("");
  const list = ["Apple", "Apricot", "Anjeer", "pineapple", "Banana", "Watermelon"];

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(input);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [input]);

  useEffect(() => {
    if (!debouncedValue) {
      setFilteredList([]);
      return;
    }
    let currList = [...list];
    let currFilteredList = currList.filter((c) =>
      c.toLowerCase().includes(debouncedValue.toLowerCase()),
    );
    setFilteredList(currFilteredList);
  }, [debouncedValue]);

  return (
    <>
      Typeahead search functionality
      <div className="page-container">
        <input
          className="input-field"
          type="text"
          value={input}
          placeholder={"Search"}
          onChange={(e) => handleInputChange(e)}
        />
        <ul className="list-container">
          {filteredList &&
            filteredList?.length > 0 &&
            filteredList.map((l) => {
              return <li className="list-item">{l}</li>;
            })}
        </ul>
      </div>
    </>
  );
}

export default App;
