//COMPONENTS
import CircularWithValueLabel from '../progressBar.jsx'

const WelcomeRow = ({
    userData
}) => {
    return(
        <div className='welcome-row'>
            <div>
                <h1>Welcome Back, {userData.fullname}</h1>
                <h6>Clippify is the place to learn and save information</h6>
            </div>
            <div className='cloud'>
            <div><CircularWithValueLabel progress={userData.storage_take / 1000000 / 1000} className='cloud-progress'/></div>
                {userData.subscription ?(<h5>{(userData.storage_take / 1000000 / 1000).toFixed(2)} / 100 GB</h5>):(<h5>{(userData.storage_take / 1000000 / 1000).toFixed(2)} / 10 GB</h5>)}
            <h2 className='cloud-title'>Cloud Storage</h2>
            </div>
        </div>
    )
}

export default WelcomeRow;