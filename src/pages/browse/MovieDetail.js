import React from "react";
import styles from "./MovieDetail.module.css";
import Modal from "./Modal";
import defaultBackdrop from "../../images/default-backdrop.jpeg";

const MovieDetail = (props) => {
  // Filter movie trailers or teasers
  const results = props.video.videoData?.results;
  const filteredResults = results?.filter(
    (obj) =>
      (obj.site === "YouTube" && obj.type === "Teaser") ||
      (obj.site === "YouTube" && obj.type === "Trailer")
  );

  // Check if the movie has either information or trailers/teasers
  const hasDetails = Object.values(props.video.details) !== 0;
  const hasVideo = filteredResults?.length > 0;

  // Close details
  function closeDetails() {
    props.seeDetails((prevState) => !prevState);
  }

  return (
    <Modal isSearch={props.search}>
      <div className={styles["movie-details_box"]}>
        {/* Display movie information */}
        {hasDetails && (
          <div className={styles["movie-details"]}>
            <h2>{props.video.details.name || props.video.details.title}</h2>
            <p>
              <strong>{`Release date: ${
                props.video.details.release_date ||
                props.video.details.first_air_date
              }`}</strong>
            </p>
            <p>
              <strong>{`Vote: ${props.video.details.vote_average}`}</strong>
            </p>
            <p>{props.video.details.overview}</p>
          </div>
        )}

        {/* Display movie trailer or backdrop image */}
        {hasVideo ? (
          <div className={styles["movie-player"]}>
            <iframe
              title={props.video.details.id}
              // className={styles["movie-player"]}
              width="100%"
              height="350"
              allowFullScreen={true}
              src={`https://www.youtube-nocookie.com/embed/${filteredResults[0]?.key}`}
              style={{ border: "0" }}
            ></iframe>
          </div>
        ) : (
          <img
            src={
              props.video.details.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${props.video.details.backdrop_path}`
                : defaultBackdrop
            }
            className={styles["movie-player"]}
            alt={props.video.details.name}
          />
        )}

        {/* Close button */}
        <div className={styles["close-btn"]}>
          <hr className={styles.lines} />
          <div className={styles.close} onClick={closeDetails}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
          <hr className={styles.lines} />
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetail;
