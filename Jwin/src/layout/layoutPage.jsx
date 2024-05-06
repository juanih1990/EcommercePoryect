import { Outlet } from "react-router-dom";
import NavBarContainer from '../containers/navBar.container'
import store from '../redux/store'

import { Provider } from "react-redux";

const LayoutPage = () => {
    return (
        <Provider store={store}>
            < div >
                <nav><NavBarContainer /></nav>
                <main><Outlet /></main>
                <footer></footer>
            </div >
        </Provider>

    )

}
export default LayoutPage