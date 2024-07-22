import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="w-full flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="w-[100px]" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Link to={"table"}>Go to table</Link>
    </>
  );
}

export default App;
