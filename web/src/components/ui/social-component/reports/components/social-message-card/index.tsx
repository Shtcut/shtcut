import { Card, Button, Input } from '@shtcut-ui/react';
import { SocialMessage } from '@shtcut/types/report';
import ActionButton from '../action-btn';
import getPlatformIcon from '../get-platform-icon';
import Image from 'next/image';
import { Check, Copy, Tag } from 'lucide-react';
import Modal from '@shtcut/components/modal';
import { useState } from 'react';
import { platforms } from '@shtcut/_shared/data';
import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';

const SocialMessageCard = ({ message }: { message: SocialMessage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { handleCopy } = useCopyToClipboard();

    const platformIcon = getPlatformIcon(message.user.platform);
    console.log('platformIcon', platformIcon);
    const getMessageHeader = () => {
        switch (message.type) {
            case 'comment':
                return (
                    <>
                        <span className="font-medium">
                            Comment on <span className="text-primary-0"> {message.targetName} </span> post
                        </span>
                    </>
                );
            case 'message':
                return (
                    <>
                        <span className="font-medium">
                            Message to <span className="text-primary-0"> {message.targetName} </span>
                        </span>
                    </>
                );
            case 'mention':
                return (
                    <>
                        <span className="font-medium">
                            Mention <span className="text-primary-0"> {message.targetName} </span>on their post
                        </span>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="p-2 sm:p-4">
            <div className="relative">
                <div className="float-left ">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                        <Image
                            width={0}
                            height={0}
                            unoptimized
                            priority
                            src={message.user.avatar}
                            alt={message.user.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="ml-12">
                    <section className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs sm:text-[13px] text-[#898384]">
                            {getMessageHeader()}
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="text-[#6E6E6E]" size={16} />
                            <div className="bg-[#E5E5E5] w-5 h-5 rounded-full flex items-center justify-center">
                                <Check size={10} className="text-[#949FAD]" />
                            </div>
                        </div>
                    </section>
                    <div className="flex-1 min-w-0">
                        <section className="flex items-center justify-between">
                            <div className="mt-2">
                                <h4 className="text-sm mb-0.5  sm:text-base font-semibold truncate">
                                    {message.user.name}
                                </h4>

                                <p className="text-[13px] font-medium text-[#898384]">{message.content}</p>
                            </div>
                            <p className="text-[13px] text-[#9F9C9C] font-medium">{message.timestamp}</p>
                        </section>
                        <div className="flex flex-wrap mt-2 sm:mt-3 gap-1 sm:gap-4">
                            {message.actions.map((action, index) => (
                                <ActionButton key={index} action={action} onClickShare={() => setIsOpen(true)} />
                            ))}

                            {/* {message.stats?.likes && (
                                <span className="text-xs sm:text-sm text-gray-600 self-center">
                                    {(message.stats.likes / 1000).toFixed(1)}k
                                </span>
                            )} */}

                            <div className="ml-auto">
                                <Button variant="unstyled" size="sm" className="text-xs sm:text-[13px]">
                                    {message.viewAction.label}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Share" className="max-w-md" border>
                <section className="p-3 ">
                    <div className="flex overflow-x-auto flex-1 gap-4">
                        {platforms.map((platform) => {
                            const { icon, title } = getPlatformIcon(platform);
                            return (
                                <section className="flex flex-col items-center gap-1">
                                    <div
                                        key={platform}
                                        className={`w-12 h-12 rounded-md border flex items-center justify-center cursor-pointer`}
                                    >
                                        <Image
                                            width={28}
                                            height={28}
                                            priority
                                            unoptimized
                                            className="rounded-none"
                                            src={icon}
                                            alt={''}
                                        />
                                    </div>
                                    <p className="text-xs text-center">{title}</p>
                                </section>
                            );
                        })}{' '}
                    </div>
                    <section className="mt-3 relative">
                        <Input placeholder="https://example.com/article/social-share-modal" disabled />
                        <Copy
                            className="absolute top-2 right-2 cursor-pointer"
                            size={18}
                            onClick={() => handleCopy('https://example.com/article/social-share-modal')}
                        />
                    </section>
                </section>
            </Modal>
        </Card>
    );
};

export default SocialMessageCard;
