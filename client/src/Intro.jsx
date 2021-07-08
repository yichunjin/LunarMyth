import React from 'react';
import Card from './card.jsx';

const Intro = ({char, setI}) => {
  return (
    <div className="intro container">
      {char.slice(1, 7).map((info) =>
        <Card info={info} setI={setI} key={info.id}/>
      )}
    </div>
  );
};

export default Intro;