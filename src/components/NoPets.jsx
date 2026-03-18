import style from '../css/NoPets.module.css';
import imgCartel from '../assets/img/nohaymascotasenadopcion.png';
import { useAdoptMeState } from '../Context';

const NoPets = () => {
    const { state } = useAdoptMeState();
    const themeANoPets = state.modeDark ? "aNoPetsDark" : "aNoPetsLigth";

    return (
        <section className={style.sNoPets}>
            <article className={style.aNoPets + " " + style[themeANoPets]}>
                <img className={style.imgNoPets} src={imgCartel} alt="img-cartel"/>
                <p className={style.pNoPets}>¡No hay mascotas en adopción!</p>
            </article>
        </section>
    )
}

export default NoPets
