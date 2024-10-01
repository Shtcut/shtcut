import { Button, Separator, Switch } from '@shtcut-ui/react';
import { Eye, Globe as GlobalIcon, Link as LinkIcon, Mail } from 'lucide-react';
import React, { ReactNode } from 'react';
import { PiShieldCheckLight } from 'react-icons/pi';

const SecurityScreen = () => {
    const ReusableSection = ({
        headerTitle,
        description,
        icon,
        switchShow = true
    }: {
        headerTitle: string;
        description: string;
        icon: ReactNode;
        switchShow?: boolean;
    }) => {
        return (
            <section className={`flex  py-4  items-center w-full justify-between`}>
                <div className="flex items-center gap-4">
                    <section className="bg-[#FAFAFA] cursor-pointer w-10 h-10 flex justify-center items-center rounded">
                        {icon}
                    </section>
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold">{headerTitle}</p>
                        <p className="text-[#726C6C] text-xs">{description}</p>
                    </div>
                </div>
                {switchShow && <Switch />}
            </section>
        );
    };

    const AuthReusableSection = ({
        headerTitle,
        description,
        icon,
        switchShow = true,
        rightSection
    }: {
        headerTitle: string;
        description: string;
        icon: ReactNode;
        switchShow?: boolean;
        rightSection?: ReactNode;
    }) => {
        return (
            <section className={`flex  py-4  items-center w-full justify-between`}>
                <div className="flex items-center gap-4">
                    <section className="bg-[#FAFAFA] cursor-pointer w-10 h-10 flex justify-center items-center rounded">
                        {icon}
                    </section>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">{headerTitle}</p>
                            <div className="bg-[#E3E3E3] py-1 w-fit rounded-full px-3">
                                <p className="text-white text-[10px] font-bold">Disabled</p>
                            </div>
                        </div>
                        <p className="text-[#726C6C] text-xs w-2/3">{description}</p>
                    </div>
                </div>
                {switchShow && <Switch />}
                {rightSection}
            </section>
        );
    };
    return (
        <div>
            <section className="h-10 flex items-center px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                <h3 className="font-semibold text-sm">Security</h3>
            </section>
            <div className="bg-background border border-[#e3e3e3] mt-6 rounded-md">
                <section className="p-4">
                    <ReusableSection
                        description="Hide or show details on your dashboard"
                        headerTitle="Hide Dashboard"
                        icon={<Eye size={20} />}
                    />
                    <Separator />
                    <ReusableSection
                        description="Update your existing password"
                        headerTitle="Change password"
                        icon={<GlobalIcon size={20} />}
                        switchShow={false}
                    />
                    <Separator />
                    <ReusableSection
                        description="Monthly summary email of your top 5 links by usage & total links created "
                        headerTitle="Monthly links usage summary"
                        icon={<LinkIcon size={20} />}
                    />
                </section>
            </div>
            <section className="bg-background border p-4 border-[#e3e3e3] mt-6 rounded-md">
                <p className="font-semibold">Two-factor authentication (2FA)</p>
                <p className="text-[#726C6C] text-xs w-[25rem] mt-2">
                    Two-factor authentication adds an additional layer of security to your account by requiring more
                    than just a password to sign in.
                </p>
                <section className="p-4">
                    <AuthReusableSection
                        headerTitle="Authenticator app"
                        description="Use an authentication app or browser extension to get get two-factor authentication codes when promted."
                        icon={<PiShieldCheckLight size={20} />}
                        rightSection={<Button className="bg-primary-0 text-xs font-medium">Enable</Button>}
                        switchShow={false}
                    />
                    <Separator />
                    <AuthReusableSection
                        headerTitle="Email Message"
                        description="Get one-time codes sent to your email address to complete authentication requests."
                        icon={<Mail size={20} />}
                        rightSection={<Button className="bg-primary-0 text-xs font-medium">Enable</Button>}
                        switchShow={false}
                    />
                </section>
            </section>
        </div>
    );
};

export default SecurityScreen;
