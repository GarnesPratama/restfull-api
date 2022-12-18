import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import fetch from "node-fetch"
//import Axios from "axios"

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = async (e, res) => {
    e.preventDefault();
    const data = {
      imageUrl: imageUrl,
      captions: captions,
      createdAt: "tes",
      updatedAt: "tes",
      secret: secret,
    };
    console.log(data);
    return fetch("http://localhost:3001/photos", {
      // Enter your IP address here

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  };

  return (
    <>
      <div className="container">
        {error && <div className="error-msg">{error}</div>}
        <h1>Mau tahu banget</h1>
        <form className="add-form" onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input
            className="submit-btn"
            type="submit"
            value="Submit"
            data-testid="submit"
          />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
