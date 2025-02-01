import { Card } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  title: string;
  description?: string;
  estimatedTime: number;
  priority: "high" | "medium" | "low";
  onStartFocus: () => void;
}

const priorityColors = {
  high: "bg-destructive/10 border-destructive/20",
  medium: "bg-primary/10 border-primary/20",
  low: "bg-muted/10 border-muted/20",
};

export const TaskCard = ({ title, description, estimatedTime, priority, onStartFocus }: TaskCardProps) => {
  return (
    <Card className={`p-4 ${priorityColors[priority]} border animate-fade-in`}>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span>{estimatedTime} min</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onStartFocus}>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};