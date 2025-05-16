import React from "react";

function DisplaySection() {
    const handleTryMeClick = () => {
        window.open("https://www.apple.com/in/iphone/", "_blank");
    };

    return (
        <div className="display-section wrapper">
            <h2 className="text">New</h2>
            <p className="text">Brilliant</p>
            <span className="description">A display that's up to 2x brighter in the sun.</span>
            <button className="button" onClick={handleTryMeClick}>Try me!</button>
            <button className="back-button">Top</button>
        </div>
    );
}

export default DisplaySection;
