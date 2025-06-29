import { useState } from 'react'
import './App.css'

function App() {
 //fetch single file, display image,  message
 const [singleFile, setSingleFile] = useState(null);
  const [displaySingleFile, setDisplaySingleFile] = useState(null);
const [message, setMessage] = useState("");

const fetchSingleFile = async() => {
  try{
const response = await fetch(`http://localhost:8000/fetch/single`);

const data = await response.blob(); //binarry large objext
const imageUrl = URL.createObjectURL(data);
setDisplaySingleFile(imageUrl);

  }
  catch(error){
setMessage("Error handling");
console.log(error)
  }
}

const handleSaveSingleFile = async() =>{
  e.preventDefault();
  try{
    const formData  = new FormData();
    formData.append("file", singleFile);

const response = await fetch(`http://localhost8000/save/single`, {
  method: "POST",
  body :formData
});

if(!response.ok) {
  setMessage("file not uploaded");
  return;
}
setMessage("File hasbeen uploaded")

  }
   catch(error){
setMessage("Error handling");
console.log(error)
  }
}
  return (
    <>
   <form onsSubmit={handleSaveSingleFile}>
    <input
  type='file'
  onChange={(e) =>{setSingleFile(e.target.files[0])}}
  required
    />
<button type='submit' >Upload File</button>
   </form>
{displaySingleFile && (
  <div>
    <img
    stc={displaySingleFile}
    style={{maxWidth: "300px"}}
    />
  </div>
)}

   {message && (
    <div>
      {message}
    </div>
   )}
    </>
  )
}

export default App
