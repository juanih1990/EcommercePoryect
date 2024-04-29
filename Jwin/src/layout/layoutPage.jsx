import { Outlet } from "react-router-dom";
import NavBar from '../componentes/navBar'
const LayoutPage = () => {
    return (
        < div >
            <nav><NavBar /></nav>
            <main><Outlet /></main>
            <footer></footer>
        </div >
    )

}
export default LayoutPage