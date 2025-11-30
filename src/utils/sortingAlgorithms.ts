// Types for animation steps
export interface AnimationStep {
  type: 'compare' | 'swap' | 'sorted' | 'pivot' | 'merge';
  indices: number[];
  values?: number[];
}

// Bubble Sort
export function* bubbleSort(arr: number[]): Generator<AnimationStep> {
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        yield { type: 'swap', indices: [j, j + 1] };
      }
    }
    yield { type: 'sorted', indices: [n - i - 1] };
  }
  yield { type: 'sorted', indices: [0] };
}

// Selection Sort
export function* selectionSort(arr: number[]): Generator<AnimationStep> {
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [minIdx, j] };
      
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      yield { type: 'swap', indices: [i, minIdx] };
    }
    yield { type: 'sorted', indices: [i] };
  }
  yield { type: 'sorted', indices: [n - 1] };
}

// Insertion Sort
export function* insertionSort(arr: number[]): Generator<AnimationStep> {
  const array = [...arr];
  const n = array.length;

  yield { type: 'sorted', indices: [0] };

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0) {
      yield { type: 'compare', indices: [j, j + 1] };
      
      if (array[j] > key) {
        array[j + 1] = array[j];
        yield { type: 'swap', indices: [j, j + 1] };
        j--;
      } else {
        break;
      }
    }
    array[j + 1] = key;
    yield { type: 'sorted', indices: [i] };
  }
}

// Merge Sort
export function* mergeSort(arr: number[]): Generator<AnimationStep> {
  const array = [...arr];
  
  function* mergeSortHelper(start: number, end: number): Generator<AnimationStep> {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    yield* mergeSortHelper(start, mid);
    yield* mergeSortHelper(mid + 1, end);
    yield* merge(start, mid, end);
  }

  function* merge(start: number, mid: number, end: number): Generator<AnimationStep> {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      yield { type: 'compare', indices: [start + i, mid + 1 + j] };

      if (left[i] <= right[j]) {
        array[k] = left[i];
        yield { type: 'merge', indices: [k], values: [left[i]] };
        i++;
      } else {
        array[k] = right[j];
        yield { type: 'merge', indices: [k], values: [right[j]] };
        j++;
      }
      k++;
    }

    while (i < left.length) {
      array[k] = left[i];
      yield { type: 'merge', indices: [k], values: [left[i]] };
      i++;
      k++;
    }

    while (j < right.length) {
      array[k] = right[j];
      yield { type: 'merge', indices: [k], values: [right[j]] };
      j++;
      k++;
    }

    for (let idx = start; idx <= end; idx++) {
      yield { type: 'sorted', indices: [idx] };
    }
  }

  yield* mergeSortHelper(0, array.length - 1);
}

// Quick Sort
export function* quickSort(arr: number[]): Generator<AnimationStep> {
  const array = [...arr];

  function* quickSortHelper(low: number, high: number): Generator<AnimationStep> {
    if (low < high) {
      const pi = yield* partition(low, high);
      yield* quickSortHelper(low, pi - 1);
      yield* quickSortHelper(pi + 1, high);
    } else if (low === high) {
      yield { type: 'sorted', indices: [low] };
    }
  }

  function* partition(low: number, high: number): Generator<AnimationStep, number> {
    const pivot = array[high];
    yield { type: 'pivot', indices: [high] };
    
    let i = low - 1;

    for (let j = low; j < high; j++) {
      yield { type: 'compare', indices: [j, high] };

      if (array[j] < pivot) {
        i++;
        if (i !== j) {
          [array[i], array[j]] = [array[j], array[i]];
          yield { type: 'swap', indices: [i, j] };
        }
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    yield { type: 'swap', indices: [i + 1, high] };
    yield { type: 'sorted', indices: [i + 1] };

    return i + 1;
  }

  yield* quickSortHelper(0, array.length - 1);
}

// Get sorting algorithm by name
export function getSortingAlgorithm(name: string) {
  switch (name) {
    case 'Bubble Sort':
      return bubbleSort;
    case 'Selection Sort':
      return selectionSort;
    case 'Insertion Sort':
      return insertionSort;
    case 'Merge Sort':
      return mergeSort;
    case 'Quick Sort':
      return quickSort;
    default:
      return bubbleSort;
  }
}
