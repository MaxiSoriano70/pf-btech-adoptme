import { useState } from 'react';
import style from '../css/Banner.module.css';
import ModalAddPet from './ModalAddPet';

const Banner = () => {
    const [show, setShow] = useState(false);

    return (
        <section className={style.banner}>
            <article className={style.bArticle}>
                <h1 className={style.tittlePrincipal}>Bienvenid@ a Adopt Me</h1>
                <h2 className={style.tittleSecundary}>Encuentra un hogar para perros y gatos que buscan una segunda oportunidad</h2>
                <p className={style.txtBanner}>En nuestra plataforma podrás conocer perros y gatos que esperan encontrar una familia que los cuide y les dé amor. Aquí podrás ver sus historias, características y cómo adoptarlos de forma responsable. Cada adopción cambia una vida: la del animal y también la tuya. Explora las mascotas disponibles y ayúdanos a darles el hogar que merecen.
                </p>
                <div className={style.cButtonCreate}>
                    <button className={style.btnCreate} onClick={() => setShow(true)}>
                        Agregar Mascota
                    </button>
                    <ModalAddPet show={show} handleClose={() => setShow(false)} />
                </div>
            </article>
        </section>
    )
}

export default Banner;
