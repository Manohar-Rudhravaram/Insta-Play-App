import React, { createContext, useContext, useEffect, useState } from "react";
import { listContext } from "./ListContext";
import useFetch from "../customHook/useFetch";

export let searchContext = createContext();

export default function SearchContext({ children }) {
    const [search, setSearch] = useState({ keyword: "", result: [] });
    const { data: { results } } = useContext(listContext);
    const [searchLoader, setSearchLoader] = useState(false);
    const { pageCount } = useContext(listContext);
    let [totalPages, setTotalPages] = useState(0);
    let url = `https://api.themoviedb.org/3/search/movie?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US&query=${search.keyword}&page=${pageCount}}&include_adult=false`
    const { data } = useFetch(url); //custom hook to call api with search value and page count
    useEffect(() => {
        let timer;
        async function filterData() {
            setSearch((prev) => ({ ...prev, result: data.results }));
            setSearchLoader(false);
            setTotalPages(data.total_pages);
        }

        //debouncing in input search to reduce api calls
        if (search.keyword) {
            timer = setTimeout(() => {
                setSearchLoader(true)
                filterData();
            }, 1000);
        } else {
            // Clear the results if the search keyword is empty
            setSearch((prev) => ({ ...prev, result: [] }));
            setSearchLoader(false);
        }

        // Cleanup function to clear the timeout if the component unmounts or keyword changes
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [search.keyword, results]); // Add results to dependency array to filter data when results change

    return (
        <searchContext.Provider value={{ search, setSearch, searchLoader, setSearchLoader, totalPages }}>
            {children}
        </searchContext.Provider>
    );
}
