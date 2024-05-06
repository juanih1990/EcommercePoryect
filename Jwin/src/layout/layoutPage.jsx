import { Outlet } from "react-router-dom";
import NavBar from '../componentes/navBar'
import store from '../redux/store'

import { Provider } from "react-redux";

const LayoutPage = () => {
    return (
        <Provider store={store}>
            < div >
                <nav><NavBar /></nav>
                <main><Outlet /></main>
                <footer></footer>
            </div >
        </Provider>

    )

}
export default LayoutPage