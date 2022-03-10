import React, { useState } from "react";

export default function Pract() {
  const [color, setColor] = useState();

  const [count, setCount] = useState(0);
  const divStyle = { backgroundColor: color };

  //   const handleChange = (event) => {
  //     const newEmail = event.target.value;
  //     setEmail(newEmail);
  //   };
  /////////////// OR /////////////
  // const handleChange = (event) => {
  //     setEmail(event.target.value)
  // }

  //////////////// OR ==============
  ////////////Object Destructuring
  //const handleChange = ({target}) => setEmail(target.value)

  const increment = () => setCount((prevCount) => prevCount + 1);

  return (
    <div style={divStyle}>
      <p>The toggle is {color}</p>
      <p>The color is {color}</p>
      <button onClick={() => setColor("Aquamarine")}>Aquamarine</button>
      <button onClick={() => setColor("BlueViolet")}>BlueViolet</button>
      <button onClick={() => setColor("Chartreuse")}>Chartreuse</button>
      <button onClick={() => setColor("CornflowerBlue")}>CornflowerBlue</button>
      <p>Wow, you've clicked that button: {count} times</p>
      <button onClick={increment}>Click here!</button>  
    </div>
  );
}
