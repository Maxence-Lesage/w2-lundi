import axios from "axios";
import { useRef, useState } from "react";

export default function Login() {

    const ref = useRef();
    const [message, setMessage] = useState(null);

    async function login(event){
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/login", {
                email: ref.current.login_email.value,
                password: ref.current.login_password.value
            }, {
                headers: {
                    accept: "application/json"
                }
            })
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            setMessage(error.response?.data?.message || "Erreur lors de la connexion.")
        }
    }

    return (
        <form ref={ref} action="">
            <label htmlFor="login_email">Email</label>
            <input type="login_email" name="login_email" id="login_email" required/>
            <label htmlFor="login_password">Password</label>
            <input type="login_password" name="login_password" id="login_password" required/>
            <input type="submit" value="Login" onClick={login}/>
            {message && <p className="text-red-300">{message}</p>}
        </form>
    )
}