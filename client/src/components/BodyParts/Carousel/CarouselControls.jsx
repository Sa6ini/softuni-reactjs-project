

export default function CarouselControls({ onPrev, onNext }) {
    return (
        <>
            <button className="carousel-control-prev" type="button" onClick={onPrev}>
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" onClick={onNext}>
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </>
    );
}
