
//REACT IMPORTS
import { Link } from 'react-router-dom';

//COMPONENTS
import FileCard from '../../../../assets/Components/FileAdd/fileCard.jsx'

const RecentRow = ({
    recentFiles
}) => {
    return (
        <>
            <hr className='divider-home' />
            <div className="memory_title">
            <h2>Recently Openned</h2>
            </div>
            <div className="folder-card-container" >
                {/*ADDED DOCUMENT*/}
                <Link  style={{marginTop:-40,padding:"10px 0px 20px"}} to={`/folder/${recentFiles.folder_id}/${recentFiles.id}`}>
                    <FileCard 
                    imgSrc={recentFiles.img} 
                    imgAlt="file img" 
                    title={recentFiles.title} 
                    tags={recentFiles.tag} 
                    related_count={recentFiles.related_count} 
                    video_size={recentFiles.video_size}
                    />
                </Link>
            </div>
        </>
    );
    }

export default RecentRow;