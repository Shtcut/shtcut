import React from 'react';

const FramesSelector6 = ({ onClick, selectedFrame }: { onClick: () => void; selectedFrame: number | undefined }) => {
    return (
        <div onClick={onClick} className=" w-24 h-24 cursor-pointer">
            <div
                className={`bg-[#F9F9F9]  cursor-pointer rounded-[10px] border ${selectedFrame === 6 ? 'border-primary-0' : 'border-[#E3E3E3]'}  w-full h-full flex justify-center flex-col items-center gap-y-2`}
            >
                <div className="flex flex-col gap-1">
                    <div className={` w-14  h-14 border-[1.5px] border-black  rounded-[4px] `} />

                    <div className=" bg-black  flex  justify-center items-center py-[3px] w-full rounded-[4px]">
                        <p className={`text-[10px] text-white uppercase`}>SCAN ME</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FramesSelector6;
