import './App.css';
import RoutesViews from './routes/RoutesViews';
import { useEffect, useState } from "react";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/config';
import LoadingPage from './components/LoadingPage';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    signInAnonymously(auth)
      .catch((error) => {
        console.error("Error auth:", error);
      });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario listo:", user.uid);
        setLoading(false);
      }
    });

    return () => unsubscribe();

  }, []);

  if (loading) return <LoadingPage/>;

  return <RoutesViews />;
}

export default App;