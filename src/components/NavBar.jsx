import style from '../css/NavBar.module.css';
import logo from '../assets/img/Logo.png';
import { Link } from 'react-router-dom';
import { routes } from '../assets/utils/routes';
import { useAdoptMeState } from '../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const { state, dispatch } = useAdoptMeState();
    const modeHeader = state.modeDark ? "headerDark" : "headerLight";
    const modeTxtLogo = state.modeDark ? "txtLogoDark" : "txtLogoLigth";
    const modeTittle = state.modeDark ? "tittleDark" : "tittleLigth";
    const modeBtn = state.modeDark ? "btnModeDark" : "btnModeLight";

    const changeMode = () => {
        dispatch({ type: "CHANGE_MODE", playload: state.modeDark });
    }

    return (
        <header className={style.header + " " + style[modeHeader]}>
            <Link className={style.sLogo} to={routes.home}>
                <section className={style.clogo}>
                    <img className={style.logo} src={logo} alt="Logo"/>
                </section>
                <p className={style.txtLogo + " " + style[modeTxtLogo]}>Adopt Me</p>
            </Link>
            <section className={style.sTittle}>
                <p className={style.txtTittle + " " + style[modeTittle]}>Proyecto Final BTech</p>
            </section>
            <section className={style.sMode}>
                <button className={style[modeBtn]} onClick={changeMode}>
                {
                    state.modeDark
                    ? (<><FontAwesomeIcon icon={faSun}/> Light</>)
                    : (<><FontAwesomeIcon icon={faMoon}/> Dark</>)
                }
                </button>
            </section>
        </header>
    )
}

export default NavBar;
