import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const Confetti = () => {
  return (
    <Fireworks
      autorun={{ speed: 0.5 }}
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    />
  );
};

export default Confetti


