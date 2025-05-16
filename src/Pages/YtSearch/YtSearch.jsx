import React, { useState, useEffect } from "react";
import WatchHistoryVideo from "../../components/Youtube/Components/WatchHistory/watchhistoryvideo";
import UserSearch from "../../components/Youtube/Components/UserSearch/UserSearch";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ThumbnailCard from "../../components/Youtube/Components/ThumbnailCard";
import { searchService } from "../../Services/api/Search.Service";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { formatDuration } from "../../utils/formatDuration";
import { formatCompactNumber } from "../../utils/formatCompactNumber";
import { Link, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

function YtSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pageSize = 10;

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  // Setup the intersection observer
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1, // Trigger when element is 10% visible
    rootMargin: "100px", // Load more a little before the element is visible
  });

  // Load more data when the load more element comes into view
  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMoreResults();
    }
  }, [inView]);

  // Function to load more results
  const loadMoreResults = async () => {
    if (!query.trim() || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const response = await searchService.search({
        keyword: query,
        page: nextPage,
        size: pageSize,
      });

      if (response.length === 0) {
        setHasMore(false);
      } else {
        setSearchResults((prev) => [...prev, ...response]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial search when query changes
  useEffect(() => {
    const performInitialSearch = async () => {
      setInitialLoad(true);
      setLoading(true);
      setPage(0);
      setHasMore(true);

      if (!query.trim()) {
        setSearchResults([]);
        setLoading(false);
        setInitialLoad(false);
        return;
      }

      try {
        const response = await searchService.search({
          keyword: query,
          page: 0,
          size: pageSize,
        });

        setSearchResults(response);
        setHasMore(response.length === pageSize);
      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    performInitialSearch();
  }, [query, pageSize]);

  return (
    <div className="mx-auto w-full overflow-x-hidden">
      {loading && initialLoad ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : searchResults.length === 0 ? (
        <div className="w-full flex justify-center items-start h-[100vh] pt-[100px]">
          <p className="text-gray-600 text-[20px] font-semibold">
            {query ? `No results found for "${query}"` : "Enter a search term"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-[50px] w-full">
          {searchResults.map((item, index) => (
            <div
              key={item._id}
              className="w-full md:w-[1000px] mx-auto flex justify-center px-[10px]"
            >
              {item.type === "user" ? (
                <UserSearch
                  profileImage={item.Avatar}
                  name={item.FullName}
                  username={item.Username}
                />
              ) : isMobile ? (
                <Link to={`/youtube/playing/${item._id}`}>
                  <ThumbnailCard
                    thumbnailSrc={item.Thumbnail}
                    title={item.Title}
                    channelIcon={item.Owner[0]?.Avatar}
                    channelName={item.Owner[0]?.FullName}
                    views={formatCompactNumber(item.views)}
                    uploadTime={formatTimeAgo(item.createdAt)}
                    duration={formatDuration(item.Duration)}
                  />
                </Link>
              ) : (
                <Link to={`/youtube/playing/${item._id}`}>
                  <WatchHistoryVideo
                    thumbnailSrc={item.Thumbnail}
                    title={item.Title}
                    channelIcon={item.Owner[0]?.Avatar}
                    channelName={item.Owner[0]?.FullName}
                    views={formatCompactNumber(item.views)}
                    uploadTime={formatTimeAgo(item.createdAt)}
                    duration={formatDuration(item.Duration)}
                  />
                </Link>
              )}
            </div>
          ))}

          {/* Load more trigger element */}
          {hasMore && (
            <div
              ref={loadMoreRef}
              className="h-10 flex items-center justify-center"
            >
              {loading && (
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default YtSearch;
