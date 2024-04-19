//COMPONENTS
import FolderBox from '../folderBox.jsx';

//ICON
import CloseIcon from '@mui/icons-material/Close';

const FolderRow = ({ 
    folders,
    folderTitle,
    setFolderTitle,
    folderColor,
    setFolderColor,
    visibilityFolder,
    setVisibilityFolder,
    isPlusClicked,
    setIsPlusClicked,
    handleFolderCreateSubmit,
}) => {
    return(
        <>
            <hr className='divider-home' />
            {/*FODLER ADDED*/}
            <div className="memory_title" >
                <h2>Your Folders</h2>
                <a href="/memory">View All</a>
            </div>
            <div className="folder-card-container" > 
                <div className="folder-card-box" >
                    {/*FOLDERs*/}
                    {folders.length == 0 ? (
                        <NoFolder />
                    ) : (
                        folders.map((folder) => 
                            folder && folder.id ? (
                                <FolderBox folder={folder} />
                            ):null
                        )
                    )}
                    {/*ADD FOLDER*/}
                    {!isPlusClicked ? (
                        <AddFolder
                            setIsPlusClicked={setIsPlusClicked}
                            isPlusClicked={isPlusClicked}
                        />
                    ) : (
                        <CreateFolder
                            folderTitle={folderTitle}
                            setFolderTitle={setFolderTitle}
                            folderColor={folderColor}
                            setFolderColor={setFolderColor}
                            visibilityFolder={visibilityFolder}
                            setVisibilityFolder={setVisibilityFolder}
                            isPlusClicked={isPlusClicked}
                            setIsPlusClicked={setIsPlusClicked}
                            handleFolderCreateSubmit={handleFolderCreateSubmit}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default FolderRow;


export const NoFolder = () => {
    return(
        <div className="no-folder">
        <a className='no-folder-a' >No Folder Added ! <br /> <span style={{fontSize:15}}>Click to Create ..</span><br />
        </a>
    </div>
)
}

export const AddFolder = ({
    setIsPlusClicked,
    isPlusClicked
}) => {
    return(
        <div className='add-home-folder' onClick={() => setIsPlusClicked(!isPlusClicked)}>
            <h3 >+ Add Folder</h3>
        </div>
    )
}

export const CreateFolder = ({
    folderTitle,
    setFolderTitle,
    folderColor,
    setFolderColor,
    visibilityFolder,
    setVisibilityFolder,
    isPlusClicked,
    setIsPlusClicked,
    handleFolderCreateSubmit
}) => {
    return(
        <div className='add-folder-create'>
        <h3>Create Folder</h3>
        <CloseIcon onClick={() => setIsPlusClicked(!isPlusClicked)} className='add-folder-close-icon' />
        <div className='create-top'>
            <div className='create-title'>
            <h5 style={folderTitle.length != 0 ?{color:"green"}:null}>Title</h5>
            <input
                value={folderTitle}
                type="text"
                className="input"
                id="user-container-title"
                onChange={(e) => setFolderTitle(e.target.value)}
            />
            </div>
            <div className='add-color'>
            <h5 style={folderColor.length != 0 ?{color:"green"}:null} >Pick a Color</h5>
            <input
                type="color"
                value={folderColor}
                onChange={(e) => setFolderColor(e.target.value)}
            />
            </div>
        </div>
        <div className='create-bottom'>
            <div className='visibility'>
            <h5>Visibility</h5>
            <select onChange={(e) => setVisibilityFolder(e.target.value)}>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            </div>
            <div className='create-folder-btn'>
            <button
                onClick={handleFolderCreateSubmit}
                style={folderTitle.length != 0 && folderColor.length != 0 ?{opacity:1}:null}
            >Create</button>
            </div>
        </div> 
        </div>
    )
}
