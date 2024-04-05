import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BasicSpeedDial from "../../assets/FileAdd/addBtn"
import DividerStack from "../../assets/FileAdd/fileAddCards"
import VideoUrlApp from "../../assets/videoTrim/videoUrlApp"
import VideoApp from "../../assets/videoTrim/videoApp"
import "../../Css/modal.css"

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

  //<==================================FUNCTIONS=============================================>

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const handleNext = (selectedPopOut) => {
    setCurrentPage(selectedPopOut);
  }

  const handleUpload = () => {
    handleUploadTrigger()
    setShow(false)
  }

  const handleHide = () => {
    setShow(false)
    handleHideTrigger()
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
        <Modal.Header className='uploadMediaModalHeader' closeButton>
          <Modal.Title>Add Media</Modal.Title>
        </Modal.Header>
        <Modal.Body className='uploadMediaModalBody'>
          {currentPage == "selectMedia" ? <DividerStack setSelectedPopUp={setSelectedPopOut} /> : null}
          {currentPage == "link" ? <VideoUrlApp handleTagInput={setTagInput} handleTitleInput={setTitleInput} setExtractMeta={setExtractMetaEXT} setPassedAudioDataUrl={setPassedAudioDataUrlEXT} fileImage={setFileImageEXT} setPassedDataUrl={setVideoUrlEXT} />:null}
          {currentPage == "upload" ? <VideoApp handleTitleInput={setTitleInput} fileImage={setFileImageEXT} setExtractMeta={setExtractMetaEXT} setPassedAudioDataUrl={setPassedAudioDataUrlEXT} videoURL={setVideoUrlEXT}/>:null}
        </Modal.Body>
        <Modal.Footer className='uploadMediaModalFooter'>
        {currentPage == "selectMedia" ? <Button onClick={() => handleNext(selectedPopOut)}>Next</Button> :
          <Button onClick={() => handleUpload()}>Upload</Button>
        }
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Example;