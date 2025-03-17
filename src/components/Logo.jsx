import React from 'react';
import logoImg from '../assets/logo.png';

const Logo = ({ divClass, imgClass, textClass }) => {
  return (
    <div class={`flex justify-center gap-1 items-center w-fit h-fit ${divClass}`}>
      <img src={logoImg} alt="logo" class={`w-10 h-10 md:w-12 md:h-12 ${imgClass}`} />
      <h1 class={`text-lg italic hidden uppercase md:text-[22px] md:block font-Inter font-extrabold ${textClass}`}>SocialHub</h1>
    </div>
  );
};

export default Logo; 