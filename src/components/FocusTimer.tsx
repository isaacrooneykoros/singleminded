import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FocusTimerProps {
  duration: number;
  onComplete: () => void;
}

export const FocusTimer = ({ duration, onComplete }: FocusTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast({
        title: "Focus session complete!",
        description: "Great job staying focused. Take a short break.",
      });
      onComplete();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onComplete, toast]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="p-8 flex flex-col items-center space-y-6 bg-secondary">
      <div className="text-6xl font-mono font-bold">{formatTime(timeLeft)}</div>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTimer}
          className="w-12 h-12 rounded-full"
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onComplete}
          className="w-12 h-12 rounded-full"
        >
          <Check className="w-6 h-6" />
        </Button>
      </div>
    </Card>
  );
};