import useTypingEffect from "../../hooks/useTypingEffect.tsx";

const CallButton = () => {
  const phoneNumber = "1811-1854";
  const animatedPhoneNumber = useTypingEffect(phoneNumber, 50);

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-4 right-4 z-50 bg-v4-blue text-white rounded-full px-6 py-3 shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center text-lg font-bold space-x-2"
    >
      <span className="material-symbols-outlined text-3xl">call</span>
      <span className="text-xl">{animatedPhoneNumber}</span>
    </a>
  );
};

export default CallButton;
