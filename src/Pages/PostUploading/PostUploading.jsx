import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormTitle from "../../components/ui/FormTitle";
import Input from "../../components/ui/Input";
import FlexibleButton from "../../components/ui/FlexibleButton";
import { useNavigate } from "react-router-dom";
import FileUploadUpdated from "../../components/Common/FileUpload";
import { postService } from "../../Services/api/Post.Service";

function PostUpload() {
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  // State for file uploads and form status
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");


  // Handle thumbnail file selection
  const handleThumbnailFileChange = (file) => {
    console.log("Selected thumbnail file:", file);
    setThumbnailFile(file);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    if (!thumbnailFile) {
      setUploadError("Post Image is required");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError("");

      const PostData = {
        PostImage: thumbnailFile,
        Caption: data.title,
      };

      const response = await postService.uploadPost(PostData);

      console.log("Upload successful:", response);
      setUploadSuccess(true);
      setTimeout(() => {
        navigate("/"); // Redirect after upload
      }, 5000);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError(
        error.message || "Failed to upload Post. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[40px] items-center py-[25px] w-full px-[150px]"
    >
      <FormTitle isWavy={true}>Share your Heart with the World</FormTitle>
      <div className="flex flex-col gap-[18px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] px-[50px] py-[20px] items-center w-full">
        <div className="flex flex-col gap-[40px] w-full items-center">
          <div className="flex flex-col gap-[30px] w-full">
            <Input
              placeholder="Enter Caption of your Post"
              label="Caption"
              isMandatory={true}
              {...register("title", { required: true })}
              error={errors.title?.message}
            />
            <FileUploadUpdated
              label="Upload Post"
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
              placeholder="or drag Post"
              onChange={handleThumbnailFileChange}
            />
          </div>

          {/* Status messages */}

          {uploadError && (
            <div className="text-red-500 font-medium">{uploadError}</div>
          )}
          {uploadSuccess && (
            <div className="text-green-500 font-medium">
              Post Upload Succsessfully !{" "}
            </div>
          )}

          <FlexibleButton
            text={isUploading ? "Uploading..." : "Upload Post"}
            disabled={isUploading}
            bgColor={isUploading ? "bg-gray-400" : "bg-[#7F56D9]"}
            textColor="text-white"
            textSize="text-[18px]"
          />
        </div>
      </div>
    </form>
  );
}

export default PostUpload;
