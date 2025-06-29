import { useState } from "react";

export default function UploadRandomDog() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleUploadRandomDog = async () => {
    setLoading(true);
    setMessage("");
    setUploadedImageUrl(null);

    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      const imageUrl = data.message;

      const imageRes = await fetch(imageUrl);
      const blob = await imageRes.blob();


      const file = new File([blob], "random-dog.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("images", file);

      const uploadRes = await fetch("http://localhost:8000/upload-images", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed");
      }

      const uploadResult = await uploadRes.json();

      setMessage("Dog image uploaded successfully!");

      if (uploadResult.files && uploadResult.files.length > 0) {
        const uploadedFileName = uploadResult.files[0].filename;
        setUploadedImageUrl(`http://localhost:8000/uploads/${uploadedFileName}`);
      }
    } catch (error) {
      setMessage("Error uploading dog image: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleUploadRandomDog} disabled={loading}>
        {loading ? "Uploading..." : "Upload Random Dog Image"}
      </button>
      {message && <p>{message}</p>}
      {uploadedImageUrl && (
        <img
          src={uploadedImageUrl}
          alt="Uploaded Random Dog"
          style={{ marginTop: 20, maxWidth: "300px" }}
        />
      )}
    </div>
  );
}
