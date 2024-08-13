import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Skeletion = () => {
  const MY_SKELETON = Array(5)
    .fill(8)
    .map((_, indx) => (
      <div className="card-skeleton" key={indx}>
        <Skeleton height={300} />
        <Skeleton height={30} />
        <Skeleton height={20} />
      </div>
    ));

  return <div className="card-skeleton-content">{MY_SKELETON}</div>;
};

export default Skeletion;
