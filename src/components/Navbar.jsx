import { Link } from "react-router-dom";

export default function Navbar({children}){

    return(
        <nav className='flex w-full items-center gap-[150px] p-4 bg-red-300/5 border border-red-300/50'>
            <Link to={"/"}><h1>Movies</h1></Link>
            {children}
        </nav>
    )
}