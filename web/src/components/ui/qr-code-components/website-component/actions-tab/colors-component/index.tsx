import { Button } from '@shtcut-ui/react';
import { colors, tabs } from '@shtcut/_shared/data';
import useQrCodeColorHooks from '@shtcut/hooks/code-color';
import React, { useState } from 'react';
import ColorPicker from 'react-pick-color';
import { useDispatch } from 'react-redux';
import TemplatesComponent from '../../../../../general-template/templates';
import { setBgColor, setBorderColor, setBtnColor, setPresetColor } from '@shtcut/redux/slices/selects';
import useGeneralState from '@shtcut/hooks/general-state';
import { setQrCodePresetColor } from '@shtcut/redux/slices/qr-code';

const ColorsQrCode = ({ selectedTabIndex }: { selectedTabIndex?: number }) => {
    const dispatch = useDispatch();
    const { bgColor, btnColorString, tabParams, selectedTab, borderColor, presetColorString } = useGeneralState();
    const { action, state, refs } = useQrCodeColorHooks();
    const [isTransparent, setIsTransparent] = useState(bgColor === 'transparent');
    const [previousColor, setPreviousColor] = useState(bgColor !== 'transparent' ? bgColor : '#FFFFFF');
    // const urlSectionTab = tabParams === 'vCard' && selectedTabIndex !== 4;
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsTransparent(checked);
        if (checked) {
            setPreviousColor(bgColor);
            dispatch(setBgColor('transparent'));
        } else {
            dispatch(setBgColor(previousColor as string));
        }
    };
    const handleBgColorChange = (color: string) => {
        if (!isTransparent) {
            dispatch(setBgColor(color));
            setPreviousColor(color);
        }
    };

    const handleColorSelect = (color: string) => {
        if (selectedTabIndex === 4) {
            dispatch(setQrCodePresetColor(color));
        } else if (tabParams === 'pdf') {
            dispatch(setQrCodePresetColor(color));
        } else dispatch(setPresetColor(color));
    };

    const handleBtnColorChange = (color: string) => {
        if (selectedTabIndex === 4) {
            dispatch(setBorderColor(color));
        } else if (tabParams === 'website') {
            dispatch(setBorderColor(color));
        } else if (tabParams === 'pdf') {
            dispatch(setBorderColor(color));
        } else dispatch(setBtnColor(color));
    };

    return (
        <div>
            {tabParams === 'website' || selectedTabIndex === 4 || tabParams === 'pdf' ? null : (
                <section>
                    <TemplatesComponent />
                </section>
            )}
            <p className="my-4 font-medium">Presets</p>
            <div className="grid grid-cols-6 gap-x-10 w-1/2 gap-y-3">
                {colors.map((color) => (
                    <div key={color.id} className="relative w-[50px] h-[50px]">
                        <Button
                            onClick={() => handleColorSelect(color.value)}
                            key={color.id}
                            className="w-full h-full"
                            style={{
                                backgroundColor: color.value
                            }}
                        />
                        {presetColorString === color.value && (
                            <div className="absolute z-30 top-[-5px] right-0 text-green-500 text-xs">✅</div>
                        )}
                    </div>
                ))}
            </div>
            <section className="mt-6 rounded-[10px] p-[23px] bg-[#F7F7F7]">
                <h2 className=" font-medium">Border and background color</h2>
                <div className="bg-white mt-4 flex justify-between p-4 lg:p-7">
                    <div className="relative">
                        <p className="text-sm font-medium">
                            {selectedTab === 4 || tabParams === 'website' || tabParams === 'pdf'
                                ? 'Border Color'
                                : 'Button color'}{' '}
                        </p>
                        <div
                            className="flex border cursor-pointer items-center w-52 rounded px-4 h-[42px] justify-between mt-6"
                            onClick={action.toggleColorPicker}
                        >
                            <div>{selectedTab === 0 ? btnColorString : borderColor}</div>
                            <div
                                className="w-6 h-6 border rounded-[4px] "
                                style={{ backgroundColor: btnColorString }}
                            />
                        </div>
                        {state.showColorPicker && (
                            <div className="absolute z-10 bottom-16" ref={refs.colorPickerRef}>
                                <ColorPicker
                                    color={btnColorString}
                                    onChange={(color) => handleBtnColorChange(color.hex)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <p className="text-sm font-medium">Background color</p>
                        <div
                            onClick={action.toggleBgColorPicker}
                            className="flex border cursor-pointer items-center w-52 rounded px-4 h-[42px] justify-between mt-6"
                        >
                            <div>{String(bgColor)}</div>
                            <div
                                className="w-6 h-6 rounded-[4px] border"
                                style={{ backgroundColor: String(bgColor) }}
                            />
                        </div>
                        {state.showBgColorPicker && (
                            <div className="absolute z-10 bottom-16" ref={refs.bgColorPickerRef}>
                                <ColorPicker
                                    color={String(bgColor)}
                                    onChange={(color) => handleBgColorChange(color.hex)}
                                />
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
