import { Card, Checkbox, useToast } from '@shtcut-ui/react';
import Image from 'next/image';
import React from 'react';
import { Clock3, Lock, Tag } from 'lucide-react';
import CardsActions from '../../../card-actions';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { getApexDomain, truncate } from '@shtcut/_shared/helpers';
import { formatDate } from '@shtcut/_shared';
import { CiImageOff } from 'react-icons/ci';
import { GOOGLE_FAVICON_URL, hexToRgba } from '@shtcut/_shared/constant';
import { TagResponse } from '@shtcut/types/tags';
import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';

interface LinkListedComponentProps {
    edit?: boolean;
    data?: LinkNameSpace.Link;
    onClickNavigate?: () => void;
    onDeleteClick?: () => void;
    onDuplicateClick?: () => void;
    onQrCodeClick?: () => void;
    onClickAchive?: () => void;
    onClickShare?: () => void;
    handleUpdateLink?: () => void;
    onChange?: () => void;
    checked?: boolean;
}

const LinkListedComponent = ({
    edit,
    data,
    onClickNavigate,
    onDeleteClick,
    onDuplicateClick,
    onQrCodeClick,
    handleUpdateLink,
    onClickAchive,
    onClickShare,
    onChange,
    checked
}: LinkListedComponentProps) => {
    const apexDomain = getApexDomain(data?.target ?? '');
    const { handleCopy } = useCopyToClipboard();

    if (!data) {
        return null;
    }

    return (
        <Card className="cursor-pointer border border-gray-200 shadow-sm rounded-[10px] p-4">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3">
                    {!edit && (
                        <div className="relative top-1">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={onChange}
                                id="terms"
                                className="p-0 m-0 border shadow-none border-[#D2D5DA] cbox cursor-pointer"
                            />
                        </div>
                    )}
                    <div className="border w-[50px] h-[50px] rounded-full flex justify-center items-center">
                        {apexDomain ? (
                            <Image
                                src={`${GOOGLE_FAVICON_URL}${apexDomain}`}
                                width={18}
                                height={18}
                                alt={apexDomain}
                                unoptimized
                                priority
                            />
                        ) : (
                            <CiImageOff size={24} />
                        )}
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <section className="flex items-center gap-x-2">
                                <h1 className="font-semibold text-sm text-[#151314]">{data.title}</h1>
                                {data.isPrivate && <Lock size={14} />}
                            </section>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${process.env.NEXT_PUBLIC_URL}/${data.alias}`}
                                className="text-xs text-primary-0 font-normal"
                            >
                                {data.domain?.name || data.domain?.slug}/{data.alias}
                            </a>

                            <a href={data.target} target="_blank" className="text-[#2B2829] text-xs">
                                {truncate(data.target ?? '', 100)}
                            </a>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2">
                            <Clock3 size={16} />
                            <span className="text-[#726C6C] text-xs font-medium">
                                {data.createdAt && formatDate(data.createdAt)}
                            </span>
                            <section className="flex items-center gap-2">
                                {data.tags.map((tg: TagResponse) => {
                                    const isValidHex = /^#?[0-9A-Fa-f]{6}$/.test(tg.color);
                                    const color = isValidHex ? tg.color : '#000000'; // Default to black if invalid

                                    return (
                                        <div
                                            key={tg._id} // Add a unique key for each tag
                                            className="flex items-center space-x-1 w-fit px-2 h-6 rounded justify-center border"
                                            style={{
                                                border: `1px solid ${color}`,
                                                backgroundColor: hexToRgba(color, 0.1)
                                            }}
                                        >
                                            <Tag size={14} color={color} />
                                            <span style={{ color }} className="text-xs">
                                                {tg.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </section>
                        </div>
                    </div>
                </div>
                <div>
                    <CardsActions
                        numberOfClicks={data.clicks ?? 0}
                        edit={edit}
                        handleCopy={() => handleCopy(`https://beta.shtcut.co/${data.alias}`)}
                        onDeleteClick={onDeleteClick}
                        onDuplicateClick={onDuplicateClick}
                        onQrCodeClick={onQrCodeClick}
                        onClickShare={onClickShare}
                        onClickAchive={onClickAchive}
                        handleUpdateLink={handleUpdateLink}
                        onClickNavigation={() => {
                            if (!edit && onClickNavigate) {
                                onClickNavigate();
                            }
                        }}
                    />
                </div>
            </div>
        </Card>
    );
};

export default LinkListedComponent;
