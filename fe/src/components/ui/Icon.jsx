import * as Icons from 'lucide-react';

const Icon = ({ name, color, size }) => {
  const LucideIcon = Icons[name];

  if (!LucideIcon) {
    console.error(`Icon ${name} not found in lucide-react`);
    return null;
  }

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
