import { Button } from '@shtcut-ui/react';
import React from 'react';
import LinkListedComponent from '../link-listed-component';
import SearchFilterActions from '../search-filter-actions';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const LinkComponent = () => {
    const pathName = usePathname();
    const route = useRouter();

    const handleNavigateEdit = () => {
        route.push(`${pathName}/1234`);
    };
    return (
        <section className=" ">
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-2xl">Link Shortener</h1>
                <Link href={`${pathName}/create`}>
                    <Button className="bg-primary-0 text-xs h-8 rounded ">
                        Create Link
                    </Button>
                </Link>
            </div>
            <SearchFilterActions />
            <div className="flex flex-col gap-y-[14px] mt-8">
                {[1, 2, 3, 4, 5].map((data, index) => (
                    <div key={index}>
                        <LinkListedComponent data={data} onClickNavigate={handleNavigateEdit} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LinkComponent;
