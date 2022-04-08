import React from "react";

function ChooseCharacter(props) {
  const { className, name, onClick, values } = props;
  return (
    <div className={className}>
      <input
        name={name}
        onClick={onClick}
        className="choose-item"
        type="button"
        value={values[0]}
      ></input>
      <input
        name={name}
        onClick={onClick}
        className="choose-item"
        type="button"
        value={values[1]}
      ></input>
    </div>
  );
}

export default ChooseCharacter;
