import { BarState } from '@/hooks/useSortingVisualizer';

interface VisualizerProps {
  barStates: BarState[];
}

const Visualizer = ({ barStates }: VisualizerProps) => {
  const maxValue = Math.max(...barStates.map(bar => bar.value), 100);

  const getBarColor = (state: BarState['state']) => {
    switch (state) {
      case 'comparing':
        return 'hsl(50 98% 64%)'; // Yellow
      case 'swapping':
        return 'hsl(330 81% 60%)'; // Pink
      case 'sorted':
        return 'hsl(142 71% 45%)'; // Green
      case 'pivot':
        return 'hsl(262 83% 58%)'; // Purple
      default:
        return 'hsl(217 91% 60%)'; // Blue
    }
  };

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-end justify-center gap-[2px] h-[400px] md:h-[500px]">
        {barStates.map((bar, idx) => (
          <div
            key={idx}
            className="transition-all duration-200 ease-in-out rounded-t-sm"
            style={{
              height: `${(bar.value / maxValue) * 100}%`,
              width: `${Math.max(100 / barStates.length, 2)}%`,
              backgroundColor: getBarColor(bar.state),
            }}
            aria-label={`Bar ${idx + 1} with value ${bar.value}`}
          />
        ))}
      </div>

      {/* Color Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(217 91% 60%)' }} />
          <span className="text-muted-foreground">Default</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(50 98% 64%)' }} />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(330 81% 60%)' }} />
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(262 83% 58%)' }} />
          <span className="text-muted-foreground">Pivot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(142 71% 45%)' }} />
          <span className="text-muted-foreground">Sorted</span>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
