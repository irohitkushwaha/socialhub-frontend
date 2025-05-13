// import InstagramPost from "../../components/Instagram/Components/Post/InstagramPost";
// import React from "react";
// import {postService} from "../../Services/api/Post.Service";

// function InstagramPosts() {
//   return (
//     <div>
//       <InstagramPost />
//     </div>

//   );
// }

// export default InstagramPosts;

import InstagramPost from "../../components/Instagram/Components/Post/InstagramPost";
import React, { useState, useEffect } from "react";
import { postService } from "../../Services/api/Post.Service";
import { useInView } from "react-intersection-observer";
import { formatTimeAgo } from "../../utils/formatTimeAgo";

function InstagramPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  // Setup the intersection observer with react-intersection-observer
  const { ref: observerRef, inView } = useInView({
    threshold: 0.5, // Trigger when element is 50% visible
    triggerOnce: false,
  });

  const POSTS_PER_PAGE = 7;

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    if (loading) return;

    try {
      setLoading(true);
      console.log(
        `Fetching page ${page} with ${POSTS_PER_PAGE} posts per page`
      );

      const fetchedPosts = await postService.getPosts({
        page: page,
        limit: POSTS_PER_PAGE,
      });

      console.log("Fetched posts:", fetchedPosts);

      if (fetchedPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...fetchedPosts]);
        setPage(page + 1);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load of posts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Load more posts when the observer element is in view
  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchPosts();
    }
  }, [inView, hasMore, loading]);

  return (
    <div className="flex flex-col items-center w-full gap-6 pb-20">
      {/* Posts list */}
      {posts.map((post, index) => {
        // If this is the third-to-last post, attach the observer ref
        const isTwoLastPost = index === posts.length - 2;

        return (
          <div key={post._id} ref={isTwoLastPost ? observerRef : null}>
            <InstagramPost
              profileImage={post.Owner?.Avatar}
              username={
                post.Owner?.UserName
                  ? post.Owner.UserName.startsWith("@")
                    ? post.Owner.UserName
                    : `@${post.Owner.UserName}`
                  : ""
              }
              isVerified={true}
              timeAgo={post.createdAt ? formatTimeAgo(post.createdAt, true) : "1w"}
              InitialLikeCount={post.LikesCountForPost}
              title={post.Title}
              InitialIsFollow={post.isFollowed}
              imageUrl={post.PostImage}
              InitialIsLiked={post.isLiked}
              InitialIsSaved={post.isSaved}
              postId={post._id}
            />
          </div>
        );
      })}

      {/* Loading indicator */}
      {loading && (
        <div className="py-4 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Error message */}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {/* No posts message */}
      {!loading && posts.length === 0 && (
        <div className="text-gray-500 text-center py-10">
          No posts available
        </div>
      )}

      {/* End of posts message */}
      {!hasMore && posts.length > 0 && (
        <div className="text-gray-500 text-center py-4">
          You've seen all posts
        </div>
      )}
    </div>
  );
}

export default InstagramPosts;
