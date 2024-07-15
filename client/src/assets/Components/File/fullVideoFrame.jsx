//DESC: Full frame video component (BIGGEST)

import '../../../Css/file.css'


const FullFrameVideo = ({videoSrc }) => {


return videoSrc ? (
<>
  <article className="full-grid">
    
      <video crossOrigin="anonymous" autoPlay controls muted>
        <source src={videoSrc} type="video/mp4" crossOrigin="anonymous" />
      </video>

  </article>
</>
):null};
  
export default FullFrameVideo;



  