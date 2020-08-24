import React from 'react';
import './styles.css';

const Property = ({propertyId, iconImage, Text, Value}) => {
    return (
    <div className="property">
        <p id={propertyId}>
            <img className="icons" src={iconImage} alt={Text} />{Text} <span className="value">{Value}</span>
        </p>
    </div>
    )
}

export default Property;