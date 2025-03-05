import { SocialAccount, SocialPlatform } from '@shtcut/types/report';
import SocialAccountItem from '../social-account-item';
import getPlatformIcon from '../get-platform-icon';
import { Separator } from '@shtcut-ui/react';
import Image from 'next/image';
import SocialPlatformIcons from '../social-media-icons';

const SocialMediaSidebar = ({
    selectedAccounts,
    toggleAccount
}: {
    selectedAccounts: string[];
    toggleAccount: (id: string) => void;
}) => {
    const socialAccounts: SocialAccount[] = [
        { id: 'wellness-crest', name: 'Wellness Crest', platform: 'instagram', avatar: '/images/user4.png' },
        { id: 'marah-james', name: 'Marah James', platform: 'facebook', avatar: '/images/user4.png' },
        { id: 'anthonia-daniel', name: 'Anthonia Daniel', platform: 'linkedin', avatar: '/images/user4.png' },
        { id: 'joshua-iya', name: 'Joshua Iya', platform: 'facebook', avatar: '/images/user4.png' }
    ];

    return (
        <div className="space-y-4">
            <h3 className=" font-medium mb-4">Social Media</h3>
            <div className="space-y-3">
                {socialAccounts.map((account) => (
                    <SocialAccountItem
                        key={account.id}
                        account={account}
                        isSelected={selectedAccounts.includes(account.id)}
                        onToggle={toggleAccount}
                    />
                ))}
            </div>
            <Separator />
            <div className="mt-6">
                <h4 className="text-sm font-medium mb-1">Connect More profile</h4>
                <p className="text-xs text-gray-500 mb-4">
                    Connect your profiles to start managing and organizing your accounts with ease
                </p>
                <SocialPlatformIcons />
            </div>
        </div>
    );
};

export default SocialMediaSidebar;
