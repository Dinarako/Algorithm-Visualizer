import Header from '@/components/SortVisualizer/Header';
import ControlPanel from '@/components/SortVisualizer/ControlPanel';
import Visualizer from '@/components/SortVisualizer/Visualizer';
import AlgorithmInfo from '@/components/SortVisualizer/AlgorithmInfo';
import Footer from '@/components/SortVisualizer/Footer';
import { useSortingVisualizer } from '@/hooks/useSortingVisualizer';

const Index = () => {
  const {
    barStates,
    isAnimating,
    isPaused,
    currentAlgorithm,
    speed,
    arraySize,
    setCurrentAlgorithm,
    setSpeed,
    updateArraySize,
    generateArray,
    startSorting,
    togglePause,
    reset,
  } = useSortingVisualizer();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Header />

        <div className="grid lg:grid-cols-[350px_1fr] gap-6 mb-8">
          {/* Control Panel */}
          <aside>
            <ControlPanel
              currentAlgorithm={currentAlgorithm}
              onAlgorithmChange={setCurrentAlgorithm}
              arraySize={arraySize}
              onArraySizeChange={updateArraySize}
              speed={speed}
              onSpeedChange={setSpeed}
              onGenerateArray={generateArray}
              onStart={startSorting}
              onPause={togglePause}
              onReset={reset}
              isAnimating={isAnimating}
              isPaused={isPaused}
            />
          </aside>

          {/* Visualizer */}
          <main>
            <Visualizer barStates={barStates} />
          </main>
        </div>

        {/* Algorithm Info */}
        <div className="max-w-4xl mx-auto mb-8">
          <AlgorithmInfo algorithm={currentAlgorithm} />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
