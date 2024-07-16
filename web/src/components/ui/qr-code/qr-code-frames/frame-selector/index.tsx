import React from 'react';
import FramesSelector1 from './frame_selector_1';
import FramesSelector2 from './frame_selector_2';
import FramesSelector3 from './frame_selector_3';
import FramesSelector4 from './frame_selector_4';
import FramesSelector5 from './frame_selector_5';
import FramesSelector6 from './frame_selector_6';
import FramesSelector7 from './frame_selector_7';
import FramesSelector8 from './frame_selector_8';
import FramesSelector9 from './frame_selector_9';

const FramesSelector = ({
    setSelectedFrame,
    selectedFrame
}: {
    setSelectedFrame: (frame: number) => void;
    selectedFrame: number | undefined;
}) => {
    return (
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-y-[16px] w-5/6 gap-x-[20px]">
            <FramesSelector1 selectedFrame={selectedFrame} onClick={() => setSelectedFrame(1)} />
            <FramesSelector2 selectedFrame={selectedFrame} onClick={() => setSelectedFrame(2)} />
            <FramesSelector3 selectedFrame={selectedFrame} onClick={() => setSelectedFrame(3)} />
            <FramesSelector4 onClick={() => setSelectedFrame(4)} selectedFrame={selectedFrame} />
            <FramesSelector5 onClick={() => setSelectedFrame(5)} selectedFrame={selectedFrame} />
            <FramesSelector6 onClick={() => setSelectedFrame(6)} selectedFrame={selectedFrame} />
            <FramesSelector7 onClick={() => setSelectedFrame(7)} selectedFrame={selectedFrame} />
            <FramesSelector8 onClick={() => setSelectedFrame(8)} selectedFrame={selectedFrame} />
            <FramesSelector9 onClick={() => setSelectedFrame(9)} selectedFrame={selectedFrame} />
        </div>
    );
};

export default FramesSelector;
