import { useAdoptMeState } from '../Context';
import style from '../css/Loading.module.css';

const Loading = () => {
    const { state } = useAdoptMeState();
    const themeLoading = state.modeDark ? "cDark" : "cLigth";
    const themePLoading = state.modeDark ? "pDark" : "pLigth";
    const themeLoader= state.modeDark ? "lDark" : "lLigth";

    return (
        <section className={style.cLoading + " " + style[themeLoading]}>
            <div className={style.loader + " " + style[themeLoader]}></div>
            <p className={style.pLoading + " " + style[themePLoading]}>Cargando...</p>
        </section>
    )
}

export default Loading;
