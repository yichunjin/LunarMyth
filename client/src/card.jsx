import React, {useState} from 'react';

const Card = ({info, setI}) => {
  return (
    <div className="card container" onClick={(e) => setI(info.id)}>
      <div>
        <img src={info.img} className="info-img"></img>
        <span>{info.name}</span>
      </div>

    </div>
  );
};

export default Card;