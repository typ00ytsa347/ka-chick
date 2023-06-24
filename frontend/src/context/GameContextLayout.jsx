import { Outlet } from "react-router-dom";
import { GameContextProvider } from "./GameContextProvider";

export default function GameContextLayout() {

    return(
        <GameContextProvider>
            <Outlet/>
        </GameContextProvider>
    )
}