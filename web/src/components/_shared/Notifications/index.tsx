import { BellIcon, ExclamationTriangleIcon, GearIcon } from '@radix-ui/react-icons';

import Link from 'next/link';
import { Merge, Rocket, Split } from 'lucide-react';
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Separator,
    Tabs,
    TabsList,
    TabsTrigger
} from '@shtcut-ui/react';

export const Notifications = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="relative h-6 gap-1 rounded-full px-2 text-secondary-foreground"
                    size="sm"
                >
                    <BellIcon className="h-3 w-3" />
                    <span>12</span>

                    <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                    </span>
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" alignOffset={-16} className="w-80 p-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Notifications</span>
                    <Link className="text-muted-foreground hover:text-primary" href="/settings">
                        <GearIcon className="h-4 w-4" />
                    </Link>
                </div>

                <Tabs defaultValue="new" className="mt-2">
                    <TabsList className="space-x-1">
                        <TabsTrigger value="new">New (3)</TabsTrigger>
                        <TabsTrigger value="archived">Archived</TabsTrigger>
                    </TabsList>
                </Tabs>

                <Separator className="my-4" />

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full border border-primary/10 bg-primary/5 p-2">
                            <Split className="h-4 w-4 text-violet-400" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs leading-relaxed">
                                New event <strong>pluto.subscription-created</strong> was created under{' '}
                                <strong>pluto</strong> service by <strong>Diego Fernandes</strong>.
                            </p>
                            <time className="text-xs text-muted-foreground">15 minutes ago</time>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="rounded-full border border-primary/10 bg-primary/5 p-2">
                            <Merge className="h-4 w-4 text-sky-400" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs leading-relaxed">
                                New subscription on <strong>pluto.subscription-created</strong> was created under{' '}
                                <strong>skylab</strong> service by <strong>Gabriel Buzzi</strong>.
                            </p>
                            <time className="text-xs text-muted-foreground">4 hours ago</time>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="rounded-full border border-primary/10 bg-primary/5 p-2">
                            <Rocket className="h-4 w-4 text-amber-400" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs leading-relaxed">
                                New version <strong>v1.0.1</strong> released on{' '}
                                <strong>pluto.subscription-created</strong> event.
                            </p>
                            <time className="text-xs text-muted-foreground">6 hours ago</time>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full">
                        Archive all
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
