import React, { useState } from 'react';
import ChooseItem from './ChooseItem';

function ChooseCharacter(props) {
  const { name, onClick, values } = props;
  const [choiced, setChoiced] = useState();

  const onclick = (e) => {
    onClick(e);
    setChoiced(e.target.value);
  };
  return (
    <div className="choose-container">
      {values.map((item) => (
        <ChooseItem
          name={name}
          onClick={onclick}
          value={item}
          style={choiced === item ? styles.choiced : null}
        />
      ))}
    </div>
  );
}

const styles = {
  choiced: {
    border: '5px solid #1B80FF',
    color: '#1B80FF',
  },
};

export default ChooseCharacter;
