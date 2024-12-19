import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function NewPlaylistForm() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [version, setVersion] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [musics, setMusics] = useState(null);

  const ref = useRef();

  function handleCheckboxChange(e, stateSetter) {
    const { id, checked } = e.target;
    stateSetter((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  }

  async function addNewPlaylist(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    try {
      const response = await axios.post(
        "http://localhost:3002/playlists",
        {
          name,
          list,
          genres,
          version,
        },
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      setResponseMessage(response.data.message || "Playlist ajoutée avec succès !");
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Erreur lors de l'ajout de la playlist.");
    }
  }

  async function getAllMusics(){
    const response = await axios.get("http://localhost:3002/musics",{
          headers: {
            accept: "application/json",
          },
        }
      );
    setMusics(response.data)
  }

  useEffect(() => {
    getAllMusics();
  }, [])

  return (
    <form className="p-4 m-4 border border-white" ref={ref} onSubmit={addNewPlaylist}>
      <label htmlFor="f_anp_name">Nom:</label>
      <input
        type="text"
        name="f_anp_name"
        id="f_anp_name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <fieldset>
        <legend>Musiques:</legend>

        {musics && musics.map((music, index) => (
            <div key={index}>
                <input
                type="checkbox"
                id={music._id}
                name={music._id}
                onChange={(e) => handleCheckboxChange(e, setList)}
                />
                <label htmlFor={music._id}>{music.name}</label>
          </div>
        ))}

      </fieldset>

      <fieldset>
        <legend>Genres:</legend>

        <div>
          <input
            type="checkbox"
            id="citypop"
            name="citypop"
            onChange={(e) => handleCheckboxChange(e, setGenres)}
          />
          <label htmlFor="citypop">CityPop</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="lofi"
            name="lofi"
            onChange={(e) => handleCheckboxChange(e, setGenres)}
          />
          <label htmlFor="lofi">Lofi</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="rock"
            name="rock"
            onChange={(e) => handleCheckboxChange(e, setGenres)}
          />
          <label htmlFor="rock">Rock</label>
        </div>
      </fieldset>

      <label htmlFor="f_anp_version">Version:</label>
      <input
        type="text"
        name="f_anp_version"
        id="f_anp_version"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
      />

      <button type="submit">Ajouter</button>

      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
