import React, { useState } from "react";
import FormTitle from "../../ui/FormTitle/FormTitle";
import GoogleButton from "../../ui/GoogleButton";
import Separator from "../../ui/Separator";
import Input from "../../ui/Input";
import FlexibleButton from "../../ui/FlexibleButton/FlexibleButton";
import { Link } from "react-router-dom";
import FileUploadUpdated from "../FileUpload";
import { useForm } from "react-hook-form";
import { userService } from "../../../Services/api/User.Service";
function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
    },
  });

  const [ProfileImg, setProfileImg] = useState(null);
  const [CoverImg, setCoverImg] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [RegisterSuccess, setRegisterSuccess] = useState(false);
  const [RegisterError, setRegisterError] = useState("");

  const handleProfileImgChange = (ProfileImg) => {
    setProfileImg(ProfileImg);
  };

  const handleCoverImgChange = (CoverImg) => {
    setCoverImg(CoverImg);
  };

  const SubmitRegistration = async (data) => {
    if (!ProfileImg) {
      RegisterError("Profile Image is Required");
      return;
    }
    if (!CoverImg) {
      RegisterError("Cover Image is Required");
      return;
    }
    try {
      setIsRegistering(true);
      setRegisterError("");
      const response = await userService.registerUser(data);
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit(SubmitRegistration)}
      className="flex flex-col gap-[40px] items-center py-[25px]"
    >
      <FormTitle>Sign up to your Account</FormTitle>
      <div className="flex flex-col gap-[18px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] px-[50px] py-[20px] items-center">
        <GoogleButton />
        <Separator />
        <div className="flex flex-col gap-[30px]">
          <Input
            placeholder="Enter your Name"
            label="Name"
            isMandatory={true}
            {...register("Name", {
              required: "Name is Required",
            })}
          />
          <Input
            placeholder="Enter your Email"
            label="Email"
            isMandatory={true}
            {...register("Email", {
              required: "Email is Required",
            })}
          />
          <Input
            placeholder="Create a Password"
            label="Password"
            isMandatory={true}
            helpText={"Password must be at least 8 characters"}
            {...register("Password", {
              required: "Strong Password is Required",
            })}
          />
          <FileUploadUpdated
            label="Profile"
            isMandatory={true}
            onChange={handleProfileImgChange}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#535862"
              >
                <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
              </svg>
            }
            // iconType="material"
            placeholder="or drag profile image"
          />
          <FileUploadUpdated
            label="Cover Image"
            isMandatory={false}
            onChange={handleCoverImgChange}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#535862"
              >
                <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
              </svg>
            }
            // iconType="material"
            placeholder="or drag cover image"
          />
          <FlexibleButton
            text="Login"
            bgColor="bg-[#7F56D9]"
            textColor="text-white"
            textSize="text-[18px]"
          />
        </div>

        <p className="text-[16px] font-normal text-[#535862]">
          Already have an account?{" "}
          <Link className="text-[#6941C6] font-semibold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginComponent;
