import { Input } from '@shtcut-ui/react';
import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = () => {
    return (
        <div className="relative">
            <Input
                className="border-[#CCCBCB] pl-10 w-48 text-xs text-[#433E3F] font-medium border bg-white "
                placeholder="Search "
            />
            <div className="absolute top-2 left-[15px]">
                <Search size={18} />
            </div>
        </div>
    );
};

export default SearchInput;
