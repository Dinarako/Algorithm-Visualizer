interface AlgorithmInfoProps {
  algorithm: string;
}

const algorithmData: Record<string, { description: string; timeComplexity: string; spaceComplexity: string }> = {
  'Bubble Sort': {
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  'Selection Sort': {
    description: 'Divides the input list into two parts: a sorted portion and an unsorted portion. It repeatedly selects the smallest element from the unsorted portion and moves it to the sorted portion.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  'Insertion Sort': {
    description: 'Builds the final sorted array one item at a time. It takes each element from the input and finds the appropriate position in the sorted list, inserting it there.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  'Merge Sort': {
    description: 'A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves to produce the final sorted array.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
  },
  'Quick Sort': {
    description: 'A divide-and-conquer algorithm that selects a pivot element and partitions the array around it, placing smaller elements before the pivot and larger elements after it, then recursively sorts the partitions.',
    timeComplexity: 'O(n log n) average, O(n²) worst',
    spaceComplexity: 'O(log n)',
  },
};

const AlgorithmInfo = ({ algorithm }: AlgorithmInfoProps) => {
  const info = algorithmData[algorithm] || algorithmData['Bubble Sort'];

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 md:p-6 space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold text-primary">
        {algorithm}
      </h2>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium mb-1 text-primary">
            How it works:
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {info.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-background/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Time Complexity</p>
            <p className="text-lg font-mono font-semibold text-foreground">
              {info.timeComplexity}
            </p>
          </div>
          <div className="bg-background/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Space Complexity</p>
            <p className="text-lg font-mono font-semibold text-foreground">
              {info.spaceComplexity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;
