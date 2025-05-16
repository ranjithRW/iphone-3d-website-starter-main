import React from 'react'
import Iphone from '../assets/images/iphone-14.jpg';
import HoldingPhone from '../assets/images/iphone-hand.png';

function Jumbotron() {

    const handleLearnMore = () => {
        const element = document.querySelector('.sound-section');
        window.scrollTo({
            top: element?.getBoundingClientRect().top,
            left: 0,
            behavior: 'smooth',
        });
    }
    return (
        <div className="jumbotron-section wrapper ">
            <h2 className="text">New</h2>
            <h2>IPhone 14</h2>
            <p className='text'>Big and bigger</p>
            <span className="description">
                From $41.62/mo. for 24 mo. or $999 before trade-in
            </span>
            <ul className="links">
                <li>
                    <button className='button'>Buy</button>
                </li>
                <li>
                    <a className='link' onClick={handleLearnMore}>Learn more</a>
                </li>
            </ul>
            <img src={HoldingPhone} alt='iphone' className='iphone-img' />
        </div>
    );
}

export default Jumbotron;