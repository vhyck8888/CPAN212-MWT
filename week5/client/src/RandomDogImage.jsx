import { useState } from "react";

function RandomDogImage() {
  const [dogImage, setDogImage] = useState(null);
  const [error, setError] = useState("");

  const fetchDogImage = async () => {
    setError("");
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!res.ok) throw new Error("Failed to fetch dog image");
      const data = await res.json();
      setDogImage(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button onClick={fetchDogImage}>Get Random Dog Image</button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {dogImage && (
        <div style={{ marginTop: "15px" }}>
          <img
            src={dogImage}
            alt="Random Dog"
            style={{ maxWidth: "300px", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
}

export default RandomDogImage;
