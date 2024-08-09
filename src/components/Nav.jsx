import Icon from '../assets/Icon.png'
import searchicon from '../assets/Group 47.svg'
import navStyles from '../styles/nav.module.css';
import Polygon from '../assets/Polygon.svg'
import { searchContext } from "../context/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useContext } from 'react';

export default function Nav() {
    const location = useLocation();
    const navigate = useNavigate()
    let { search, setSearch, setSearchLoader } = useContext(searchContext); //context data

    //search handler to filter movies
    const handleInputSearch = ({ target: { value } }) => {
        setSearchLoader(true);
        setSearch({ ...search, keyword: value })
    }

    //function handler to logout 
    function logoutHandler() {
        sessionStorage.getItem('token') && sessionStorage.removeItem('token')
        toast('Logged out Successfully')
        navigate('/') //navigate to signin page
    }

    function pathHandler(){
        if(location.pathname!=='/movies' && location.pathname!=='/'){
            navigate('/movies')
        }
    }
    return (
        <>
            <nav className={navStyles.navbar}>
                <div className={navStyles.logo} onClick={pathHandler}>
                    <img src={Icon} alt="icon" className={navStyles.main} />
                    <img src={Polygon} alt="icon" className={navStyles.polygon} />
                </div>
                <div className={navStyles.navright}>
                    {location.pathname === '/movies' && (
                        <>
                        <div className={navStyles.searchcontainer}>
                            <input type="text" placeholder="Search..." onChange={handleInputSearch} value={search.keyword} />
                            <img src={searchicon} alt="" />
                        </div>
                    <h5 className={navStyles.logoutbutton} onClick={logoutHandler}>Logout</h5>
                    </>
                    )}
                </div>
            </nav>
        </>
    )
}