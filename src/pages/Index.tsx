import { useState } from "react";
import { TaskCard } from "@/components/TaskCard";
import { FocusTimer } from "@/components/FocusTimer";
import { Stats } from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description?: string;
  estimatedTime: number;
  priority: "high" | "medium" | "low";
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [focusMode, setFocusMode] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [stats, setStats] = useState({
    focusTime: 0,
    tasksCompleted: 0,
    streak: 1,
  });

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now(),
      title: newTask,
      estimatedTime: 25,
      priority: "medium",
    };
    
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const startFocus = (task: Task) => {
    setCurrentTask(task);
    setFocusMode(true);
  };

  const completeFocus = () => {
    if (currentTask) {
      setStats({
        focusTime: stats.focusTime + currentTask.estimatedTime,
        tasksCompleted: stats.tasksCompleted + 1,
        streak: stats.streak,
      });
      setTasks(tasks.filter(t => t.id !== currentTask.id));
    }
    setFocusMode(false);
    setCurrentTask(null);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-accent">Focus Flow</h1>
        
        <Stats {...stats} />

        {focusMode && currentTask ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Focus Mode</h2>
            <p className="text-muted-foreground">Currently focusing on: {currentTask.title}</p>
            <FocusTimer duration={currentTask.estimatedTime} onComplete={completeFocus} />
          </div>
        ) : (
          <>
            <div className="flex gap-4">
              <Input
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
              />
              <Button onClick={addTask}>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onStartFocus={() => startFocus(task)}
                />
              ))}
              {tasks.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No tasks yet. Add one to get started!
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;