import { Button } from '@shtcut-ui/react';
import { modules as solutions } from '@shtcut/_shared/data';
import React from 'react';

const ModuleUi = ({ handleSelect, modules, userValue, uiUpdate }) => {
    const disabledModules = ['shtcut-survey', 'shtcut-marketing', 'shtcut-web-builder'];

    return (
        <div
            className={`flex flex-wrap  max-w-lg mx-auto  items-center cursor-not-allowed ${uiUpdate ? 'gap-2' : 'justify-center gap-4'}`}
        >
            {solutions.map((box, index) => (
                <Button
                    type="button"
                    disabled={disabledModules.includes(box.value)}
                    className={`${uiUpdate ? 'h-9 text-xs' : 'h-12 text-base'}  shadow-none  cursor-none ${
                        modules.includes(box.value)
                            ? 'bg-primary-0 text-white'
                            : 'bg-transparent hover:text-white text-[#433E3F] border border-[#726C6C] cursor-pointer'
                    } ${
                        index === modules.length - 1 ? 'col-span-full justify-self-center' : ''
                    } ${disabledModules.includes(box.value) ? 'opacity-50 cursor-not-allowed ' : ''}`}
                    key={index}
                    onClick={() => !disabledModules.includes(box.value) && handleSelect(box.value)}
                >
                    {box.key}
                </Button>
            ))}
        </div>
    );
};

export default ModuleUi;
