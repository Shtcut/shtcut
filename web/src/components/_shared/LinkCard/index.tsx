import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, toast } from '@shtcut-ui/react';
import { getApexDomain, timeAgo } from '@shtcut/_shared';
import { GripVertical } from 'lucide-react';
import Image from 'next/image';
import { GOOGLE_FAVICON_URL } from '@shtcut/_shared/constant';
import Link from 'next/link';
import { Copy, BarChart } from 'lucide-react';
import { useState } from 'react';
import { IconTag } from '@tabler/icons-react';

interface LinkCardProp {
    id: string;
    url: string;
    target: string;
    title: string;
    createdAt: string;
    archived?: boolean;
    clicks?: number;
    tags?: {
        title: string;
        color?: string;
    }[];
}
export const LinkCard = (props: LinkCardProp) => {
    const { id, url, archived = false, title, tags = [], target, clicks = 0, createdAt } = props;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const [copiedClipboard, setCopiedClipboard] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const apexDomain = getApexDomain(url);

    const handleCopyLink = () => {
        setCopiedClipboard(copiedClipboard);
        navigator.clipboard.writeText(url);
        toast({
            description: 'Copied URL to clipboard!'
        });
    };

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                className=" flex bg-white items-center p-2 rounded-lg drop-shadow-md my-5"
            >
                <div
                    className="text-gray-400 text-sm hover:bg-blue-100 rounded-sm p-[3px]"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical color="grey" size={17} />
                </div>
                <Image
                    src={`${GOOGLE_FAVICON_URL}${apexDomain}`}
                    alt={apexDomain}
                    className="h-8 w-8 blur-0 rounded-full sm:h-10 sm:w-10"
                    unoptimized
                    width={20}
                    height={20}
                    priority
                />
                <div className="flex-1 p-2 h-full relative">
                    <div className="flex">
                        <div className="w-ful pr-3">
                            <div className="grid mb-1 w-ful grid-cols-[minmax(0,90%)] items-baseline">
                                <div className="w-full row-start-1 col-start-1 items-start">
                                    <div className="flex items-center max-w-full rounded-[2px] outline-offset-2 outline-2 gap-2 lg:gap-4">
                                        <p className="truncate w-fit max-w-[80px] text-gray-500 text-sm whitespace-nowrap overflow-hidden font-semibold lg:w-fot lg:max-w-[150px]">
                                            {title}
                                        </p>
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    onClick={handleCopyLink}
                                                    href="#"
                                                    className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale:105 hover:bg-blue-100 active:scale-95"
                                                >
                                                    <Copy size={15} color="grey" />
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="flex items-center space-x-1 rounded-md bg-gray-100 px-2 py-0.5 transition-all duration-75 hover:Scale-105 hover:bg-blue-100 active:scale-100"
                                                >
                                                    <BarChart color="grey" size={15} />
                                                    <p className="whitespace-nowrap text-sm text-gray-500">{clicks}</p>
                                                </Link>
                                                {tags &&
                                                    tags.length > 0 &&
                                                    tags.map(({ title, color }, idx) => (
                                                        <div
                                                            key={`${title}-${idx}`}
                                                            className={`flex items-center space-x-1 rounded-md bg-${color}-200 px-2 py-0.5 transition-all duration-75 hover:Scale-105 hover:bg-blue-100 active:scale-100`}
                                                        >
                                                            <p className="h-[20px] whitespace-nowrap text-sm text-500">
                                                                <div className="flex justify-between">
                                                                    <IconTag size={15} className="mt-1 mr-2" />
                                                                    {title}
                                                                </div>
                                                            </p>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="row-start-1 col-start-1 inline-flex">
                                        <a
                                            target="_blank"
                                            href={url}
                                            className="flex items-center max-w-full rounded-[2px] outline-offset-2 outline-2"
                                        >
                                            {url}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="flex justify-center items-center">
                        <div className="flex items-center">
                            <small className="mr-8 hidden whitespace-nowrap text-sm text-gray-500 sm:block">
                                Added {timeAgo(createdAt)}
                            </small>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};
