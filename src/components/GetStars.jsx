import star from '../assets/Star 1.png'
import covertRating from '../helper/rating'
export default function GetStars({ rating }) {
    let newRating = covertRating(rating);
    return (
        <div>
            {
                Array.from({ length: newRating }).map((_, index) => {
                    return <img src={star} alt="rating" key={index} />
                })
            }
        </div>
    )
}