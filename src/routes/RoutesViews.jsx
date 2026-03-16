import { useAdoptMeState } from "../Context";

const RoutesViews = () => {
    const { state } = useAdoptMeState();
    const tema = state.modeDark ? "modoDark" : "bgColorFondo";
    return (
        <>
            <Navbar/>
            <main className={`flex-grow-1 container-main ${tema} pb-5`}>
                <Routes>
                    <Route path={routes.home} element={<HomePage/>}/>
                    <Route path={routes.detalle+"/:id"} element={<DetallePage/>}/>
                    <Route path={routes.contacto} element={<ContactoPage/>}/>
                    <Route path={routes.favoritos} element={<FavoritosPage/>}/>
                    <Route path={routes.notFound} element={<Error404Page/>}/>
                </Routes>
            </main>
            <FooterClinica/>
        </>
    );
}

export default RoutesViews;