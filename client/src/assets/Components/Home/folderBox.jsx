import React from 'react';
import { Link } from 'react-router-dom';

const FolderBox = ({ folder }) => {
    return(
        <div className='home-folder' key={folder.id}>
            <div
                className="ag-courses-item_bg"
                style={{ background: folder.color  }}
            />

            <div className='folder-title'>
                <h4>{folder.title}</h4>
                <h6>Files: {folder.files_count}</h6>
            </div>
            <div className='folder-bottom'>
                <div className='folder-bottom-left'>
                    <div className='folder-tags'>
                    <div className='f-tag'>
                        <h6>{folder.visibility}</h6>
                    </div>
                    
                    </div>
                    <h6 className='f-created-by'>Created: <span>{folder.creator_name}</span></h6>
                </div>
                <Link className='folder-open-btn' to={`/folder/${folder.id}`} >
                    <h6>Open</h6>
                </Link>
            </div>
        </div>
    )
};

export default FolderBox;