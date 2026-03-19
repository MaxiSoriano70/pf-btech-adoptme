import style from '../css/PetsInAdopt.module.css';
import { useAdoptMeState } from '../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faPenToSquare, faHeart, faLocationDot, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { deletePet, updatePet } from '../firebase/service';

const Card = ({ cardTheme, pet }) => {
    const { dispatch } = useAdoptMeState();

    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return "Sin datos";

        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);

        const diffTiempo = hoy - nacimiento;
        const dias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24));

        if (dias < 30) {
            return `${dias} día${dias !== 1 ? 's' : ''}`;
        }

        const meses = Math.floor(dias / 30);

        if (meses < 12) {
            return `${meses} mes${meses !== 1 ? 'es' : ''}`;
        }

        const años = Math.floor(meses / 12);

        return `${años} año${años !== 1 ? 's' : ''}`;
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "¿Eliminar mascota?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (!confirm.isConfirmed) return;

        try {
            await deletePet(pet.id);

            dispatch({
                type: "DELETE_PET",
                payload: pet.id
            });

            Swal.fire("Eliminado", "La mascota fue eliminada", "success");

        } catch (error) {
            Swal.fire("Error", "No se pudo eliminar", "error");
        }
    };

    const handleAdopt = async () => {
        const confirm = await Swal.fire({
            title: `¿Estás seguro de adoptar a ${pet.nombre}? 🐾`,
            text: "Esta acción marcará la mascota como adoptada",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, adoptar ❤️",
            cancelButtonText: "Cancelar"
        });

        if (!confirm.isConfirmed) return;

        try {
            await updatePet(pet.id, { adoptado: true });

            dispatch({
                type: "UPDATE_PET",
                payload: { id: pet.id, adoptado: true }
            });

            Swal.fire({
                icon: "success",
                title: "🎉 ¡Adopción confirmada!",
                text: `${pet.nombre} ahora tiene un hogar ❤️`
            });

        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar", "error");
        }
    };

    return (
        <div className={style.card + " " + cardTheme}>
            <figure className={style.cFigure}>
                <img className={style.imgPet} src={pet.foto} alt="img-mascota" />
                <button className={style.cDelete} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </figure>
            <div className={style.cardContent}>
                <h3 className={style.cardTitle}>{pet.nombre}</h3>
                <div className={style.cardDescription}>
                    <div className={style.cardInfo2cols}>
                        <p className={style.pCard}><span className={style.itemBold}>Edad:</span> {calcularEdad(pet.fechaNacimiento)}.</p>
                        <p className={style.pCard}><span className={style.itemBold}>Raza:</span> {pet.raza}.</p>
                    </div>
                    <div className={style.cardInfo2cols}>
                        <p className={style.pCard}><span className={style.itemBold}><FontAwesomeIcon icon={faPhone} /></span> {pet.telefono}</p>
                        <p className={style.pCard}><span className={style.itemBold}>Sexo:</span> {pet.sexo}.</p>
                    </div>
                    <div className={style.cardInfo2cols}>
                        <p className={style.pCard}><span className={style.itemBold}><FontAwesomeIcon icon={faLocationDot} /></span> {pet.domicilio}.</p>
                        <p className={style.pCard}><span className={style.itemBold}>Esterilizado:</span> {pet.esterilizado}.</p>
                    </div>
                    <p className={style.cardDescriptionText}>{pet.descripcion}.</p>
                </div>
            </div>
            <div className={style.cardFooter}>
                <button className={style.btnAdotp} onClick={handleAdopt}>Adoptado <FontAwesomeIcon icon={faHeart} /></button>
                <button className={style.btnEdit}>Editar <FontAwesomeIcon icon={faPenToSquare} /></button>
            </div>
        </div>
    )
}

const PetsInAdopt = () => {
    const { state } = useAdoptMeState();
    const pets = state.pets.filter(p => !p.adoptado);

    const cardTheme = state.modeDark ? style.cardDark : style.cardLigth;

    return (
        <section className={style.cardsContainer}>
            <article className={style.cards}>
                {pets.map((pet) => (
                    <Card
                        key={pet.id}
                        pet={pet}
                        cardTheme={cardTheme}
                    />
                ))}
            </article>
        </section>
    )
}

export default PetsInAdopt;
