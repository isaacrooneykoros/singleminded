import { Card } from "@/components/ui/card";
import { Clock, CheckCircle, Flame } from "lucide-react";

interface StatsProps {
  focusTime: number;
  tasksCompleted: number;
  streak: number;
}

export const Stats = ({ focusTime, tasksCompleted, streak }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 flex items-center space-x-4">
        <Clock className="w-8 h-8 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Focus Time</p>
          <p className="text-2xl font-bold">{focusTime}m</p>
        </div>
      </Card>
      <Card className="p-4 flex items-center space-x-4">
        <CheckCircle className="w-8 h-8 text-success" />
        <div>
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold">{tasksCompleted}</p>
        </div>
      </Card>
      <Card className="p-4 flex items-center space-x-4">
        <Flame className="w-8 h-8 text-destructive" />
        <div>
          <p className="text-sm text-muted-foreground">Streak</p>
          <p className="text-2xl font-bold">{streak} days</p>
        </div>
      </Card>
    </div>
  );
};