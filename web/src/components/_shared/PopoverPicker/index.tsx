import { useClickOutside } from '@shtcut/hooks/useOutside';
import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export const PopoverPicker = ({ color, onChange }) => {
    const popover = useRef(null);
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);

    useClickOutside(popover, close);

    return (
        <div className="picker">
            <div className="swatch" style={{ backgroundColor: color }} onClick={() => toggle(true)} />

            {isOpen && (
                <div className="popover" ref={popover}>
                    <HexColorPicker color={color} onChange={onChange} />
                </div>
            )}
        </div>
    );
};
