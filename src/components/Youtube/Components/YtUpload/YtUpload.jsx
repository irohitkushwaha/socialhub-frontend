import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormTitle from "../../../ui/FormTitle/FormTitle";
import Input from "../../../ui/Input";
import FlexibleButton from "../../../ui/FlexibleButton/FlexibleButton";
import { useNavigate } from "react-router-dom";
import FileUploadUpdated from "../../../Common/FileUpload";
import { videoService } from "../../../../Services/api/Video.Service";

function YtUpload() {
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // State for file uploads and form status
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Handle video file selection
  const handleVideoFileChange = (file) => {
    console.log("Selected video file:", file);
    setVideoFile(file);
  };

  // Handle thumbnail file selection
  const handleThumbnailFileChange = (file) => {
    console.log("Selected thumbnail file:", file);
    setThumbnailFile(file);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    if (!videoFile) {
      setUploadError("Video file is required");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError("");

      const videoData = {
        videoFile: videoFile,
        thumbnailFile: thumbnailFile,
        title: data.title,
        description: data.description,
        publishStatus: true, // Default value, could be made selectable
        isShorts: false, // Default value, could be made selectable
      };

      const response = await videoService.uploadVideo(videoData);

      console.log("Upload successful:", response);
      setUploadSuccess(true);
      setTimeout(() => {
        navigate("/"); // Redirect after upload
      }, 5000);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError(
        error.message || "Failed to upload video. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[20px] md:gap-[40px] items-center py-[25px] w-full px-[15px]"
    >
      <div className="block md:hidden px-[50px] py-[10px] md:px-0 text-center">
        <FormTitle fontSize="text-[24px] md:text-[32px]" isWavy={true}>
          Share your Heart
        </FormTitle>
        <FormTitle fontSize="text-[24px] md:text-[32px]" isWavy={true}>
           with the World
        </FormTitle>
      </div>
      <div className="hidden md:block">
      <FormTitle fontSize="text-[24px] md:text-[32px]" isWavy={true}>
          Share your Heart with the World
        </FormTitle>
      </div>
      <div className="flex flex-col gap-[18px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] px-[5px] md:px-[50px] py-[20px] items-center w-full">
        <div className="flex flex-col gap-[40px] w-full items-center">
          <div className="flex flex-col gap-[30px] w-full">
            <Input
              placeholder="Enter your Video Title"
              label="Title"
              isMandatory={true}
              {...register("title", {
                required: "Title is required",
              })}
              error={errors.title?.message}
            />
            <Input
              placeholder="Enter Description of your Video"
              label="Description"
              isMandatory={false}
              {...register("description")}
            />
            <FileUploadUpdated
              label="Upload Video"
              isMandatory={true}
              padding="py-[30px]"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="#535862"
                >
                  <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                </svg>
              }
              placeholder="or drag video"
              onChange={handleVideoFileChange}
            />
            <FileUploadUpdated
              label="Thumbnail"
              isMandatory={false}
              padding="py-[30px]"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="#535862"
                >
                  <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                </svg>
              }
              placeholder="or drag thumbnail"
              onChange={handleThumbnailFileChange}
            />
          </div>

          {/* Status messages */}
          {!videoFile && (
            <div className="text-yellow-500 font-medium">
              Please upload a video file
            </div>
          )}
          {uploadError && (
            <div className="text-red-500 font-medium">{uploadError}</div>
          )}
          {uploadSuccess && (
            <div className="text-green-500 font-medium">
              Video uploaded successfully!
            </div>
          )}

          <div className="w-full px-[8px] md:px-0 flex justify-center">
          <FlexibleButton
            text={isUploading ? "Uploading..." : "Upload Video"}
            disabled={isUploading}
            bgColor={isUploading ? "bg-gray-400" : "bg-[#7F56D9]"}
            textColor="text-white"
            textSize="text-[18px]"
          />
          </div>
        </div>
      </div>
    </form>
  );
}

export default YtUpload;
