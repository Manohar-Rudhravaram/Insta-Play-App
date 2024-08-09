import { useNavigate } from 'react-router-dom';
import Frame from '../assets/Frame.png';
import covertRating from '../helper/rating';
import detailsPageStyles from '../styles/detailspage.module.css';

export default function MobileView({movieDetails}) {
       let navigate= useNavigate()
    function previosPageHandler(){
        navigate('/movies')
    }
    return (
        <>
            <div className={detailsPageStyles.mobileViewContainer}>
                <div className={detailsPageStyles.movieDetailsImage}>
                    <img src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`} alt="poster" />I
                </div>
                <img src={Frame} alt="back" className={detailsPageStyles.backIcon} onClick={previosPageHandler} />
                <div className={detailsPageStyles.movieDetails}>
                    <h3>{movieDetails.title}</h3>
                    <span>Rating : {covertRating(movieDetails.vote_average)}</span>
                    <p>{movieDetails.overview}</p>
                </div>
                <div className={detailsPageStyles.releaseDetails}>
                    <div className={detailsPageStyles.releaseSections}>
                        <h5>Release Date</h5>
                        <p>{movieDetails && new Date(movieDetails.release_date).getFullYear()}</p>
                    </div>
                    <div className={detailsPageStyles.languageSections}>
                        <h5>Original Language</h5>
                        <ul>
                            {
                                movieDetails?.spoken_languages?.map((lang, i) => {
                                    return <li key={i}>{lang.english_name},</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}