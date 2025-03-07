import { useState, useEffect } from 'react';
import { City, Country, State } from 'country-state-city';

type CountryOption = { label: string; value: string };
type StateOption = { label: string; value: string };
type CityOption = { label: string; value: string };

interface UseCountryStateSelectorsProps {
    defaultCountry?: string;
    defaultState?: string;
    defaultCity?: string;
}

export const useCountryStateSelectors = ({
    defaultCountry,
    defaultState,
    defaultCity
}: UseCountryStateSelectorsProps) => {
    const countryData = Country.getAllCountries();

    const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
    const [stateOptions, setStateOptions] = useState<StateOption[]>([]);
    const [cityOptions, setCityOptions] = useState<CityOption[]>([]);

    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
    const [selectedState, setSelectedState] = useState<StateOption | null>(null);
    const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

    useEffect(() => {
        const formattedCountries = countryData.map((country) => ({
            label: country.name,
            value: country.isoCode
        }));
        setCountryOptions(formattedCountries);

        if (defaultCountry) {
            const defaultCountryObj = formattedCountries.find((c) => c.value === defaultCountry) || null;
            setSelectedCountry(defaultCountryObj);
        }
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const states = State.getStatesOfCountry(selectedCountry.value);
            const formattedStates = states.map((state) => ({
                label: state.name,
                value: state.isoCode
            }));
            setStateOptions(formattedStates);

            if (defaultState) {
                const defaultStateObj = formattedStates.find((s) => s.value === defaultState) || null;
                setSelectedState(defaultStateObj);
            } else {
                setSelectedState(null);
            }
        } else {
            setStateOptions([]);
            setSelectedState(null);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState && selectedCountry) {
            const cities = City.getCitiesOfState(selectedCountry.value, selectedState.value);
            const formattedCities = cities.map((city) => ({
                label: city.name,
                value: city.name
            }));
            setCityOptions(formattedCities);

            if (defaultCity) {
                const defaultCityObj = formattedCities.find((c) => c.value === defaultCity) || null;
                setSelectedCity(defaultCityObj);
            } else {
                setSelectedCity(null);
            }
        } else {
            setCityOptions([]);
            setSelectedCity(null);
        }
    }, [selectedState, selectedCountry]);

    const handleCountryChange = (value: string) => {
        const selectedOption = countryOptions.find((option) => option.value === value) || null;
        setSelectedCountry(selectedOption);
        setSelectedState(null);
        setSelectedCity(null);
    };

    const handleStateChange = (value: string) => {
        const selectedOption = stateOptions.find((option) => option.value === value) || null;
        setSelectedState(selectedOption);
        setSelectedCity(null);
    };

    return {
        countryOptions,
        stateOptions,
        cityOptions,
        selectedCountry,
        selectedState,
        selectedCity,
        setSelectedCountry,
        setSelectedState,
        setSelectedCity,
        handleCountryChange,
        handleStateChange
    };
};
