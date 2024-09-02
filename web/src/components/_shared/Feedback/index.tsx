import { Button, Label, Popover, PopoverContent, PopoverTrigger, Textarea } from '@shtcut-ui/react';
import { XIcon } from 'lucide-react';

export const Feedback = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                    Feedback
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px]">
                <div className="flex flex-col gap-2 p-6">
                    <Button className="self-end rounded-full" size="icon" variant="ghost">
                        <XIcon className="w-4 h-4" />
                    </Button>
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold leading-none">How can we improve?</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            We`d love to hear your thoughts on how we can make our platform better.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="feedback">Feedback</Label>
                            <Textarea
                                className="min-h-[100px]"
                                id="feedback"
                                placeholder="Enter your feedback"
                                required
                            />
                        </div>
                    </div>
                    <Button size="sm">Submit feedback</Button>
                </div>
            </PopoverContent>
            <div />
        </Popover>
    );
};
