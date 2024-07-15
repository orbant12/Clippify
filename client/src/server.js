export const ApiLocataion = "https://us-central1-orcaapp-dfa9b.cloudfunctions.net/app"

//export const ApiLocataion = "http://localhost:3000"


//<====> REST & Firebase <====>

/*== User Data ==*/

export const fetchUserData = async (currentUserId) => {
    const response = await fetch(`${ApiLocataion}/user/${currentUserId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

/*== Recent File ==*/

export const fetchRecentFile = async ({
    recentFileId,
    recentFolderId,
    currentuser
}) => {
    const response = await fetch(`${ApiLocataion}/recent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            recent_folder_id: recentFolderId,
            recent_file_id: recentFileId,
            user_Id: currentuser.uid
        }),
    });

    return response;
}

export const updateRecentFile = ({
    currentUserId,
    folderUrl,
    currentURL
}) => {
    fetch(`${ApiLocataion}/recent/update/${currentUserId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            recent_folder_id: folderUrl,
            recent_file_id: currentURL,
        }),
        });
}

/*== Fodler ==*/

export const fetchUserFolders = async (currentUserId) => {
    const response = await fetch(`${ApiLocataion}/user/folder/get/${currentUserId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response;
} 

export const fetchFolderDetails = async ({
    urlID,
    currentUserId
}) => {
    const response = await fetch(`${ApiLocataion}/folder/${urlID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId, folderId: urlID}),
    });
    return response;
}

export const fetchFolderFiles = async ({
    currentUserId,
    urlID
}) => {
    const response = await fetch(`${ApiLocataion}/folder/file`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId, folderId: urlID}),
    })

    return response;
}

export const deleteFolderFirestore = async({
    folderID,
    currentUserId
}) => {
    fetch(`${ApiLocataion}/folder/delete/${folderID}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId}),
    })
}

export const createFileFirestore = async ({
    newFile,
    folderID,
    currentUserId,
    userData,
    videoSize
}) => {
    const response = await fetch(`${ApiLocataion}/folder/file-create/${folderID}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileToUpload: newFile, userId: currentUserId, currentStorageTake: userData.storage_take, videoSize: videoSize}),
    })
    return response;
}

export const updateFolderTitle = async ({
    currentUserId,
    urlID,
    editedTitle
}) => {
    fetch(`${ApiLocataion}/folder/update-title/${urlID}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId, folderTitle: editedTitle}),
    })
}

export const updateFolderFileCount = ({
    currentUserId,
    urlID,
    userFile
}) => {
    fetch(`${ApiLocataion}/folder/update-count/${urlID}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId, fileCount: userFile.length}),
    })
}


/*== Related File ==*/

export const createRelatedFile = async ({}) => {
    fetch(`${ApiLocataion}/related-file/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            folderId: folderUrl,
            userId: currentUserId,
            fileId: currentURL,
            relatedFile: newRelatedFile,
            currentStorageTake: currentStorageTake,
            videoSize: videoSize,
        }),
    });
}