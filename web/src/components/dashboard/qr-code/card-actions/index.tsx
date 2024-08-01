import { Download, ScanLine } from 'lucide-react';
import React from 'react'
import FeatureActions from './features-action';

const CardsActions = () => {
  return (
      <div>
          <div className="flex items-center gap-x-3">
              <div className="flex  border border-[#15B097] w-[110px] text-[#15B097] rounded-md cursor-pointer justify-center p-[6px] items-center text-sm gap-x-2">
                  <ScanLine size={16} /> Scans 30
              </div>
              <div className="bg-primary-0 border flex w-[110px] rounded-md text-white items-center p-[6px] gap-x-2  text-sm ">
                  <Download size={16} /> Download
              </div>
              <FeatureActions />
          </div>
      </div>
  );
}

export default CardsActions
