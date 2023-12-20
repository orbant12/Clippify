import '../../Css/file.css'

function RelatedVideoBar({imgURL,relatedTitle,relatedTag,relatedDuration}) { 
return(
    <div className='sec_bar-clip'>
        <div className='sec_bar-left'>
            <img  className='sec_bar-img' src={imgURL} alt="thubnail" crossOrigin='anonymus' />
            <div className='subtitle-and-tag-cont'>
                <h3 className='subtitle'>{relatedTitle}</h3>
                 <h6 className='sub-tag' >{relatedTag}</h6>
            </div>
        </div>
        <h6 className='sec_bar-clip-duration' >{relatedDuration}</h6>
    </div>
)
}

export default RelatedVideoBar