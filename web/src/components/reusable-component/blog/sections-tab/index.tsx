import React from 'react';

type IProps = {
    text: string;
    textColor: string;
};

const SectionTabs = ({ text, textColor }: IProps) => {
    return (
        <div style={{ backgroundColor: `${textColor}10`, color: textColor }} className='shadow-sm cursor-pointer p-1 w-fit px-2 rounded-[16px]'>
            <p className='text-[13px] font-medium'>{text}</p>
        </div>
    );
};

export default SectionTabs;
