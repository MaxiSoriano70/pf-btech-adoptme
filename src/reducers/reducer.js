export const reducer = (state, action) => {
    switch (action.type) {

        // 🌙 MODO OSCURO
        case "CHANGE_MODE":
            return {
                ...state,
                modeDark: !state.modeDark
            };

        // 📥 SET (cargar mascotas)
        case "SET_PETS":
            return {
                ...state,
                pets: action.payload
            };

        // ➕ AGREGAR
        case "ADD_PET":
            return {
                ...state,
                pets: [...state.pets, action.payload]
            };

        // ✏️ ACTUALIZAR
        case "UPDATE_PET":
            return {
                ...state,
                pets: state.pets.map(pet =>
                    pet.id === action.payload.id
                        ? { ...pet, ...action.payload }
                        : pet
                )
            };

        // ❌ ELIMINAR
        case "DELETE_PET":
            return {
                ...state,
                pets: state.pets.filter(pet => pet.id !== action.payload)
            };

        default:
            return state;
    }
};