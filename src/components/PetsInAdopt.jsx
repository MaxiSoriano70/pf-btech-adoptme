import style from '../css/PetsInAdopt.module.css';
import img1 from '../assets/img/banner1.jpg';
import { useAdoptMeState } from '../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faPenToSquare, faHeart, faLocationDot, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Card = ({ cardTheme }) => {
    return (
        <div className={style.card + " " + cardTheme}>
            <figure className={style.cFigure}>
                <img src={img1} alt="img-mascota" />
                <button className={style.cDelete}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </figure>
            <div className={style.cardContent}>
                <h3 className={style.cardTitle}>Duki</h3>
                <div className={style.cardDescription}>
                    <div className={style.cardInfo2cols}>
                        <p className={style.pCard}><span className={style.itemBold}>Edad:</span> 4 meses.</p>
                        <p className={style.pCard}><span className={style.itemBold}>Raza:</span> Mestizo.</p>
                    </div>
                    <div className={style.cardInfo2cols}>
                        <p className={style.pCard}><span className={style.itemBold}><FontAwesomeIcon icon={faPhone} /></span> +54387123456.</p>
                        <p className={style.pCard}><span className={style.itemBold}>Sexo:</span> Macho.</p>
                    </div>
                    <div className={style.cardInfo2cols}>
                        <p className={style.pCard}><span className={style.itemBold}><FontAwesomeIcon icon={faLocationDot} /></span> Calle 123.</p>
                        <p className={style.pCard}><span className={style.itemBold}>Esterilizado:</span> No.</p>
                    </div>
                    <p className={style.cardDescriptionText}>Duki es un cachorro juguetón y cariñoso que busca un hogar lleno de amor. A pesar de su corta edad, Duki ya muestra una personalidad amigable y sociable, lo que lo convierte en el compañero perfecto para cualquier familia.</p>
                </div>
            </div>
            <div className={style.cardFooter}>
                <button className={style.btnAdotp}>Adoptado <FontAwesomeIcon icon={faHeart} /></button>
                <button className={style.btnEdit}>Editar <FontAwesomeIcon icon={faPenToSquare} /></button>
            </div>
        </div>
    )
}

const PetsInAdopt = () => {
    const { state, dispatch } = useAdoptMeState();
    const cardTheme = state.modeDark ? style.cardDark : style.cardLigth;
    const tittleTheme = state.modeDark ? style.dark : style.ligth;

    return (
        <section className={style.cardsContainer}>
            <article>
                <h2 className={style.tittle + " " + tittleTheme}>Mascotas en Adopción</h2>
            </article>
            <article className={style.cards}>
                <Card cardTheme={cardTheme} />
                <Card cardTheme={cardTheme} />
                <Card cardTheme={cardTheme} />
            </article>
        </section>
    )
}

export default PetsInAdopt;
