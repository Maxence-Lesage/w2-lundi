import axios from "axios";
import { useState } from "react"

export default function Test(){

    const [playlists, setPlaylists] = useState();

    async function fetchPlaylist(){
        const response = await axios.post("http://localhost:3002/users/playlists", {userId: "6762d5c648363a1b724ea60e"}, {
            headers: {
                accept: "application/json",
            }
        })
        setPlaylists(response.data);
    }

    console.log(playlists[0].name)
    
    return(
        <>
            <h1>Testing Page</h1>
            <input className="bg-red-700" type="button" value="Fetch playlist" onClick={fetchPlaylist}/>
            {playlists && playlists.map((playlist, index) => (
                <div className="bg-purple-600 h-5 min-w-2" key={index}>
                    <p>{playlist.name}</p>
                </div>
            ))}
        </>
    )
}