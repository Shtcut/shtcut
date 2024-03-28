import { Input, Label, cn } from '@shtcut-ui/react';
import { ReactNode } from 'react';

type LinkFormCheckboxProps = {
    id: string;
    isChecked: boolean | undefined;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    label: string;
    name: string;
    description: string | ReactNode;
    disabled?: boolean;
};

export const LinkCheckBox = (props: LinkFormCheckboxProps): JSX.Element => {
    const { id, name, label, description, disabled = false, isChecked, setIsChecked } = props;

    return (
        <div className="relative flex items-start">
            <div className="flex h-6 items-center">
                <Input
                    id={id}
                    name={name}
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    type="checkbox"
                    disabled={disabled}
                    className={cn(
                        'h-4 w-4 rounded border-shade-line text-stratos-default focus:ring-white',
                        disabled ? 'cursor-not-allowed bg-shade-line/50' : 'cursor-pointer'
                    )}
                    data-tooltip-id={id}
                    data-tooltip-content={'Coming very soon'}
                />
            </div>
            <div className="ml-3 text-sm leading-6">
                <Label
                    htmlFor={id}
                    className={cn(
                        'font-medium',
                        isChecked ? '' : 'text-shade-pencil-light',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                    )}
                >
                    {label}
                </Label>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </div>
    );
};
