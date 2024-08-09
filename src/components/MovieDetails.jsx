import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Frame from '../assets/Frame.png';
import covertRating from '../helper/rating';
import play from '../assets/Group 36.svg';
import Spinner from './Spinner';
import detailsPageStyles from '../styles/detailspage.module.css';
import Modal from './Modal';
import axios from 'axios';
import Nav from './Nav';
import { toast } from 'react-toastify';
import MobileView from './MobileView';

export default function MovieDetails() {
    let navigate = useNavigate()

    let [movieDetails, setMovieDetails] = useState({}); //movie details state
    const [showmodal, setShowModal] = useState(false); //state for modal
    let [video, setVideo] = useState('');
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState('');
    let { id } = useParams(); //to get the unique id from the movies list
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US`;
    //function to open modal
    function modalHandler() {
        if (video) setShowModal(true);
        else toast.error("The trailer is currently unavailable");
    };

    function previosPageHandler() {
        navigate('/movies') //back to movies page
    }

    useEffect(() => {
        async function getMovieDetails() {
            try {
                setLoading(true)
                let { data } = await axios(url);
                if (data) {
                    setMovieDetails(data);  //movie data
                }
            } catch (error) {
                toast(error.message);
                setError(error.message);
            } finally {
                // Simulate a delay for the spinner to show for 1 second
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
        getMovieDetails();
    }, [url]);

    useEffect(() => {
        async function getMovie() {
            try {
                let { data } = await axios(`https://api.themoviedb.org/3/movie/${movieDetails.id}/videos?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US`);
                let { results } = data;
                if (results && results.length > 0) {
                    setVideo(results[0].key);  //trailer data
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (movieDetails.id) {
            getMovie();
        }
    }, [movieDetails]);

    return (
        <>
            <div >
                <div >
                    <Nav />
                </div>
                {
                    loading && !error && <div className={detailsPageStyles.detailsPageContainer} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Spinner color='#FFF' />
                    </div>
                }
                {
                    !loading && error && <h2>{error}</h2>
                }
                {
                    !loading && !error && Object.keys(movieDetails).length > 0 &&
                    <div className={detailsPageStyles.detailsPageContainer} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})` }}>

                        <div className={detailsPageStyles.detailsSection}>
                            <div className={detailsPageStyles.detailsContainer}>
                                <div className={detailsPageStyles.backSec} onClick={previosPageHandler}>
                                    <img src={Frame} alt="backIcon" />
                                </div>
                                <div className={detailsPageStyles.titleSection} >
                                    <h3>{movieDetails.original_title}</h3>
                                    <span>Rating : {covertRating(movieDetails.vote_average)}/5</span>
                                    <p>{movieDetails?.overview?.slice(0, 280) + "..."}</p>
                                </div>
                                <div className={detailsPageStyles.releaseSection}>
                                    <div className={detailsPageStyles.releaseDate}>
                                        <h3>Release date</h3>
                                        <p>{movieDetails && new Date(movieDetails.release_date).getFullYear()}</p>
                                    </div>
                                    <div className={detailsPageStyles.languageSection}>
                                        <h3>original language</h3>
                                        <ul>
                                            {
                                                movieDetails?.spoken_languages?.map((lang, i) => {
                                                    return <li key={i}>{lang.english_name}</li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={detailsPageStyles.videoSection}>
                            <div className={detailsPageStyles.playButton} >
                                <img src={play} alt="playbutton" onClick={modalHandler} />
                            </div>
                        </div>
                        <Modal showmodal={showmodal} setShowModal={setShowModal} video={video} />
                    </div>
                }
                <MobileView movieDetails={movieDetails} />
            </div>
        </>
    )
}