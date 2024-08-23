import { Button, Switch } from '@shtcut-ui/react';
import CountriesInput from '@shtcut/components/form/countries-form';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trash2 } from 'lucide-react';

const GeoTargeting = ({
    inputsGeo,
    setInputsGeo
}: {
    inputsGeo: string[];
    setInputsGeo: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    };

    const addInput = () => {
        if (inputsGeo.length < 10) {
            setInputsGeo([...inputsGeo, '']);
        }
    };
    const removeInput = (indexToRemove: number) => {
        setInputsGeo(inputsGeo.filter((_, index) => index !== indexToRemove));
    };
    // const removeInput = () => {
    //     setInputs(inputs.slice(0, -1));
    // };
    const shouldApplyMaxHeight = inputsGeo.length > 4;

    const form = useForm({
        defaultValues: {
            location: ''
        }
    });
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-full lg:w-5/6">
                    <h2 className="text-sm font-medium">Geo Targeting</h2>
                    <p className="text-xs mt-1 text-[#4d4d4d]">Target specific countries or regions</p>
                </div>
                <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
            </div>
            {isSwitchOn && (
                <div className="mt-3 flex flex-col gap-2">
                    {inputsGeo.map((value, index) => (
                        <section key={value}>
                            <section className="flex items-center gap-2">
                                <CountriesInput noRadius value={''} classNames="rounded-md" onChange={() => {}} />
                                <Trash2 className="cursor-pointer" size={18} onClick={() => removeInput(index)} />
                            </section>
                            {index === inputsGeo.length - 1 && inputsGeo.length < 10 && (
                                <Button
                                    onClick={addInput}
                                    type="button"
                                    className="w-full mt-4 text-xs rounded bg-primary-0 h-8"
                                >
                                    Add more
                                </Button>
                            )}
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GeoTargeting;
