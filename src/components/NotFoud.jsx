import { Link } from "react-router-dom";

export default function NotFoud() {
  return (
    <div>
      <p className="text-4xl font-semibold text-center pt-10">404 : Page not found 🤖</p>
      <div className="text-center mt-10">
        {/* <a href="/">Back to homepage</a> */}
        <Link
            to="/"
            className="hover:font-bold hover:text-red-500 hover:uppercase"
        >
            Back to homepage
        </Link>
      </div>
    </div>
  )
}
