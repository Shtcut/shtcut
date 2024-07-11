import React from 'react';

const FramesSelector4 = ({ onClick, selectedFrame }: { onClick: () => void; selectedFrame: number | undefined }) => {
    return (
        <div onClick={onClick} className=" w-24 h-24 cursor-pointer">
            <div
                className={`bg-[#F9F9F9]  cursor-pointer rounded-[10px] border ${selectedFrame === 4 ? 'border-primary-0' : 'border-[#E3E3E3]'}  w-full h-full flex justify-center flex-col items-center gap-y-2`}
            >
                <div className="relative bottom-6">
                    <p className={`text-[10px] uppercase`}>SCAN ME</p>
                </div>
                <div className="flex justify-center items-center   relative ">
                    {/* Top Left */}
                    <div className="absolute top-0 left-0 w-6 h-6" style={{ backgroundColor: 'transparent' }}>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-black"></div>
                    </div>
                    {/* Top Right */}
                    <div style={{ backgroundColor: 'transparent' }} className="absolute top-0 right-0 w-6 h-6">
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-black"></div>
                    </div>
                    {/* Bottom Left */}
                    <div style={{ backgroundColor: 'transparent' }} className="absolute bottom-0 left-0 w-6 h-6">
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-black"></div>
                    </div>
                    {/* Bottom Right */}
                    <div style={{ backgroundColor: 'transparent' }} className="absolute bottom-0 right-0 w-6 h-6">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-black border-l-[1.5px] "></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FramesSelector4;
