import axios from "axios";
import { useRef, useState } from "react";

export default function Register() {

    const ref = useRef();
    const [message, setMessage] = useState(null);

    async function register(event){
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/register", {
                email: ref.current.email.value,
                password: ref.current.password.value,
                name: ref.current.name.value,
                last_name: ref.current.last_name.value,
                age: ref.current.age.value
            }, {
                headers: {
                    accept: "application/json"
                }
            })
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.response?.data?.message || "Erreur lors de la connexion.")
        }
    }

    return (
        <form className="p-4 m-4 border border-white flex flex-col" ref={ref} action="">
            <h2 className="text-xl">Register</h2>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required/>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required/>
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" id="last_name" required/>
            <label htmlFor="age">Age</label>
            <input type="number" name="age" id="age" required/>
            <input className="cursor-pointer bg-yellow-600" type="submit" value="Login" onClick={register}/>
            {message && <p className="text-red-300">{message}</p>}
        </form>
    )
}