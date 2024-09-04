import React from 'react';
type Props = {
    color?: string;
    size?: string;
    onClick: () => void;
};

const MenuIcon: React.FC<Props> = ({ color = '#303237', size = 24, onClick }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path d="M5 7H19" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5 12H19" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5 17H19" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export default MenuIcon;
