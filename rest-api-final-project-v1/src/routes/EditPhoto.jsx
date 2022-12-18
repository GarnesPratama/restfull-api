import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
      e.preventDefault();
      const data = {
        imageUrl: imageUrl,
        captions: captions,
        createdAt: "tes",
        updatedAt: "tes",
      };
      console.log(data);
      return fetch("http://localhost:3001/photos/" + id, {
        // Enter your IP address here

        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
  };

  useEffect(() => {
    setLoading(true);
            const fetchData = (id) => {
              setLoading(true)
              return (
                fetch("http://localhost:3001/photos/" + id)
                  .then((response) => response.json())
                  .then((data) => setImageUrl(data.imageUrl))
                  // .then((data) => setCaptions(data.captions))
                  .then(() => setLoading(false))
              );
                            
            };
            fetchData(id);

  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <h1>Bukan tahu biasa</h1>
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
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
      )}
    </>
  );
};

export default EditPhoto;
