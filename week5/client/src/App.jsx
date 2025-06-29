import { useState } from 'react';
import './App.css';
import MultiImageUpload from "./MultiImageUpload";
import RandomImages from "./RandomImages";
import RandomDogImage from "./RandomDogImage";
import UploadRandomDog from "./UploadRandomDog";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/data`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Failed to fetch user data.");
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const submission = { email, password, name };

    try {
      const response = await fetch(`http://localhost:8000/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission)
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "There was a problem registering an account");
      } else {
        setMessage(result.message || "Registration successful!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An unexpected error occurred.");
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

      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <input
          type='email'
          placeholder='Enter email here'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <br />
        <input
          type='text'
          placeholder='Enter name here'
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <br />
        <input
          type='password'
          placeholder='Enter password here'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <br />
        <button type='submit'>Register</button>
      </form>

      {message && <p>{message}</p>}
      <MultiImageUpload />

<RandomImages />
 <RandomDogImage />
 <UploadRandomDog />
    </>

    
  );
}

export default App;
