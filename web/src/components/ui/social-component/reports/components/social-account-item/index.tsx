import { Checkbox } from '@shtcut-ui/react';
import { SocialAccount } from '@shtcut/types/report';
import AvatarBadge from '@shtcut/components/avatar-badge';

const SocialAccountItem = ({
    account,
    isSelected,
    onToggle
}: {
    account: SocialAccount;
    isSelected: boolean;
    onToggle: (id: string) => void;
}) => {
    return (
        <div className="flex items-center gap-2">
            <Checkbox className="" id={account.id} checked={isSelected} onCheckedChange={() => onToggle(account.id)} />
            <div className="flex items-center gap-4">
                <AvatarBadge image={account.avatar} badge={account.avatar} size={35} />
                <label htmlFor={account.id} className="text-[13px] font-medium">
                    {account.name}
                </label>
            </div>
        </div>
    );
};

export default SocialAccountItem;
