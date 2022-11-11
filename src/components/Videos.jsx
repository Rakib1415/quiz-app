import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useVideoList from "../hooks/useVideoList";
import classes from "../styles/videos.module.css";
import Video from "./Video";

const Videos = () => {
  const [page, setPage] = useState(1);
  const { videos, loading, error, hasMore } = useVideoList(page);
  return (
    <InfiniteScroll
      dataLength={videos.length}
      hasMore={hasMore}
      loader="Loading..."
      next={() => setPage(page + 8)}
    >
      <div className={classes.videos}>
        {videos.length > 0 &&
          videos.map((video) => (
            <Video
              key={video.youtubeID}
              title={video.title}
              id={video.youtubeID}
              noq={video.noq}
            />
          ))}
        {loading && <p> Loading...</p>}
        {loading && videos.length === 0 && <p>No Data Found!</p>}
        {error && <p>There was an problem</p>}
      </div>
    </InfiniteScroll>
  );
};

export default Videos;
