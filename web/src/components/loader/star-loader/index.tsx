/** @format */

import React from 'react';
import './style.css';

type Props = {
    isDefault?: boolean;
    color?: string;
};

const StarLoader = ({ isDefault = true, color = '#2f64e9' }: Props) => {
    return (
        <div
            className={`${isDefault ? 'container' : 'container-second'}`}
            style={{ '--uib-color': color } as React.CSSProperties}
        >
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="line"></div>
            ))}
        </div>
    );
};

export default StarLoader;
