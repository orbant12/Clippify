//COMPONENTS
import { Row, Col } from 'react-bootstrap';
import FileCard from "../../FileAdd/fileCard";
import { Link } from 'react-router-dom';

const FolderRow = ({
    userFile,
    id,
    setShow
}) => {
    return(
        <Row style={{marginTop:10}}>
            <Col>
            {userFile.length != 0 ? (
            <>
            {userFile.map((file) => (
                <Link to={`/folder/${id}/${file.id}`}>
                    <div key={file.id}>
                        <FileCard imgSrc={file.img} title={file.title} tags={file.tag} video_size={file.video_size} />
                    </div>
                </Link>
    
            ))}
            </>
            ):(
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:150,justifyContent:"center"}}>
                    <h4>No media added yet...</h4>
                    <h6 onClick={() => setShow(true)} style={{padding:"10px 20px",border:"0.1px solid black",borderRadius:240,marginTop:10,cursor:"pointer",background:"transparent"}}>+ Upload New Media</h6>
                </div>
            )}
            </Col>
        </Row>
    )
}

export default FolderRow;
