import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@shtcut-ui/react';
import { useRouter } from 'next/navigation';

const LinkBreadCrumb = ({ currentRoute }: { currentRoute: string }) => {
    const route = useRouter();
    function HandleBavigateBack() {
        route.back();
    }
    return (
        <div className="flex items-center gap-x-2 ">
            <Button variant={'unstyled'} className="text-[#898384] p-0  text-sm">
                Home
            </Button>{' '}
            <ChevronRight size={16} color="#898384" />
            <Button onClick={HandleBavigateBack} variant={'unstyled'} className="text-[#898384] p-0  text-sm">
                Links
            </Button>
            <ChevronRight size={16} color="#898384" />
            <Button variant={'unstyled'} className="text-primary-0 p-0 text-sm">
                {currentRoute}
            </Button>
        </div>
    );
};

export default LinkBreadCrumb;
