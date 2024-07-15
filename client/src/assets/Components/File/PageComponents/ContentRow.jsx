import { Link } from 'react-router-dom';

//COMPONENTS
import FrameVideo from '../videoFrame';
import RelatedVideoBar from '../relatedVideo';
import PaginationUi from '../paginationUI';
import ToggleButtons from "../mainShow"
import FullFrameVideo from "../fullVideoFrame"

const ContentRow = ({
    secBarState,
    setSecBarState,
    fileElements,
    childrenFiles,
    folderUrl,
    currentURL,
    nextPage,
    fetchPreviousPage,
    currentPage,
    totalPages,
}) => {
    return (
        <>
            <div className='sec_bar-cont'>
            {/*VIDEO FRAME With PAG*/}
            {!secBarState?
                <>
                <div className='sec_bar-video'>
                    <FrameVideo crossOrigin="anonymous" videoSrc={fileElements.url} />
                </div>
                {/*CLIPS COLLECTION*/}
                <div className='sec_bar-clips-cont'>
                    {childrenFiles.length === 0 ? (
                    <p style={{textAlign:"center",marginTop:80,opacity:0.6}} >No related videos added</p>
                    ) : (
                    childrenFiles.map(element => (
                        element && element.id ? (
                        <div className="clip-sec" key={element.id}>
                            {/* You might want to uncomment the Link component if needed */}
                            <Link to={`/folder/${folderUrl}/${currentURL}/${element.id}`}> 
                            <RelatedVideoBar imgURL={element.img} relatedDuration={(element.duration).match(/\d+:\d+:\d+/)[0]} relatedTag={element.tag} relatedTitle={element.title}/>
                            </Link> 
                        </div>
                        ):null
                    ))
                    )}
                    
                    <div className='pagination-bar'>
                    <PaginationUi 
                        fetchNextPage={nextPage} 
                        fetchPreviousPage={fetchPreviousPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    /> {/*Pagination Bottom Bar*/}
                    </div>
                </div>
                </>:(
                <div className='sec_bar-video-main'>
                    <FullFrameVideo crossOrigin="anonymous" videoSrc={fileElements.url} />
                </div>
                )}
            </div>
            {/*TOGGLE BUTTON */}
            <div className='main-view-select'>
            <ToggleButtons secBarState={setSecBarState}/>
            </div>
        </>
    )

}

export default ContentRow;