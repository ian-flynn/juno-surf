import React from 'react';

const DataBlob = (props) => {
  return (
    <div className='stat'>
      <span className='stat-label'>{props.label}</span>
      <div
        className='blob'
        onClick={() => console.log(`clicked ${props.label}`)}
      >
        <img src={props.button} />
        <div className='centered'>{props.stat}</div>
      </div>
    </div>
  );
};
export default DataBlob;
