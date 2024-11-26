import React from "react";
import {Input} from "@sparkui/react-input";

function App() {
  return (
    <div className="App">
      <Input onChanged={console.log} />
    </div>
  );
}

export default App;
