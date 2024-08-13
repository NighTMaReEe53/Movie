import Skeleton from "react-loading-skeleton";

const SEARCH_SKELETON = () => {
  return (
    <div className="box-search">
      <Skeleton width={50} height={50} />
      <div className="text">
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />
      </div>
    </div>
  );
};

export default SEARCH_SKELETON;
