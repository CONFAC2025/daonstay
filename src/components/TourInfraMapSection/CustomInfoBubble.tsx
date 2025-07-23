// src/components/TourInfraMapSection/CustomInfoBubble.tsx

interface CustomInfoBubbleProps {
  image: string;
  name: string;
}

export const CustomInfoBubble = ({ image, name }: CustomInfoBubbleProps) => {
  return (
    <div className="bg-white p-1 rounded-lg shadow-lg border border-secondary-gray-300">
      <img 
        src={image} 
        alt={name} 
        className="w-24 h-16 object-cover rounded-md" 
      />
    </div>
  );
};