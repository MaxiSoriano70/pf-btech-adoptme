import { useAdoptMeState } from '../Context';
import style from '../css/PetsAdopted.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { updatePet } from '../firebase/service';

const Card = ({ pet }) => {
    const { dispatch } = useAdoptMeState();

    const handleChangeInAdopt = async () => {
        const confirm = await Swal.fire({
            title: `¿Estás seguro de volver a adopciones ${pet.nombre}?`,
            text: "Esta acción marcará la mascota como disponible para adopción",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, volver",
            cancelButtonText: "Cancelar"
        });

        if (!confirm.isConfirmed) return;

        try {
            await updatePet(pet.id, { adoptado: false });

            dispatch({
                type: "UPDATE_PET",
                payload: { id: pet.id, adoptado: false }
            });

            Swal.fire({
                icon: "success",
                title: "¡Confirmado!",
                text: `${pet.nombre} esta disponible para ser adoptad@`
            });

        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar", "error");
        }
    };
    return (
        <figure className={style.cFigure}>
            <img className={style.imgPet} src={pet.foto} alt="img-mascota" />
            <button className={style.cChange} onClick={handleChangeInAdopt}>
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </figure>
    )
}

const PetsAdopted = () => {
    const { state } = useAdoptMeState();
    const pets = state.pets.filter(p => p.adoptado);

    return (
        <section className={style.cardsContainer}>
            <article className={style.cards}>
                {pets.map((pet) => (
                    <Card
                        key={pet.id}
                        pet={pet}
                    />
                ))}
            </article>
        </section>
    )
}

export default PetsAdopted;
