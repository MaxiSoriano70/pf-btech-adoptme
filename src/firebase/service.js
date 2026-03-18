
import { collection, addDoc, getDocs, updateDoc,deleteDoc, doc } from "firebase/firestore";
import { db } from "./config";


export const addPet = async (pet) => {
    try {
        const docRef = await addDoc(collection(db, "pets"), pet);
        return { id: docRef.id, ...pet };
    } catch (error) {
        console.error("Error al agregar mascota:", error);
    }
};

export const getPets = async () => {
    try {
        const snapshot = await getDocs(collection(db, "pets"));

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error al obtener mascotas:", error);
    }
};

export const updatePet = async (id, updatedData) => {
    try {
        const petRef = doc(db, "pets", id);

        await updateDoc(petRef, updatedData);

        return { id, ...updatedData };
    } catch (error) {
        console.error("Error al actualizar mascota:", error);
    }
};

export const deletePet = async (id) => {
    try {
        const petRef = doc(db, "pets", id);

        await deleteDoc(petRef);

        return id;
    } catch (error) {
        console.error("Error al eliminar mascota:", error);
    }
};