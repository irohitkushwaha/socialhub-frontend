import React, { useState } from "react";
import { useEffect } from "react";
import ThumbnailReels from "../../components/Instagram/Components/Reel/ThumbnailReel";
import { Link } from "react-router-dom";
import { isLoggedin } from "../../redux/slices/authentication.slice";
import { useSelector } from "react-redux";
import { watchHistoryService } from "../../Services/api/WatchHistory.Service";

function WatchedReels() {
  const [reelThumbnails, setReelThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const isUserLoggedIn = useSelector(isLoggedin);

  useEffect(() => {
    const fetchWatchedReels = async () => {
      try {
        const response = await watchHistoryService.getWatchHistory(true);
        console.log("response for watched reels is", response);
        setReelThumbnails(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching watched reels:", error);
        setLoading(false);
      }
    };
    fetchWatchedReels();
  }, [isUserLoggedIn]);

  return (
    <div className="mx-auto w-full overflow-x-hidden">
      {!isUserLoggedIn ? (
        <div
          className="px-[15px] py-[20px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit mx-auto mt-[100px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] min-h-[300px"
          style={{ wordSpacing: "5px" }}
        >
          Please{" "}
          <span className="text-blue-500">
            <Link to="/login">login</Link>
          </span>
          ! to see Watched Reels
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-[5px] md:gap-[10px] justify-center md:justify-center">
          {reelThumbnails.map((reel) => (
            <Link to={`/instagram/reels/${reel._id}`}>
              <ThumbnailReels key={reel._id} imageUrl={reel.Thumbnail} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchedReels;
