import React from "react";
import { BellOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <div className="p-4 bg-white h-20 flex items-center justify-between sticky top-0 z-10 shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV2Qm0s2BuyqGs9nwBEPaWfvl27nxF_vvSbQ&s"
          alt="logo"
          className="h-10 w-10"
        />
        <h1 className="text-[25px] uppercase font-bold text-black">
          VTC Hospital
        </h1>
      </div>

      {/* Notification and Profile */}
      <div className="flex items-center space-x-4">
        <div className="inline-flex justify-center items-center bg-gray-400 rounded-full p-3">
          <BellOutlined className="text-black text-sm" />
        </div>
        <img
          src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/464854235_3887334878202883_1992105579847917949_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=id4XVv1kUxAQ7kNvgEPP4gW&_nc_oc=AdlmnD4cCTDMA0QEZTKvVnDut9eaRS7n4H-QwIDcMKh0rUSCbbKW1LMgphA3bQ9r7XI&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=0_BjWbCYLtUJsEYrRhtyAQ&oh=00_AYEqRaPmvGaG6zblxPlXRs4wafsJomgWqDNxYfHw26_3DQ&oe=67E95777"
          alt="profile"
          className="h-12 w-12 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
