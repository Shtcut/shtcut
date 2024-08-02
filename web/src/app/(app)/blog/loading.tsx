/** @format */

import { Logo } from '@shtcut/components';
import React from 'react';

const loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Logo />
            <h1>loading...</h1>
        </div>
    );
};

export default loading;
