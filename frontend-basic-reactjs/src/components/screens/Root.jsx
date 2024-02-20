import { Outlet } from "react-router-dom";
import Navigation from "../elements/Navigation";

export default function Root() {
  return (
    <>
        <header>
            <Navigation/>
        </header>
        <div>
            <h3>Bienvenue Pseudo</h3>
            <Outlet/>
        </div>
    </>
  );
}