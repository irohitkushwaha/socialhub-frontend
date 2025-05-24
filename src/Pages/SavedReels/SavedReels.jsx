import React, { useState } from "react";
import { savedService } from "../../Services/api/Saved.Service";
import { useEffect } from "react";
import ThumbnailReels from "../../components/Instagram/Components/Reel/ThumbnailReel";
import { Link } from "react-router-dom";
import { isLoggedin } from "../../redux/slices/authentication.slice";
import { useSelector } from "react-redux";
function SavedReels() {
  const [reelThumbnails, setReelThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const isUserLoggedIn = useSelector(isLoggedin);

  useEffect(() => {
    const fetchSavedReels = async () => {
      try {
        const response = await savedService.getSavedReels();
        console.log("response for saved reels is", response);
        setReelThumbnails(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching saved reels:", error);
        setLoading(false);
      }
    };
    fetchSavedReels();
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
          ! to see Watch History
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : reelThumbnails.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No saved reels
            </h2>
            <p className="text-gray-500 mt-2">
              You have not saved any reels yet. Start saving!
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-[5px] md:gap-[10px] justify-center md:justify-center">
          {reelThumbnails.map((reel) => (
            <Link to={`/instagram/reels/${reel.reelId}`}>
              <ThumbnailReels key={reel._id} imageUrl={reel.thumbnail} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedReels;
