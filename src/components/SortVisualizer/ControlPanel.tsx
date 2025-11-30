import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';

interface ControlPanelProps {
  currentAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onGenerateArray: () => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isAnimating: boolean;
  isPaused: boolean;
}

const algorithms = [
  'Bubble Sort',
  'Selection Sort',
  'Insertion Sort',
  'Merge Sort',
  'Quick Sort',
];

const ControlPanel = ({
  currentAlgorithm,
  onAlgorithmChange,
  arraySize,
  onArraySizeChange,
  speed,
  onSpeedChange,
  onGenerateArray,
  onStart,
  onPause,
  onReset,
  isAnimating,
  isPaused,
}: ControlPanelProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 md:p-6 space-y-6">
      {/* Algorithm Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          Algorithm
        </label>
        <Select value={currentAlgorithm} onValueChange={onAlgorithmChange} disabled={isAnimating}>
          <SelectTrigger className="w-full bg-background/50 border-border hover:border-primary transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {algorithms.map((algo) => (
              <SelectItem key={algo} value={algo} className="hover:bg-muted">
                {algo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Array Size Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-primary">
            Array Size
          </label>
          <span className="text-sm text-muted-foreground">{arraySize}</span>
        </div>
        <Slider
          value={[arraySize]}
          onValueChange={(values) => onArraySizeChange(values[0])}
          min={10}
          max={150}
          step={5}
          disabled={isAnimating}
          className="cursor-pointer"
        />
      </div>

      {/* Speed Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-primary">
            Speed
          </label>
          <span className="text-sm text-muted-foreground">{speed}%</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(values) => onSpeedChange(values[0])}
          min={1}
          max={100}
          step={1}
          className="cursor-pointer"
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button
          onClick={onGenerateArray}
          disabled={isAnimating}
          variant="outline"
          className="w-full transition-all duration-300"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          New Array
        </Button>

        <Button
          onClick={onStart}
          disabled={isAnimating && !isPaused}
          className="w-full hover:scale-105 transition-all duration-300"
        >
          <Play className="w-4 h-4 mr-2" />
          Start
        </Button>

        <Button
          onClick={onPause}
          disabled={!isAnimating}
          variant="outline"
          className="w-full transition-all duration-300"
        >
          <Pause className="w-4 h-4 mr-2" />
          {isPaused ? 'Resume' : 'Pause'}
        </Button>

        <Button
          onClick={onReset}
          disabled={!isAnimating && !isPaused}
          variant="outline"
          className="w-full transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
