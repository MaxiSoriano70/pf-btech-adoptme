import { useAdoptMeState } from '../Context';
import style from '../css/PetsAdopted.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import img2 from '../assets/img/banner2.jpg';

const Card = () => {
    return (
        <figure className={style.cFigure}>
            <img src={img2} alt="img-mascota" />
            <button className={style.cChange}>
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </figure>
    )
}

const PetsAdopted = () => {
    const { state, dispatch } = useAdoptMeState();
    const tittleTheme = state.modeDark ? style.dark : style.ligth;

    return (
        <section className={style.cardsContainer}>
            <h2 className={style.tittle + ' ' + tittleTheme}>Mascotas Adoptadas</h2>
            <article className={style.cards}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </article>
        </section>
    )
}

export default PetsAdopted;
