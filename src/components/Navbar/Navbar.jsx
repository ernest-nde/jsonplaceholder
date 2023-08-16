import { Link } from "react-router-dom";


export default function Navbar() {

    return (
        <nav className="bg-slate-200 p-5 justify-center text-center">
           <Link
            to="/"
            className="mx-2 text-md text-semibold"
           >
                Home
           </Link>
           <Link
                to="/about/"
                className="mx-2 text-md text-semibold"
           >
                About
           </Link>
        </nav>
    )
}
