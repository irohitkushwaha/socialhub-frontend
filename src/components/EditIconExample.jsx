import React from "react";
import EditIcon from "./EditIcon";

const EditIconExample = () => {
  const handleEditClick = () => {
    alert("Edit button clicked!");
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <p className="text-lg font-medium">Profile Information</p>
        <EditIcon onClick={handleEditClick} />
      </div>
    </div>
  );
};

export default EditIconExample;
