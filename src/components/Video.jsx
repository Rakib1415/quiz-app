import React from "react";
import { Link } from "react-router-dom";
import classes from "../styles/video.module.css";

const Video = ({ title, id, noq, key }) => {
  return noq > 0 ? (
    <Link to={`/quiz/${id}`} state={{ videoTitle: title }} key={key}>
      <div className={classes.video}>
        <img
          src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          alt={title}
        />
        <p>{title}</p>
        <div className={classes.qmeta}>
          <p>{noq} Questions</p>
          <p>Score : {noq * 5}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className={classes.video} key={key}>
      <img
        src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
      />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Score : {noq * 5}</p>
      </div>
    </div>
  );
};

export default Video;
