import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

//Crear el Context
export const CategoriasContext = createContext();

//Provider es donde se encuentran las funciones y state
const CategoriasProvider = (props) => {

    //Crear el state del Context
    const [categorias, guardarCategorias] = useState([]);

    //Ejecutar el llamado a la Api
    useEffect(()=>{
        const obtenerCategorias = async ()=>{
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const categorias = await axios(url);

            guardarCategorias(categorias.data.drinks);
            return;
        }
        obtenerCategorias();
    }, [])

    return(
        <CategoriasContext.Provider
            value={{categorias}}
        >
            {props.children}
        </CategoriasContext.Provider>
    )

}

export default CategoriasProvider;


