// components/global-overlay.tsx

import React from 'react';

interface BlurOverlayProps {
    isVisible: boolean;
}

const BlurOverlay: React.FC<BlurOverlayProps> = ({ isVisible }) => {
    return (
        <div
            className={`  ${isVisible ? 'opacity-100 fixed inset-0 bg-white/10 backdrop-blur-sm ' : 'opacity-0'} z-50 duration-300 transition-opacity `}
        />
    );
};

export default BlurOverlay;
