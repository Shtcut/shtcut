import React from 'react';
import { Link, Mail } from 'lucide-react';
import { Separator, Switch } from '@shtcut-ui/react';
import { Globe } from 'lucide-react';

const NotificationScreen = () => {
    const ReusableCard = ({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) => {
        return (
            <section className="flex   justify-between items-center">
                <div className="flex items-center gap-4">
                    {icon}
                    <div className=''>
                        <h2 className="text-sm font-semibold">{title}</h2>
                        <p className="text-xs text-[#726C6C]">{text}</p>
                    </div>
                </div>
                <div>
                    <Switch />
                </div>
            </section>
        );
    };
    return (
        <section>
            <section className="h-10 mt-8 flex items-center px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                <h3 className="font-semibold text-sm">Notifications</h3>
            </section>
            <div className="bg-white mt-4 rounded border px-6  border-[#e3e3e3] py-6">
                <div className="flex flex-col gap-4">
                    <ReusableCard
                        text="Important updates and alerts via email"
                        title="Receive Email Notification"
                        icon={<Mail size={16} />}
                    />
                    <Separator />
                    <ReusableCard
                        text="Updates to your custom domain configuration"
                        title="Domain configuration Updates"
                        icon={<Globe size={16} />}
                    />
                    <Separator />
                    <ReusableCard
                        text="Monthly summary email of your top 5 links by usage & total links created "
                        title="Monthly links usage summary"
                        icon={<Link size={16} />}
                    />
                </div>
            </div>
        </section>
    );
};

export default NotificationScreen;
