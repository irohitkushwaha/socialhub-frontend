import React from "react";
import FormTitle from "../../ui/FormTitle/FormTitle";
import GoogleButton from "../../ui/GoogleButton";
import Separator from "../../ui/Separator";
import Input from "../../ui/Input";
import FlexibleButton from "../../ui/FlexibleButton/FlexibleButton";
import { Link } from "react-router-dom";
import { userService } from "../../../Services/api/User.Service";

function LoginComponent() {
  const handleGoogleLogin = () => {
    console.log("google btn clicked before")
    window.location.href = userService.googleLogin();
    console.log("google btn clicked after")

  };

  return (
    <div className="flex flex-col gap-[40px] items-center py-[25px]">
      <FormTitle >Login to your Account</FormTitle>
      <div className="flex flex-col gap-[18px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] px-[50px] py-[20px] items-center">
        <GoogleButton onClick={handleGoogleLogin} />
        <Separator />
        <div className="flex flex-col gap-[30px]">
          <Input
            placeholder="Enter your email"
            label="Email"
            isMandatory={true}
          />
          <Input
            placeholder="Create a password"
            label="Password"
            isMandatory={true}
          />
          <FlexibleButton
            text="Login"
            bgColor="bg-[#7F56D9]"
            textColor="text-white"
            textSize="text-[18px]"
          />
        </div>

        <p className="text-[16px] font-normal text-[#535862]">
          Don't have an account?{" "}
          <Link className="text-[#6941C6] font-semibold" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginComponent;
