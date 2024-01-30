//DESC: this is the normal size video component (NORMAL)

import '../../Css/file.css'


const FrameVideo = ({ videoSrc }) => {


return videoSrc ? (
<>
  <article className="grid">
    <div className="bord_g_2">
      <video crossOrigin="anonymous" autoPlay controls muted width="450">
        <source src={videoSrc} type="video/mp4" crossOrigin="anonymous" />
      </video>
    </div>
  </article>
</>
) : null};
  
export default FrameVideo;  