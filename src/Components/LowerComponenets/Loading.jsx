import React from 'react';
import  loadingPink from "../../images/loadingPink.gif";

export const Loading = () => {
    return (
        <div className="loading_container">
            <h2>Loading......</h2>
            <img src={loadingPink} alt="Loading..." />
        </div>
    );
};

