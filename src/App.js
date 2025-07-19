import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    date: "",
    date_count: 0,
  });
  const [finalResult, setFinalResult] = useState(0);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  console.log("DATA==>", data);
  const handleSubmit = useCallback(() => {
    const { date, date_count } = data;
    const local_date = new Date(date);
    console.log("local_date", local_date);
    local_date.setDate(local_date.getDate() + Number(date_count));
    console.log("local_date After Set", local_date);

    const day = String(local_date.getDate()).padStart(2, 0);
    const month = String(local_date.getMonth() + 1).padStart(2, 0);
    const year = local_date.getFullYear();

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[local_date.getDay()];
    const final = `${day}-${month}-${year} ${dayName}`;
    setFinalResult(final);
  }, [data]);
  return (
    <div className="container">
      <h1>Expected Date</h1>
      <p className="result">{finalResult || "Select a date & days to add"}</p>

      <div className="form-group">
        <label>Select Date</label>
        <input
          type="date"
          onChange={handleOnChange}
          name="date"
          value={data.date}
        />
      </div>

      <div className="form-group">
        <label>Days to Add</label>
        <input
          type="number"
          onChange={handleOnChange}
          name="date_count"
          value={data.date_count}
          placeholder="Enter days"
        />
      </div>

      <button
        className="btn"
        onClick={handleSubmit}
        disabled={!data.date && !data.date_count}
      >
        Calculate
      </button>
    </div>
  );
}

export default App;
