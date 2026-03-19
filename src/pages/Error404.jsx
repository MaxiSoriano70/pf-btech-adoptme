import style from '../css/Error404.module.css';
import img404 from '../assets/img/error-404.png';
import imgcat from '../assets/img/querido.png';
import { useAdoptMeState } from '../Context';
import { Link } from 'react-router-dom';
import { routes } from '../assets/utils/routes';

const Error404 = () => {
    const { state } = useAdoptMeState();
    const themeDMsj = state.modeDark ? "dMensajeDark" : "dMensajeLigth";

    return (
        <section className={style.sError404}>
            <article className={style.a404}>
                <figure className={style.fImg404}>
                    <img className={style.img404} src={img404} alt="error-404" />
                </figure>
                <figure className={style.fCat}>
                    <img className={style.imgCat} src={imgcat} alt="wanted-cat" />
                </figure>
            </article>
            <article className={style.aMensaje}>
                <div className={style.dMensaje + " " + style[themeDMsj]}>
                    <p className={style.pMensaje}>🐶 Esta página salió a pasear y no volvió... igual que algunos perros. Volvé al inicio y encontrá uno que sí se quede con vos. ❤️</p>
                    <Link to={routes.home} className={style.btnHome}>Volver al inicio</Link>
                </div>
            </article>
        </section>
    )
}

export default Error404;
