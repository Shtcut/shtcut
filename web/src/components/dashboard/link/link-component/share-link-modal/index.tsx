import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    RedditShareButton,
    TelegramShareButton
} from 'next-share';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import Image from 'next/image';
import { Input } from '@shtcut-ui/react';
import { PiCopySimple } from 'react-icons/pi';
import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';

interface SocialShareProps {
    data: LinkNameSpace.Link;
}

const ShareLinkModal = ({ data }: SocialShareProps) => {
    const url = `shtcut.co/${data?.alias}`;
    const textToCopy = `${process.env.NEXT_PUBLIC_URL}/${data?.alias}`;
    const { handleCopy } = useCopyToClipboard();

    const handleClickThreads = () => {
        window.open(`https://threads.net/intent/post?source=${url}&url=${url}`, '_blank', 'noopener,noreferrer');
    };
    return (
        <section className="px-4">
            <section className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Share this link</h2>
            </section>
            <section className="flex items-center mt-6 overflow-x-auto">
                <div>
                    <WhatsappShareButton url={url} title={''}>
                        <div className="flex flex-col gap-y-1 items-center">
                            <div className="border flex items-center justify-center w-12 h-12 rounded-md">
                                <Image src={'/social/whatsapp.png'} width={32} height={32} alt="whatsapp" />
                            </div>
                            <p className="text-xs">WhatsApp</p>
                        </div>
                    </WhatsappShareButton>
                </div>
                <FacebookShareButton url={url} quote={''}>
                    <div className="flex flex-col gap-y-1 items-center ml-3">
                        <div className="border flex items-center justify-center w-12 h-12 rounded-md">
                            <Image src={'/social/outline-fb.png'} width={32} height={32} alt="facebook" />
                        </div>
                        <p className="text-xs">Facebook</p>
                    </div>
                </FacebookShareButton>
                <LinkedinShareButton url={url} title={''} summary={''}>
                    <div className="flex ml-4 flex-col gap-y-1 items-center">
                        <div className="border flex items-center justify-center w-12 h-12 rounded-md">
                            <Image src={'/social/linkedin.png'} width={32} height={32} alt="linkedin" />
                        </div>
                        <p className="text-xs">Linkedin</p>
                    </div>
                </LinkedinShareButton>
                <TwitterShareButton url={url} title={''}>
                    <div className="flex ml-5 flex-col gap-y-1 items-center">
                        <div className="border flex items-center justify-center w-12 h-12 rounded-md">
                            <Image src={'/social/twitter.png'} width={32} height={32} alt="twitter" />
                        </div>
                        <p className="text-xs">Twitter</p>
                    </div>
                </TwitterShareButton>

                <div onClick={handleClickThreads}>
                    <div className="flex ml-5 flex-col cursor-pointer gap-y-1 items-center">
                        <div className="border flex items-center justify-center w-12 h-12 rounded-md">
                            <Image src={'/social/threads.png'} width={32} height={32} alt="threads" />
                        </div>
                        <p className="text-xs">Threads</p>
                    </div>
                </div>
                <RedditShareButton url={url} title="">
                    <div className="flex flex-col  gap-y-1 items-center ml-5">
                        <div className="border flex items-center justify-center w-12 h-12 rounded-md">
                            <Image src="/social/reddit.jpeg" width={32} height={32} alt="reddit" />
                        </div>
                        <p className="text-xs">Reddit</p>
                    </div>
                </RedditShareButton>
                <TelegramShareButton url={url} title="Telegram">
                    <div className="flex flex-col ml-5 gap-y-1 items-center">
                        <div className="border flex items-center justify-center w-12 h-12 rounded-md">
                            <Image src="/social/telegram.webp" width={32} height={32} alt="telegram" />
                        </div>
                        <p className="text-xs">Telegram</p>
                    </div>
                </TelegramShareButton>
            </section>
            <section className="mt-5 relative">
                <Input value={url} disabled />
                <div className="absolute cursor-pointer top-2.5 right-4">
                    {' '}
                    <PiCopySimple color="#726C6C" size={16} onClick={() => handleCopy(textToCopy)} />
                </div>
            </section>
        </section>
    );
};

export default ShareLinkModal;
