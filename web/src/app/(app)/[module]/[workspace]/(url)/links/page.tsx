'use client';

import { LayoutBody } from '@shtcut/components';
import { DndContext } from '@dnd-kit/core';
import { LinkContainer } from '@shtcut/containers';

const Links = () => {
    return (
        <DndContext>
            <LayoutBody className="">
                <LinkContainer />
            </LayoutBody>
        </DndContext>
    );
};

export default Links;
