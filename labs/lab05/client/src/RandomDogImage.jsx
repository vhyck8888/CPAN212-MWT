import { useState, useEffect } from "react";

function RandomDogImage() {
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDogImage() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!res.ok) throw new Error("Failed to fetch dog image");
        const data = await res.json();
        setDogImage(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDogImage();
  }, []);

  if (loading) return <p>Loading random dog image...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Random Dog Image</h3>
      <img
        src={dogImage}
        alt="Random Dog"
        style={{ maxWidth: "300px", borderRadius: "8px" }}
      />
    </div>
  );
}

export default RandomDogImage;
