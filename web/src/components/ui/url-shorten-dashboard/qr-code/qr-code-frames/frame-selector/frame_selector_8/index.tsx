import React from 'react';

const FramesSelector8 = ({ onClick, selectedFrame }: { onClick: () => void; selectedFrame: number | undefined }) => {
    return (
        <div onClick={onClick} className=" w-24 h-24 cursor-pointer">
            <div
                className={`bg-[#F9F9F9]  cursor-pointer rounded-[10px] border ${selectedFrame === 8 ? 'border-primary-0' : 'border-[#E3E3E3]'}  w-full h-full flex justify-center flex-col items-center gap-y-2`}
            >
                <div className="flex gap-2 flex-col items-center">
                    <div className={` w-14  h-14  border-[1.5px]   rounded-[6px] border-black`} />
                    <h5 className={`text-[10px] text-black  uppercase`}>SCAN ME</h5>
                </div>
            </div>
        </div>
    );
};

export default FramesSelector8;
