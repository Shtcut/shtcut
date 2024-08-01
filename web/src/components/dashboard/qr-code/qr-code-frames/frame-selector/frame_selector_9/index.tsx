import React from 'react';

const FramesSelector9 = ({ onClick, selectedFrame }: { onClick: () => void; selectedFrame: number | undefined }) => {
    return (
        <div onClick={onClick} className=" w-24 h-24 cursor-pointer">
            <div
                className={`bg-[#F9F9F9]  cursor-pointer rounded-[10px] border ${selectedFrame === 9 ? 'border-primary-0' : 'border-[#E3E3E3]'}  w-full h-full flex justify-center flex-col items-center gap-y-2`}
            >
                <div className="border-[1.5px] border-black  rounded-[4px]">
                    <div className=" bg-black  flex  justify-center items-center py-[3px] w-full">
                        <p className={`text-[10px] text-white uppercase`}>SCAN ME</p>
                    </div>
                    <div className={` w-14  h-14 `} />
                </div>
            </div>
        </div>
    );
};

export default FramesSelector9;
