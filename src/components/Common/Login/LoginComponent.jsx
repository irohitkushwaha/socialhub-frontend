import React from "react";
import FormTitle from "../../ui/FormTitle/FormTitle";
import GoogleButton from "../../ui/GoogleButton";
import Separator from "../../ui/Separator";
import Input from "../../ui/Input";
import FlexibleButton from "../../ui/FlexibleButton/FlexibleButton";
import { Link } from "react-router-dom";
import { userService } from "../../../Services/api/User.Service";
import { useForm } from "react-hook-form";
import { useState } from "react";

function LoginComponent() {
  const [loginError, setLoginError] = useState("");

  const handleGoogleLogin = () => {
    console.log("google btn clicked before");
    window.location.href = userService.googleLogin();
    console.log("google btn clicked after");
  };

  const handleLogin = async (data) => {
    setLoginError("");
    console.log("data of form", data);
    try {
      const response = await userService.login(data);
      window.location.href = "/";

      console.log("response of api for login", response);
    } catch (error) {
      setLoginError(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again."
      );

      console.log("error of api for login", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userNameOrEmail: "",
      password: "",
    },
  });

  return (
    <div className="w-full flex flex-col gap-[40px] items-center py-[25px] px-[10px]">
      <FormTitle  fontSize="text-[25px] md:text-[28px]">Login to your Account</FormTitle>
      <div className="flex flex-col gap-[18px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] px-[15px] py-[20px] items-center w-full md:w-auto">
        <GoogleButton onClick={handleGoogleLogin} />
        <Separator />
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-[30px]"
        >
          <div className="flex flex-col gap-[30px]">
            <Input
              placeholder="Enter your email or username"
              label="Email"
              isMandatory={true}
              {...register("userNameOrEmail", {
                required: "Email is Required",
              })}
            />
            <Input
              placeholder="Create a password"
              label="Password"
              isMandatory={true}
              {...register("password", {
                required: "Password is Required",
              })}
            />
            {loginError && (
              <div className="text-red-500 text-[18px] font-semibold text-center">{loginError}</div>
            )}
            <FlexibleButton
              text="Login"
              bgColor="bg-[#7F56D9]"
              textColor="text-white"
              textSize="text-[18px]"
            />
          </div>
        </form>

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
