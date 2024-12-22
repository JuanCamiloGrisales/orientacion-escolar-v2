import { LucideIcon } from "lucide-react";
import parse from "html-react-parser";

interface InfoSectionProps {
  title: string;
  value: string | React.ReactNode;
  subtitle?: string;
  icon?: LucideIcon;
  isHtml?: boolean;
}

export function InfoSection({
  title,
  value,
  subtitle,
  icon: Icon,
  isHtml = false,
}: InfoSectionProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 text-sm font-medium text-gray-900">
            {isHtml && typeof value === "string" ? parse(value) : value}
          </div>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
