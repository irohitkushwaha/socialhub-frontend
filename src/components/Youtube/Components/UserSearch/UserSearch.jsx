import React from 'react'
import ProfileImageWithStatus from '../../../Common/ProfileImage'
import shradha from "../../../../assets/shradha.jpg";


function UserSearch({profileImage = shradha, name = "Rohit Kushwaha", username = "@rohitkushwaha123"}) {
  return (
    <div className='w-full px-[20px] md:px-[0px] overflow-x-hidden'>
    <div className="flex items-center border border-[#E9EAEB] rounded-xl shadow-[0_7px_16px_-4px_rgba(10,13,18,0.08),0_4px_6px_-2px_rgba(10,13,18,0.03)] px-[17px] py-[13px] md:px-[35px] md:py-[16px]">
      <ProfileImageWithStatus
        profileImage={profileImage}
        name={name}
        username={username}
        isOnline={false}
        size={90}
        nameTextSize="text-[20px] md:text-[25px]"
        usernameTextSize='text-[18px] md:text-[21px]'        
        imgDesktopSize='md:w-[150px] md:h-[150px]'
        // gapbtweenImageAndText='gap-[15px]'
        // mainDivClassName='justify-between'
        
      />
    </div>
    </div>
  )
}

export default UserSearch
