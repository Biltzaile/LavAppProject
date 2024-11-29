import { LucideIcon } from "lucide-react";
import { Card } from "../ui";

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  onClick: () => void;
}

export const DashboardCard = ({ icon: Icon, title, onClick }: DashboardCardProps) => {
  return (
    <Card
      className="px-16 py-8 flex items-center gap-4 hover:shadow-lg hover:shadow-primary/60 hover:bg-primary/80 hover:text-primary-foreground hover:border-primary cursor-pointer transition group"
      onClick={onClick}
    >
      <Icon className="w-12 h-12 transition-transform group-hover:scale-110" />
      <h2 className="text-xl font-semibold text-center select-none">{title}</h2>
    </Card>
  );
};