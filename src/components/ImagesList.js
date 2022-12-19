import { useState, useEffect } from "react";
import axios from "../helpers/axios";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/v2/list?page=${page}&limit=10`).then((result) => {
      setImages((prevValue) => [...prevValue, ...result]);
      setLoading(false);
    });
  }, [page]);

  const handleClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h2 className="headline" style={{}}>
        Image Gallery
      </h2>
      <ul className="images">
        {images.map(({ id, downloadUrl }) => (
          <li key={id} className="list-item">
            <img className="image" src={downloadUrl} alt={id} />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleClick} className="btn">
        Show More
      </button>
    </>
  );
};

export default ImageList;
