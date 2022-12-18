import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [id, setid] = useState("id");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
        const sortData = () => {
          return fetch(
            `http://localhost:3001/photos?q=${submited}&_sort=${id}&_order=${sort}`
          )
            .then((response) => response.json())
            .then((data) => setPhotos(data))
            
        }; 
         sortData();
         setLoading(false);
    // TODO: answer here
  }, [sort, submited]);

  useEffect(() => {
        const fetchData = () => {
          return fetch("http://localhost:3001/photos")
            .then((response) => response.json())
            .then((data) => setPhotos(data));
        };
        fetchData();
        setLoading(false);
    // TODO: answer here
  }, []);

    const deletePhoto =(id) => {
              fetch(`http://localhost:3001/photos/${id}`, {
                // Enter your IP address here
                method: "DELETE",
              }).then(()=>
                setPhotos(photos.filter(photo => photo.id !== id))
              );
    };

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <div>
              <h1
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Loading...
              </h1>
            </div>
          ) : sort == "desc" && id != "id" ? (
            photos
              .map((photo) => {
                return (
                  
                    <div>
                      <Card
                        key={photo.id}
                        photo={photo}
                        deletePhoto={deletePhoto}
                      />
                    </div>
                 
                );
              })
              .reverse()
          ) : (
            photos.map((photo) => {
              return (
               
                  <div>
                    <Card
                      key={photo.id}
                      photo={photo}
                      deletePhoto={deletePhoto}
                    />
                  </div>
   
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
