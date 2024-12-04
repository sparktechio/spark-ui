import {isDefined} from "../utils/Utils";
import React from "react";

export const IsDefined = () => {
  const items = [
    ['Test', 'Test'],
    ['Null', null],
    ['Undefined', undefined],
    ['0', 0],
    ['1', 1],
  ];

  return (
    <>
      isDefined:
      <ul>
        {items.map((item) => (
          <li key={item[0]}>{item[0]}: {`${isDefined(item[1])}`}</li>
        ))}
      </ul>
    </>
  );
}