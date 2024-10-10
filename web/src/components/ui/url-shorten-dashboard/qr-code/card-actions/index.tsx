import { Download, ScanLine } from 'lucide-react';
import React from 'react'
import FeatureActions from './features-action';

const CardsActions = () => {
  return (
      <div>
          <div className="flex items-center gap-x-3">
              <div className="flex  border border-[#15B097] w-[110px] font-medium text-[#15B097] cursor-pointer justify-center text-xs h-8 rounded  p-[6px] items-center  gap-x-2">
                  <ScanLine size={16} /> Scans 30
              </div>
              <div className="bg-primary-0 border flex w-[110px] rounded h-8 text-white items-center p-[6px] gap-x-2 font-medium text-xs ">
                  <Download size={16} /> Download
              </div>
              <FeatureActions />
          </div>
      </div>
  );
}

export default CardsActions
