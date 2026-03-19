import { useEffect, useState } from "react";
import style from '../css/Home.module.css';
import Banner from "../components/Banner";
import { useAdoptMeState } from "../Context";
import { getPets } from "../firebase/service";
import SectionPetsInAdopt from "../components/SectionPetsInAdopt";
import SectionPetsAdopted from "../components/SectionPetsAdopted";

const Home = () => {
    const { state, dispatch } = useAdoptMeState();
    const [loading, setLoading] = useState(true);
    const tittleTheme = state.modeDark ? style.dark : style.ligth;

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const pets = await getPets();
                dispatch({ type: "SET_PETS", payload: pets || [] });
            } catch (error) {
                console.error("Error al cargar mascotas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    return (
        <>
            <Banner/>
            <h2 className={style.tittle + " " + tittleTheme}>🐾 Mascotas en Adopción</h2>
            <SectionPetsInAdopt loading={loading}/>
            <h2 className={style.tittle + " " + tittleTheme}>❤️ Mascotas ADOPTADAS</h2>
            <SectionPetsAdopted loading={loading}/>
        </>
    );
}

export default Home;
