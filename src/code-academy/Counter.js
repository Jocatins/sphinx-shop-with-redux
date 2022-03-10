import React, { useState, useEffect } from "react";

export default function Counter() {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    document.addEventListener("mousedown", increment);
    return () => {
      document.removeEventListener("mousedown", increment);
    };
  });

  const increment = () => {
    setClickCount((prev) => prev + 5);
    console.log("value of clicks  - ", increment);
  };
  return <h1>Document Clicks: {clickCount}</h1>;
}
