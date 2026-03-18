import { useAdoptMeState } from '../Context';
import imgCartel from '../assets/img/nohaymascotasadoptadas.png';
import style from '../css/NoAdopted.module.css';

const NoAdopted = () => {
    const { state } = useAdoptMeState();
    const themeNoAdopted = state.modeDark ? "aNoAdoptedDark" : "aNoAdoptedLigth";

    return (
        <section className={style.sNoAdopted}>
            <article className={style.aNoAdopted + " " + style[themeNoAdopted]}>
                <img className={style.imgNoAdopted} src={imgCartel} alt="img-cartel"/>
                <p className={style.pNoAdopted}>¡No hay mascotas adoptadas!</p>
            </article>
        </section>
    )
}

export default NoAdopted;
