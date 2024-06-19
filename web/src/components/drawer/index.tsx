import * as React from 'react';

import { Button, Drawer, DrawerContent, DrawerTrigger } from '@shtcut-ui/react';

export function DrawerDemo() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent></DrawerContent>
        </Drawer>
    );
}
