import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List_Category = () => {
  const [category, setCategory] = useState([]);

  const GET_CATEGORY = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en?&api_key=82ad1a9e357bc59d597d6b1254ba5ae2"
    );
    const MyData = await res.json();

    return setCategory(MyData.genres);
  };

  console.log(category);

  useEffect(() => {
    GET_CATEGORY();
  }, []);

  const LIST_LI = category.map(({ id, name }, indx) => (
    <Link
      to={`Movies/${id}`}
      key={id}
      id={id}
      className="flex items-center gap-2 mb-3"
      data-name={name}
    >
      <img src={`./Image/${indx + 1}.png`} style={{ width: "30px" }} alt="" />
      <span>{name}</span>
    </Link>
  ));

  return (
    <ul className="list mt-3">
      <h2 className="flex items-center gap-2 font-bold text-xl mb-3">
        <img src="./Image/category.png" style={{ width: "30px" }} alt="" />
        Category :
      </h2>
      {LIST_LI}
    </ul>
  );
};

export default List_Category;
