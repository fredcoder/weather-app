import React from 'react';
import './styles.css';

const Page = () => {
    return (
        <div className="SpinnerIcon">
            <svg xmlns="http://www.w3.org/2000/svg" style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto"}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#f5f5f5" strokeWidth="3" r="25" strokeDasharray="115.934, 56.9779">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
            </svg>
        </div >
    )
}

export default Page
