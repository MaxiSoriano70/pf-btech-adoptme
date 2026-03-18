import Banner from "../components/Banner";
import Loading from "../components/Loading";
import NoAdopte from "../components/NoAdopted";
import NoPets from "../components/NoPets";
import PetsAdopted from "../components/PetsAdopted";
import PetsInAdopt from "../components/PetsInAdopt";

const Home = () => {
    return (
        <>
            <Banner/>
            <Loading/>
            <NoPets/>
            <PetsInAdopt/>
            <NoAdopte/>
            <PetsAdopted/>
        </>
    )
}

export default Home;
