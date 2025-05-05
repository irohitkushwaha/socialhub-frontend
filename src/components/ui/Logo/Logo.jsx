import React from 'react';
import logoImg from '../../../assets/logo.png';

const Logo = ({ divClass, imgClass, textClass }) => {
  return (
    <div className={`flex justify-center gap-[1px] items-center w-fit h-fit ${divClass}`}>
      <img src={logoImg} alt="logo" className={`h-8 md:h-11 ${imgClass}`} />
      <h1 className={`text-lg italic uppercase md:text-[19px] md:block font-Inter font-semibold text-[#181D27] ${textClass}`} style={{ WebkitTextStroke: "0.5px black" }}  >SocialHub</h1>
    </div>
  );
};

export default Logo; 