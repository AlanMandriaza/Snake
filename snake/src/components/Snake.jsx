import React from 'react';

const Snake = ({ snake }) => {
  return (
    <div>
      {snake.map((segment, index) => (
        <div key={index} className="snake-segment" style={{ left: segment.x * 20, top: segment.y * 20 }}></div>
      ))}
    </div>
  );
};

export default Snake;
