
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React, {useState} from 'react'

const FaqBar = ({
    FaqTitle,
    FaqDesc
}) => {

    const [isHovered, setIsHovered] = React.useState(false);

  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleFaqBoxClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    return(
        <>
      {/*FIRST*/}
      <div className='faq-box' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleFaqBoxClick}>
      <div className='faq-content'>
          <h3>{FaqTitle}</h3>
          {isHovered ? <SearchOutlinedIcon /> : <QuestionMarkOutlinedIcon />}
      </div>
  </div>

  <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
{/* Dummy text for the dropdown */}
<div className='drop-text'>
<p>{FaqDesc}</p>
</div>
  </div>
  </>
  );
}

export default FaqBar