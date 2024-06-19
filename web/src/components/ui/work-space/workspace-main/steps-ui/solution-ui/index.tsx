import { Button } from '@shtcut-ui/react';
import React from 'react';

const SolutionUi = ({ handleSelect, solutionValues }) => {
    const boxes = ['URL Shortener', 'Email Marketing', 'Social Media Marketing', 'Survey Creation'];

    return (
        <div className={`flex flex-wrap gap-4 max-w-lg mx-auto justify-center items-center`}>
            {boxes.map((box, index) => (
                <Button
                    className={`h-12  shadow-none ${solutionValues.includes(box) ? 'bg-primary-0 text-white' : 'bg-transparent hover:text-white text-[#433E3F] border border-[#726C6C]'} ${index === boxes.length - 1 ? 'col-span-full justify-self-center ' : ''} `}
                    key={index}
                    onClick={() => handleSelect(box)}
                >
                    {box}
                </Button>
            ))}
        </div>
    );
};

export default SolutionUi;
