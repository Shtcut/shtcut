/** @format */

import Image from 'next/image';

export default function loading() {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <Image src={'/logo.svg'} width={140} height={25} alt="loading" className="animate" />
        </div>
    );
}
