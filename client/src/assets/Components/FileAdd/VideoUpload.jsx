import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BasicSpeedDial from "../../../assets/Components/FileAdd/addBtn"
import DividerStack from "../../../assets/Components/FileAdd/fileAddCards"
import VideoUrlApp from "../../../assets/Components/videoTrim/videoUrlApp"
import VideoApp from "../../../assets/Components/videoTrim/videoApp"
import "../../../Css/modal.css"


function Example({
  setTitleInput,
  setFileImageEXT,
  setExtractMetaEXT,
  setPassedAudioDataUrlEXT,
  setVideoUrlEXT,
  handleUploadTrigger,
  setTagInput,
  triggerPopUp,
  handleHideTrigger
}) {
  
//<==================================VARIABLES=============================================>

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedPopOut,setSelectedPopOut] = useState("");
  const [currentPage,setCurrentPage] = useState("selectMedia");
  const [stageTracker,setStageTracker] = useState(0);

  //<==================================FUNCTIONS=============================================>

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const handleNext = (selectedPopOut) => {
    setCurrentPage(selectedPopOut);
    setStageTracker(1);
  }

  const handleUpload = () => {
    handleUploadTrigger()
    setShow(false)
  }

  const handleHide = () => {
    setShow(false)
    handleHideTrigger()
    setStageTracker(0)
  }


useEffect(() => {
  if(triggerPopUp == true){
    handleShow("lg-down")
  }
}, [triggerPopUp]);

  return (
    <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
      <BasicSpeedDial togglePopup={() => handleShow("lg-down")} />
      <Modal className='uploadMediaModal' show={show} fullscreen={fullscreen} onHide={() => handleHide() }>
        <Modal.Header className={localStorage.getItem('theme') == "dark"?('uploadMediaModalHeader-Dark'):("uploadMediaModalHeader-Light")} closeButton>
          <Modal.Title>Add Media</Modal.Title>
        </Modal.Header>
        <Modal.Body className={localStorage.getItem('theme') == "dark"?('uploadMediaModalBody-Dark'):("uploadMediaModalBody-Light")}>
          {currentPage == "selectMedia" ? <DividerStack setSelectedPopUp={setSelectedPopOut} /> : null}
          {currentPage == "link" ? <VideoUrlApp stageTrackerPassed={stageTracker} handleTagInput={setTagInput} handleTitleInput={setTitleInput} setExtractMeta={setExtractMetaEXT} setPassedAudioDataUrl={setPassedAudioDataUrlEXT} fileImage={setFileImageEXT} setPassedDataUrl={setVideoUrlEXT} />:null}
          {currentPage == "upload" ? <VideoApp stageTrackerPassed={stageTracker} handleTagInput={setTagInput} handleTitleInput={setTitleInput} fileImage={setFileImageEXT} setExtractMeta={setExtractMetaEXT} setPassedAudioDataUrl={setPassedAudioDataUrlEXT} videoURL={setVideoUrlEXT}/>:null}
        </Modal.Body>
        <Modal.Footer className={localStorage.getItem('theme') == "dark"?('uploadMediaModalFooter-Dark'):("uploadMediaModalFooter-Light")}>
        {stageTracker == 0  ? (<Button style={{background:"red",border:"none",padding:"2px 10px",fontSize:13}} onClick={() => {handleHide();setCurrentPage("selectMedia");setStageTracker(0);}}>Back</Button>
        ):(
        <Button style={{background:"red",border:"none",padding:"2px 10px",fontSize:13}} onClick={() => {setCurrentPage("selectMedia"); setStageTracker(0);}}>Back</Button>)}

        {currentPage == "selectMedia" ? <Button onClick={() => handleNext(selectedPopOut)}>Next</Button> :
          <Button onClick={() => handleUpload()}>Upload</Button>
        }
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Example;