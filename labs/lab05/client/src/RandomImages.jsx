import { useEffect, useState } from "react";

function RandomImages() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("http://localhost:8000/random-images");
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        setImages(data.images || []);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchImages();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Random Images</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {images.length === 0 && <p>No images available</p>}
        {images.map((imgUrl, idx) => (
          <img
            key={idx}
            src={imgUrl}
            alt={`Random upload ${idx + 1}`}
            style={{ width: "150px", height: "auto", borderRadius: "8px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default RandomImages;
