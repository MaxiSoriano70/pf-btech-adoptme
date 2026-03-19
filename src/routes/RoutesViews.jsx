import style from '../css/Main.module.css';
import NavBar from "../components/NavBar";
import { useAdoptMeState } from '../Context';
import Footer from '../components/Footer';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../assets/utils/routes';
import Home from '../pages/Home';

const RoutesViews = () => {
    const { state } = useAdoptMeState();
    const modeMain = state.modeDark ? "dark" : "ligth";

    return (
        <>
            <NavBar/>
            <main className={style.mainPrincipal + " " + style[modeMain]}>
                <Routes>
                    <Route path={routes.home} element={<Home/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default RoutesViews;