import { useState } from "react";
import RandomImages from "./RandomImages";
import RandomDogImage from "./RandomDogImage";
import UploadRandomDog from "./UploadRandomDog";

function App() {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/data");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setMessage("Failed to fetch user data.");
    }
  };

  return (
    <>
      <button onClick={fetchData}>Click me to fetch data</button>

      {userData && (
        <div>
          <h3>User Data:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}

      {message && <p>{message}</p>}

      <RandomImages />
      <RandomDogImage />
      <UploadRandomDog />
    </>
  );
}

export default App;
