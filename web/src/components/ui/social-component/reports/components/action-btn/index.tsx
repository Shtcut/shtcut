import { Button } from '@shtcut-ui/react';
import { SocialMessage } from '@shtcut/types/report';
import { MessageSquare, Share, RefreshCw, Repeat } from 'lucide-react';
import { PiShareFatLight } from 'react-icons/pi';
import { BsHandThumbsUp } from 'react-icons/bs';
import { BiMessageRounded } from 'react-icons/bi';

const ActionButton = ({ action, onClickShare }: { action: SocialMessage['actions'][0]; onClickShare: () => void }) => {
    const getIcon = () => {
        switch (action.type) {
            case 'like':
                return <BsHandThumbsUp size={16} style={{ transform: 'scaleX(-1)' }} />;
            case 'comment':
                return <BiMessageRounded size={16} />;
            case 'share':
                return <PiShareFatLight size={16} />;
            case 'send':
                return <Share size={16} />;
            case 'reply':
                return <BiMessageRounded size={16} />;
            case 'react':
                return <BsHandThumbsUp size={16} style={{ transform: 'scaleX(-1)' }} />;
            case 'repost':
                return <RefreshCw size={16} />;
            case 'retweet':
                return <Repeat size={16} />;
            default:
                return <MessageSquare size={16} />;
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 px-1.5 flex gap-1 m-0  gap-x-1 items-center  "
            onClick={() => {
                if (action.type === 'share') {
                    onClickShare();
                }
            }}
        >
            {getIcon()}
            <span className="">{action.label}</span>
        </Button>
    );
};

export default ActionButton;
