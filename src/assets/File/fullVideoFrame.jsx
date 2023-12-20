//DESC: Full frame video component (BIGGEST)

import '../../Css/file.css'


const FullFrameVideo = ({videoSrc }) => {


return videoSrc ? (
<>
  <article className="full-grid">
    <div className="full-bord_g_2">
      <video crossOrigin="anonymous" autoPlay controls muted width="450">
        <source src={videoSrc} type="video/mp4" crossOrigin="anonymous" />
      </video>
    </div>
  </article>
</>
):null};
  
export default FullFrameVideo;



  