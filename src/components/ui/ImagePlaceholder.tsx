interface ImagePlaceholderProps {
  text: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function ImagePlaceholder({ 
  text, 
  className = "", 
  width = 400, 
  height = 300 
}: ImagePlaceholderProps) {
  return (
    <div 
      className={`bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 font-medium ${className}`}
      style={{ width: width === 400 ? '100%' : width, height: height === 300 ? '100%' : height }}
    >
      <span className="text-center px-4">{text}</span>
    </div>
  );
}