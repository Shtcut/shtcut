import { useEffect, useRef, useState } from 'react';

const useQrCodeColorHooks = () => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showBgColorPicker, setShowBgColorPicker] = useState(false);
    const colorPickerRef = useRef<HTMLDivElement>(null);
    const bgColorPickerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
            setShowColorPicker(false);
        }
        if (bgColorPickerRef.current && !bgColorPickerRef.current.contains(event.target as Node)) {
            setShowBgColorPicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
        if (showBgColorPicker) setShowBgColorPicker(false);
    };

    const toggleBgColorPicker = () => {
        setShowBgColorPicker(!showBgColorPicker);
        if (showColorPicker) setShowColorPicker(false);
    };

    return {
        state: {
            showColorPicker,
            showBgColorPicker
        },
        action: {
            toggleColorPicker,
            toggleBgColorPicker
        },
        refs: {
            colorPickerRef,
            bgColorPickerRef
        }
    };
};

export default useQrCodeColorHooks;
