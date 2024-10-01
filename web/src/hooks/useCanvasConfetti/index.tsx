import confetti from 'canvas-confetti';
const useCanvasConfetti = () => {
    const handleClickCanvas = () => {
        const end = Date.now() + 3 * 1000;
        const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];
        const frame = () => {
            if (Date.now() > end) return;

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors
            });

            requestAnimationFrame(frame);
        };

        frame();
    };
    return {
        handleClickCanvas
    };
};

export default useCanvasConfetti;
