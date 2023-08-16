import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="mt-11 text-3xl font-semibold text-center h1t-10">Placeholder API Users</h1>
      <p className="w-1/2 text-center mx-auto mt-10">Using ReactJS framework to consume JSONPLACEHOLDER API just for fun!!</p>
      <Link
        to="/users"
        type="button"
        className="w-max flex mx-auto mt-12 px-4 py-2 border-solid border-slate-800 border-2 rounded-2xl hover:bg-slate-800 hover:text-slate-100"
      >
        Get Started
      </Link>
    </div>
  )
}
