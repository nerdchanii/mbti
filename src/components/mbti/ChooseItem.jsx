import React from 'react';

function ChooseItem(props) {
  const { name, onClick, value, style } = props;
  return (
    <input
      className="choose-item"
      name={name}
      onClick={onClick}
      type="button"
      value={value}
      style={style}
    />
  );
}

export default ChooseItem;
