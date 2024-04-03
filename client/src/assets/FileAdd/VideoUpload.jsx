import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BasicSpeedDial from "../../assets/FileAdd/addBtn"
import DividerStack from "../../assets/FileAdd/fileAddCards"
import VideoUrlApp from "../../assets/videoTrim/videoUrlApp"
import VideoApp from "../../assets/videoTrim/videoApp"


function Example({setTitleInput,setFileImageEXT,setExtractMetaEXT,setPassedAudioDataUrlEXT,setVideoUrlEXT,handleUploadTrigger,setTagInput}) {
  
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

  return (
    <>
    <BasicSpeedDial togglePopup={() => handleShow("lg-down")} />
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentPage == "selectMedia" ? <DividerStack setSelectedPopUp={setSelectedPopOut} /> : null}
          {currentPage == "link" ? <VideoUrlApp handleTagInput={setTagInput} handleTitleInput={setTitleInput} setExtractMeta={setExtractMetaEXT} setPassedAudioDataUrl={setPassedAudioDataUrlEXT} fileImage={setFileImageEXT} setPassedDataUrl={setVideoUrlEXT} />:null}
          {currentPage == "upload" ? <VideoApp handleTitleInput={setTitleInput} fileImage={setFileImageEXT} setExtractMeta={setExtractMetaEXT} setPassedAudioDataUrl={setPassedAudioDataUrlEXT} videoURL={setVideoUrlEXT}/>:null}
        </Modal.Body>
        <Modal.Footer>
        {currentPage == "selectMedia" ? <Button onClick={() => handleNext(selectedPopOut)}>Next</Button> :
          <Button onClick={() => handleUpload()}>Upload</Button>
        }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;