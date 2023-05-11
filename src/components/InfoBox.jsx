import React from 'react';

const InfoBox = (props) => {
  return (
    <div
      className='info-box'
      style={{ display: `${props.display}` }}
      onClick={props.handleClick}
    >
      <div>
        <h3>{props.title}</h3>
        <p>{props.info}</p>
      </div>
    </div>
  );
};

export default InfoBox;
