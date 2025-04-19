import React from "react";
import YtUploadComponent from "../../components/Youtube/Components/YtUpload";
import { selectHasInteracted } from "../../redux/slices/userInteractionSlice";
import { useSelector } from "react-redux";
function YtUpload() {

  const globalHasInteracted = useSelector(selectHasInteracted);

  console.log(
    "Global Has ineracted value as component mount Upload Page",
    globalHasInteracted
  );

  return (
    <div>
            <YtUploadComponent />
    </div>
  );
}

export default YtUpload;
