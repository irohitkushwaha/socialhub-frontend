import React from 'react';

const Title = ({ children }) => {
  return (
    <h1 
      className="text-[#000000] text-[20px] lg:text-[22px] leading-[31px] font-bold font-inter"
    >
      {children}
    </h1>
  );
};

export default Title; 