import { useAdoptMeState } from "../Context";
import NoAdopted from "./NoAdopted";
import PetsAdopted from "./PetsAdopted";
import Loading from "./Loading";

const SectionPetsAdopted = ({ loading }) => {
    const { state } = useAdoptMeState();
    const petsAdopted = state.pets.filter(p => p.adoptado);

    if (loading) return <Loading />;

    return (
        <>
            {petsAdopted.length === 0 ? <NoAdopted /> : <PetsAdopted />}
        </>
    );
}

export default SectionPetsAdopted;
