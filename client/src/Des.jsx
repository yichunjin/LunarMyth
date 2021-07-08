import React from 'react';

const Des = ({info}) => {
  return (
    <div className="description">
      <h3>More Info:</h3>
      <div>Name : {info.name}</div>
      <div>Team : {info.team}</div>
      <div> Abilities :
        {info.des}
      </div>
    </div>
  );
};

export default Des;