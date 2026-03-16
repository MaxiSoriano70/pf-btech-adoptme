import { useAdoptMeState } from '../Context';
import style from '../css/Footer.module.css';

const Footer = () => {
    const { state, dispatch } = useAdoptMeState();
    const modeFooter = state.modeDark ? "darkFooter" : "ligthFooter";
    return (
        <footer className={style.footerPrincipal + " " + style[modeFooter]}>
            <p className={style.footerText}>Maximiliano Soriano &copy; 2026</p>
        </footer>
    )
}

export default Footer;
