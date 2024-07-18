import useWindowSize from '@shtcut/components/_shared/Responsiveness';

const useResponsiveScreen = () => {
    const { width } = useWindowSize();
    const mobileTab = width !== undefined && width <= 992;
    const mobileDesktop = width !== undefined && width <= 1355;
    const smallScreen = width !== undefined && width <= 553;
    return {
        mobileTab,
        mobileDesktop,
        smallScreen
    };
};
export default useResponsiveScreen;
