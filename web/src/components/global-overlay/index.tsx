// components/global-overlay.tsx

import React from 'react';

interface BlurOverlayProps {
    isVisible: boolean;
}

const BlurOverlay: React.FC<BlurOverlayProps> = ({ isVisible }) => {
    return (
        <div
            className={`fixed inset-0 bg-white/10 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} z-50`}
        />
    );
};

export default BlurOverlay;
