import { Button } from '@shtcut-ui/react';
import { colors } from '@shtcut/_shared/data';
import useQrCodeColorHooks from '@shtcut/hooks/qr-code-color';
import { PropsColor } from '@shtcut/types/types';
import React, { useState } from 'react';
import ColorPicker from 'react-pick-color';

const ColorsQrCode = ({ setBgColor, bgColor, btnColor, setBtnColor, handleColorClick }: PropsColor) => {
    const { action, state, refs } = useQrCodeColorHooks();
    const [isTransparent, setIsTransparent] = useState(bgColor === 'transparent');
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsTransparent(checked);
        setBgColor(checked ? 'transparent' : bgColor);
    };

    const handleBgColorChange = (color: string) => {
        if (!isTransparent) {
            setBgColor(color);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-6 gap-x-10 w-1/2 gap-y-3">
                {colors.map((color) => (
                    <Button
                        onClick={() => handleColorClick(color.value)}
                        key={color.id}
                        className="w-[50px] h-[50px]"
                        style={{
                            backgroundColor: color.value
                        }}
                    />
                ))}
            </div>
            <section className="mt-6 rounded-[10px] p-[23px] bg-[#F7F7F7]">
                <h2 className="text-lg font-medium">Border and background color</h2>
                <div className="bg-white flex justify-between p-4 lg:p-7">
                    <div className="relative">
                        <p className="text-sm font-medium">Button color</p>
                        <div className="flex border items-center w-52 rounded px-4 h-[42px] justify-between mt-6">
                            <div>{btnColor}</div>
                            <div
                                className="w-6 h-6 rounded-[4px] cursor-pointer"
                                style={{ backgroundColor: btnColor }}
                                onClick={action.toggleColorPicker}
                            />
                        </div>
                        {state.showColorPicker && (
                            <div className="absolute z-10 bottom-16" ref={refs.colorPickerRef}>
                                <ColorPicker color={btnColor} onChange={(color) => setBtnColor(color.hex)} />
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <p className="text-sm font-medium">Background color</p>
                        <div
                            onClick={action.toggleBgColorPicker}
                            className="flex border items-center w-52 rounded px-4 h-[42px] justify-between mt-6"
                        >
                            <div>{bgColor}</div>
                            <div className="w-6 h-6 rounded-[4px]" style={{ backgroundColor: bgColor }} />
                        </div>
                        {state.showBgColorPicker && (
                            <div className="absolute z-10 bottom-16" ref={refs.bgColorPickerRef}>
                                <ColorPicker color={bgColor} onChange={(color) => handleBgColorChange(color.hex)} />
                            </div>
                        )}
                        <div className="flex items-center gap-x-2 mt-2">
                            <input type="checkbox" checked={isTransparent} onChange={handleCheckboxChange} />{' '}
                            <span className="text-xs">Transparent Background</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ColorsQrCode;
