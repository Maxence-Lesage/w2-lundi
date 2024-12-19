export default function Logout() {

    function logout(){
        localStorage.removeItem("token");
    }

  return (
    <input className="bg-gray-600 cursor-pointer" type="button" value="Déconnexion" onClick={logout}/>
  );
}