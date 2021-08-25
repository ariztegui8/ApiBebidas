import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

//Crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //State del provider
    const [idreceta, guardarIdReceta] = useState(null);
    const [informacion, guardarReceta] = useState({});

    //Una vez que tenemos una receta, llamamos a la Api
    useEffect(()=>{
        const obtenerReceta = async ()=> {
            if(!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await axios(url);
            
            guardarReceta(resultado.data.drinks[0]);
        }
        obtenerReceta();
    },[idreceta]);

    return (
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider
