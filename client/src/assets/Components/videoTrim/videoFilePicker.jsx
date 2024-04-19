function VideoFilePicker({ showVideo, handleChange, children }) {

const FileInput = () => (
  <label
    htmlFor="x"
    id={`${showVideo ? "file_picker_small" : ""}`}
    className={localStorage.getItem('theme') == "dark" ? (`file_picker-dark`) : (`file_picker-light`)}
  >
    <span style={{opacity:0.3}}>choose file</span>
    <input onChange={handleChange} type="file" id="x" accept="video/mp4" />
  </label>
);


return showVideo ? (
  <>
    {" "}
    {children} 
  </>
  ) : (
    <FileInput />
  )
}

export default VideoFilePicker;
