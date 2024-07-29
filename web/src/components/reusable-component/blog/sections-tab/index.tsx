import React from 'react';

type IProps = {
    bg: string;
    text: string;
    textColor: string;
};

const SectionTabs = ({ bg, text, textColor }: IProps) => {
    return (
        <div className={`bg-[${bg}] text-[${textColor}]`}>
            <p>{text}</p>
        </div>
    );
};

export default SectionTabs;
