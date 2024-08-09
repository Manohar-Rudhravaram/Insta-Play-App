import React, { createContext, useEffect, useReducer, useState } from "react";
import Reducer from "../reducer/Reducer";
export let listContext = createContext();
export default function ListContext({ children }) {
    let [pageCount, setPageCount] = useState(1);
    let initialState = {
        data: [],
        error: '',
        loading: false
    };

    let [state, dispatch] = useReducer(Reducer, initialState);
    
    useEffect(() => {
        dispatch({ type: 'loading' });
        async function getData() {
            try {
                let response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&page=${pageCount}`).then(res => res.json());
                dispatch({ type: "fetch", payload: response })
            } catch (error) {
                dispatch({ type: 'error', payload: error.message })
            }
        }
        getData()
    }, [pageCount]);
    return (
        <listContext.Provider value={{ ...state, pageCount, setPageCount }}>
            {
                children
            }
        </listContext.Provider>
    )
}