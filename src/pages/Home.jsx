import { useEffect, useState } from "react";
import style from '../css/Home.module.css';
import Banner from "../components/Banner";
import Loading from "../components/Loading";
import NoAdopte from "../components/NoAdopted";
import NoPets from "../components/NoPets";
import PetsAdopted from "../components/PetsAdopted";
import PetsInAdopt from "../components/PetsInAdopt";
import { useAdoptMeState } from "../Context";
import { getPets } from "../firebase/service";

const Home = () => {
    const { state, dispatch } = useAdoptMeState();
    const tittleTheme = state.modeDark ? style.dark : style.ligth;

    const [ loading, setLoading ] = useState();

    useEffect(() => {
        const fetchPets = async () => {
            const pets = await getPets();

            dispatch({
                type: "SET_PETS",
                payload: pets || []
            });

            setLoading(false);
        };

        fetchPets();
    }, []);

    if (loading) return <Loading />;

    const petsInAdopt = state.pets.filter(p => !p.adoptado);
    const petsAdopted = state.pets.filter(p => p.adoptado);


    return (
        <>
            <Banner/>
            {petsInAdopt.length === 0
                ? (
                    <>
                    <h2 className={style.tittle + " " + tittleTheme}>🐾 Mascotas en Adopción</h2>
                    <NoPets />
                    </>
                )
                : <PetsInAdopt pets={petsInAdopt} />
            }

            {petsAdopted.length > 0
                ? <PetsAdopted pets={petsAdopted} />
                : (
                    <>
                    <h2 className={style.tittle + " " + tittleTheme}>❤️ ADOPTADAS</h2>
                    <NoAdopte/>
                    </>
                )
            }
        </>
    )
}

export default Home;
