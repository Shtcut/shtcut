import React from 'react';

const FramesSelector2 = ({ onClick, selectedFrame }: { onClick: () => void; selectedFrame: number | undefined }) => {
    return (
        <div onClick={onClick} className=" w-24 h-24 cursor-pointer">
            <div
                className={`bg-[#F9F9F9]  cursor-pointer rounded-[10px] border ${selectedFrame === 2 ? 'border-primary-0' : 'border-[#E3E3E3]'}  w-full h-full flex justify-center flex-col items-center gap-y-2`}
            >
                <div className={` w-14 border-black h-14 border-[1.5px]  w- rounded-[6px]`} />
                <div className="  flex rounded-b-[6px] justify-center items-center w-full">
                    <p className={`text-[10px]  uppercase`}>SCAN ME</p>
                </div>
            </div>
        </div>
    );
};

export default FramesSelector2;
