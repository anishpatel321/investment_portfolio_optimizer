import React from 'react';

function ScatterGraphDot ({ cx, cy, stroke, fill }) {
  return (
    <svg>
      <circle cx={cx} cy={cy} r={2} fill={fill} stroke={stroke} strokeWidth={2} />
    </svg>
  );
};

export default ScatterGraphDot;
