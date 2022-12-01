import { useState } from "react";
import "./App.css";
import Select from "./Components/Select";
import { OptionsType } from "./Components/Select";

const Options = [
  { label: "First", value: 1 },
  { label: "second", value: 2 },
  { label: "third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

function App() {
  const [Value, setValue] = useState<OptionsType | undefined>(Options[0]);
  const [Value1, setValue1] = useState<OptionsType[]>([]);

  const onchange = function (op: OptionsType | undefined) {
    setValue(op);
  };
  const onchange1 = function (op: OptionsType[]) {
    setValue1(op);
  };

  return (
    <div className="App">
      <div className="item">
        <h4>Single Select Compnent</h4>
        <Select value={Value} options={Options} onchange={onchange} />
      </div>
      <div className="item">
        <h4>Multiple Select Component</h4>
        <Select
          value={Value1}
          options={Options}
          multiple
          onchange={onchange1}
        />
      </div>
    </div>
  );
}

export default App;
