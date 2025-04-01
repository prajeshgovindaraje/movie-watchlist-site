

export default function Trailer({src}){

    



    return(
        <>
        
        <div className="trailer-section-container">

            <h1>Watch Trailer</h1>
            <iframe src={src} allowFullScreen></iframe>

        </div>
        
        
        </>
    )


}