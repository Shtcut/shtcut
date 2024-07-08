import { Button } from '@shtcut-ui/react';
import { colors } from '@shtcut/_shared/data';
import { PropsColor } from '@shtcut/types/types';
import React from 'react';

const ColorsQrCode = ({ handleColorClick }: PropsColor) => {
    return (
        <div>
            <div className="grid grid-cols-6 gap-x-10  w-1/2 gap-y-3">
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
            <section className="mt-6 ">
                <h2 className="text-lg font-medium rounded-[10px] p-[23px] bg-[#F7F7F7]">
                    Border and background color
                </h2>
            </section>
        </div>
    );
};

export default ColorsQrCode;
