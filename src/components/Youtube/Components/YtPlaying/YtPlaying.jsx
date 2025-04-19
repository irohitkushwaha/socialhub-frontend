import React from "react";
import VideoPlayer from "../VideoPlayer";

const YtPlaying = ({url}) => {
    return (
        <div className="w-full">
            <VideoPlayer url={url} />
        </div>
    )
}

export default YtPlaying;