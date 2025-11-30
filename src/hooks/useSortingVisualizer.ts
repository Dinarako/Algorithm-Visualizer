import { useState, useEffect, useRef, useCallback } from 'react';
import { getSortingAlgorithm, AnimationStep } from '@/utils/sortingAlgorithms';

export interface BarState {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}

export function useSortingVisualizer(initialSize: number = 50) {
  const [array, setArray] = useState<number[]>([]);
  const [barStates, setBarStates] = useState<BarState[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState('Bubble Sort');
  const [speed, setSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(initialSize);

  const animationRef = useRef<number | null>(null);
  const generatorRef = useRef<Generator<AnimationStep> | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate new random array
  const generateArray = useCallback((size: number = arraySize) => {
    const newArray = Array.from({ length: size }, () => 
      Math.floor(Math.random() * 90) + 10
    );
    setArray(newArray);
    setBarStates(newArray.map(value => ({ value, state: 'default' })));
    setIsAnimating(false);
    setIsPaused(false);
  }, [arraySize]);

  // Initialize array on mount
  useEffect(() => {
    generateArray();
  }, []);

  // Update array size
  const updateArraySize = useCallback((size: number) => {
    setArraySize(size);
    generateArray(size);
  }, [generateArray]);

  // Reset bar states to default
  const resetBarStates = useCallback(() => {
    setBarStates(prev => prev.map(bar => ({ ...bar, state: 'default' })));
  }, []);

  // Animation loop
  const animate = useCallback(async () => {
    if (!generatorRef.current) return;

    const step = generatorRef.current.next();

    if (step.done) {
      // Mark all as sorted at the end
      setBarStates(prev => prev.map(bar => ({ ...bar, state: 'sorted' })));
      setIsAnimating(false);
      setIsPaused(false);
      return;
    }

    const animation = step.value;

    // Update bar states based on animation type
    setBarStates(prev => {
      const newStates = [...prev];
      
      // Reset all to default first (except sorted ones)
      newStates.forEach(bar => {
        if (bar.state !== 'sorted') {
          bar.state = 'default';
        }
      });

      // Apply new states
      animation.indices.forEach((idx, i) => {
        if (idx < newStates.length) {
          switch (animation.type) {
            case 'compare':
              newStates[idx].state = 'comparing';
              break;
            case 'swap':
              newStates[idx].state = 'swapping';
              // Swap values
              if (i === 0 && animation.indices.length > 1) {
                const idx2 = animation.indices[1];
                [newStates[idx].value, newStates[idx2].value] = 
                  [newStates[idx2].value, newStates[idx].value];
              }
              break;
            case 'sorted':
              newStates[idx].state = 'sorted';
              break;
            case 'pivot':
              newStates[idx].state = 'pivot';
              break;
            case 'merge':
              newStates[idx].state = 'swapping';
              if (animation.values && animation.values[i] !== undefined) {
                newStates[idx].value = animation.values[i];
              }
              break;
          }
        }
      });

      return newStates;
    });

    // Calculate delay based on speed (invert: higher speed = lower delay)
    const delay = Math.max(10, 200 - (speed * 1.9));

    timeoutRef.current = setTimeout(() => {
      if (!isPaused) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }, delay);
  }, [speed, isPaused]);

  // Start sorting
  const startSorting = useCallback(() => {
    if (isAnimating) return;

    resetBarStates();
    const sortFunc = getSortingAlgorithm(currentAlgorithm);
    generatorRef.current = sortFunc(array);
    setIsAnimating(true);
    setIsPaused(false);
    animate();
  }, [array, currentAlgorithm, isAnimating, resetBarStates, animate]);

  // Pause/Resume
  const togglePause = useCallback(() => {
    if (!isAnimating) return;

    if (isPaused) {
      setIsPaused(false);
      animate();
    } else {
      setIsPaused(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isAnimating, isPaused, animate]);

  // Reset
  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    generatorRef.current = null;
    setIsAnimating(false);
    setIsPaused(false);
    generateArray();
  }, [generateArray]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
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
  };
}
