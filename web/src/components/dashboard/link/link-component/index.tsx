import { Button, Modal, Separator } from '@shtcut-ui/react';
import React, { useState } from 'react';
import LinkListedComponent from '../link-listed-component';
import SearchFilterActions from '../search-filter-actions';
import { usePathname, useRouter } from 'next/navigation';

const LinkComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const pathName = usePathname();
    const route = useRouter();

    const handleNavigateEdit = () => {
        route.push(`${pathName}/1234`);
    };
    return (
        <section className=" ">
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Link Shortener</h1>

                <Button className="bg-primary-0 text-xs h-8 rounded " onClick={() => setShowModal(true)}>
                    Create Link
                </Button>
            </div>
            <SearchFilterActions />
            <div className="flex flex-col gap-y-[14px] mt-8">
                {[1, 2, 3, 4, 5].map((data, index) => (
                    <div key={index}>
                        <LinkListedComponent data={data} onClickNavigate={handleNavigateEdit} />
                    </div>
                ))}
            </div>
            <Modal
                showModel={showModal}
                className="h-[80%] max-w-screen-lg"
                setShowModal={setShowModal}
                onClose={() => setShowModal(false)}
            >
                <div className="flex">
                    <div className=" h-screen w-full ">hey</div>
                    <Separator orientation="vertical" className=' h-screen'/>
                    <div className=" h-screen w-4/5">hey</div>
                </div>
            </Modal>
        </section>
    );
};

export default LinkComponent;
