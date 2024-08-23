import { Button } from '@shtcut-ui/react';
import { modules as solutions } from '@shtcut/_shared/data';
import React from 'react';

const ModuleUi = ({ handleSelect, modules }) => {
    return (
        <div className={`flex flex-wrap gap-4 max-w-lg mx-auto justify-center items-center`}>
            {solutions.map((box, index) => (
                <Button
                    type="button"
                    className={`h-12  shadow-none ${modules.includes(box.value) ? 'bg-primary-0 text-white' : 'bg-transparent hover:text-white text-[#433E3F] border border-[#726C6C]'} ${index === modules.length - 1 ? 'col-span-full justify-self-center ' : ''} `}
                    key={index}
                    onClick={() => handleSelect(box.value)}
                >
                    {box.key}
                </Button>
            ))}
        </div>
    );
};

export default ModuleUi;
