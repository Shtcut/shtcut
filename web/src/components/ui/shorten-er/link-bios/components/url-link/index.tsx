import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';
import React from 'react';

const UrlLink = ({ uniqueName, url }: { uniqueName: string; url: string }) => {
    const { handleCopy } = useCopyToClipboard();
    return (
        <div>
            <p className="text-sm mt-3">
                Add this link to your <span className="underline">Twitter</span>,{' '}
                <span className="underline">Instagram</span> or <span className="underline">LinkedIn</span> bio to make
                it accessible from anywhere.
            </p>
            <section className="mt-4 border px-3 flex items-center rounded-lg h-14 justify-between">
                <p className="text-sm">{url}</p>
                <section
                    onClick={() => handleCopy(url)}
                    className="bg-black cursor-pointer w-16 flex items-center justify-center rounded-full h-9"
                >
                    <p className="text-xs font-medium text-white">Copy</p>
                </section>
            </section>
        </div>
    );
};

export default UrlLink;
