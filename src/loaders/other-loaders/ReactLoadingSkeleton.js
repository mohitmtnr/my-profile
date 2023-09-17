import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReactLoadingSkeleton = () => {
  return (
    <>
      <Skeleton width="100vw" height="50px"></Skeleton>
      <div className="container my-5">
        <Skeleton height="500px" width="100%"></Skeleton>
        <Skeleton className="my-5" height="80px" width="100%"></Skeleton>
      </div>
      <Skeleton height="240px" width="100vw"></Skeleton>
    </>
  );
};

export default ReactLoadingSkeleton;
