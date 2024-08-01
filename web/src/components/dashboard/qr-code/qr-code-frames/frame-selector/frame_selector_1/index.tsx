import React from 'react';

const FramesSelector1 = ({ onClick, selectedFrame }: { onClick: () => void; selectedFrame: number | undefined }) => {
    return (
        <div onClick={onClick} className=" w-24 h-24 cursor-pointer">
            <div
                className={`bg-[#F9F9F9]  cursor-pointer rounded-[10px] border  ${selectedFrame === 1 ? 'border-primary-0' : 'border-[#E3E3E3]'}  w-full h-full flex justify-center items-center`}
            >
                <div className={` w-14 border-black h-14 border-[1.5px]  w- rounded-[6px]`} />
            </div>
        </div>
    );
};

export default FramesSelector1;
