import detailsPageStyles from '../styles/detailspage.module.css';
import cross from '../assets/Cross.png';

export default function Modal({showmodal,setShowModal,video}) {
    return (
        <>
            {
                showmodal && <div className={detailsPageStyles.videoHolder}>
                    <iframe src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1`} frameborder="0"></iframe>
                    <img src={cross} onClick={() => {
                        setShowModal(false)
                    }} />
                </div>
            }
        </>
    )
}