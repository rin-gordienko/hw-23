import { useState, useEffect } from "react";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)
      .then((response) => response.json())
      .then((result) => {
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
        {images.map(({ id, download_url}) => (
          <li key={id} className="list-item">
            <img className="image" src={download_url} alt={id}></img>
          </li>
        ))}
      </ul>

      <button onClick={handleClick} className="btn">
        Show More
      </button>
    </>
  );
};

export default ImageList;
