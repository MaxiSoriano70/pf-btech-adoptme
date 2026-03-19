import { useAdoptMeState } from "../Context";
import NoPets from "./NoPets";
import PetsInAdopt from "./PetsInAdopt";
import Loading from "./Loading";

const SectionPetsInAdopt = ({ loading }) => {
    const { state } = useAdoptMeState();
    const petsInAdopt = state.pets.filter(p => !p.adoptado);

    if (loading) return <Loading/>;

    return (
        <>
            {petsInAdopt.length === 0 ? <NoPets /> : <PetsInAdopt />}
        </>
    );
}

export default SectionPetsInAdopt;