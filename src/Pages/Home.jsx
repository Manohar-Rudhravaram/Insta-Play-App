import React, { useContext, useEffect } from "react";
import wallpaper from '../assets/wallpaperflare1.png';
import { listContext } from "../context/ListContext";
import play from '../assets/Group 36.svg';
import { searchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import GetStars from "../components/GetStars";
import covertRating from "../helper/rating";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import movieImg from '../assets/movie.png';
import homeStyles from '../styles/home.module.css';
import Nav from "../components/Nav";

export default function Home() {
    const { data, loading, error } = useContext(listContext); //context data
    const { search, searchLoader } = useContext(searchContext); //context data
    const navigate = useNavigate();
    // Conditional check for data
    //
    const movies = search.keyword ? search.result : data?.results;
    useEffect(() => {
        const access_token = sessionStorage.getItem("token"); //checking user is logged in or not
        if (!access_token) {
            navigate("/");
        }
    }, [])

    //navigating to single page of movie details with unique id
    function detailsHandler(id) {
        navigate(`/movies/${id}`)
    }
    return (
        <div>
            <Nav />
            <div className={homeStyles.homecontainer}>
                <div className={homeStyles.wallpaper}>
                    <img src={wallpaper} alt="wallpaper-notfound" />
                </div>
                {!search.keyword ?
                    <div className={homeStyles.trending}>Trending</div> :
                    <div className={homeStyles.searchingtext}>Search results for '{search.keyword}'</div>
                }
                {searchLoader &&
                    <div className={homeStyles.spinner}>
                        <Spinner />
                    </div>}
                <div className={homeStyles.movieslist}>
                    {loading && !error &&
                        <div className={homeStyles.initspinner}>
                            <Spinner />
                        </div>
                    }
                    {!loading && error && <h4>Error</h4>}
                    {!loading && !error && movies?.length > 0 ? (
                        movies.map(movie => (
                            <div key={movie.id} className={homeStyles.moviecontainer}>
                                <section className={homeStyles.card}>
                                    <div className={homeStyles.imagecontainer}>
                                        <img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie.
                                            backdrop_path}` : `${movieImg}`} alt='x' id="movie-poster" />
                                    </div>
                                    <div className={homeStyles.moviecontentcontainer}>
                                        <div className={homeStyles.moviecontent}>
                                            <h3 className={movie.title.length >= 23 && homeStyles.ellipses}>{movie.title}</h3>
                                            <span>{movie.title}</span>
                                            <div className={homeStyles.ratingbox}>
                                                <GetStars rating={movie.vote_average} />
                                                <div className={homeStyles.rating}>{covertRating(movie.vote_average)
                                                }/5</div>
                                            </div>
                                        </div>
                                        <div className={homeStyles.playicon} onClick={() => detailsHandler(movie.id)}>
                                            <img src={play} alt="play icon" />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        ))
                    ) : (
                        !loading && !error && !searchLoader && movies?.length == 0 && <h4 className={homeStyles.nomovies}>No movies found</h4>
                    )}
                </div>
                {
                    movies?.length > 0 &&
                    <div className="pagination-container">
                        <Pagination />
                    </div>
                }
            </div>
        </div>
    );
}