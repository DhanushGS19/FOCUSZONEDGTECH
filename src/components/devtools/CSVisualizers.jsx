import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, FastForward, ArrowRight, Zap, Info, 
  BarChart2, Search, Layers, GitBranch, Share2, CornerDownRight 
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const DEFAULT_ARRAY = [45, 18, 72, 31, 88, 12, 63, 29, 95, 54, 38, 81];

export const CSVisualizers = () => {
  const { addXp } = useUser();
  const [activeCategory, setActiveCategory] = useState('sorting'); // sorting | searching | ds | graph | recursion | bigo

  // --- 1. SORTING STATE ---
  const [sortAlgo, setSortAlgo] = useState('bubble'); // bubble, selection, insertion, merge
  const [array, setArray] = useState([...DEFAULT_ARRAY]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const isSortingRef = useRef(false);

  const resetSortingArray = () => {
    isSortingRef.current = false;
    setIsSorting(false);
    const randomized = Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 12);
    setArray(randomized);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
  };

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  const runBubbleSort = async () => {
    isSortingRef.current = true;
    setIsSorting(true);
    let arr = [...array];
    let cmpCount = 0;
    let swpCount = 0;
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSortingRef.current) return;
        setActiveIndices([j, j + 1]);
        cmpCount++;
        setComparisons(cmpCount);
        await delay(120);

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swpCount++;
          setSwaps(swpCount);
          setArray([...arr]);
          await delay(120);
        }
      }
      setSortedIndices(prev => [...prev, n - i - 1]);
    }

    setActiveIndices([]);
    setIsSorting(false);
    isSortingRef.current = false;
    addXp(20);
  };

  const runSelectionSort = async () => {
    isSortingRef.current = true;
    setIsSorting(true);
    let arr = [...array];
    let cmpCount = 0;
    let swpCount = 0;
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (!isSortingRef.current) return;
        setActiveIndices([minIdx, j]);
        cmpCount++;
        setComparisons(cmpCount);
        await delay(100);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        swpCount++;
        setSwaps(swpCount);
        setArray([...arr]);
        await delay(100);
      }
      setSortedIndices(prev => [...prev, i]);
    }

    setActiveIndices([]);
    setIsSorting(false);
    isSortingRef.current = false;
    addXp(20);
  };

  const runSorting = () => {
    if (isSorting) {
      isSortingRef.current = false;
      setIsSorting(false);
      return;
    }
    if (sortAlgo === 'bubble') runBubbleSort();
    else if (sortAlgo === 'selection') runSelectionSort();
    else runBubbleSort();
  };

  // --- 2. SEARCHING STATE ---
  const [searchTarget, setSearchTarget] = useState(54);
  const [searchArr] = useState([12, 18, 29, 31, 38, 45, 54, 63, 72, 81, 88, 95]);
  const [searchHighLow, setSearchHighLow] = useState({ low: -1, mid: -1, high: -1, found: false });
  const [isSearching, setIsSearching] = useState(false);
  const [searchSteps, setSearchSteps] = useState(0);

  const runBinarySearch = async () => {
    setIsSearching(true);
    let low = 0;
    let high = searchArr.length - 1;
    let steps = 0;

    while (low <= high) {
      steps++;
      setSearchSteps(steps);
      const mid = Math.floor((low + high) / 2);
      setSearchHighLow({ low, mid, high, found: false });
      await delay(600);

      if (searchArr[mid] === Number(searchTarget)) {
        setSearchHighLow({ low, mid, high, found: true });
        setIsSearching(false);
        addXp(20);
        return;
      }
      if (searchArr[mid] < Number(searchTarget)) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    setSearchHighLow({ low: -1, mid: -1, high: -1, found: false, notFound: true });
    setIsSearching(false);
  };

  // --- 3. DATA STRUCTURES STATE (Stack, Queue, Linked List) ---
  const [stackItems, setStackItems] = useState([10, 20, 30]);
  const [queueItems, setQueueItems] = useState([5, 15, 25]);
  const [listNodes, setListNodes] = useState([100, 200, 300]);
  const [dsInputValue, setDsInputValue] = useState('40');

  const pushStack = () => {
    if (!dsInputValue) return;
    setStackItems([...stackItems, Number(dsInputValue)]);
    addXp(5);
  };

  const popStack = () => {
    if (stackItems.length === 0) return;
    setStackItems(stackItems.slice(0, -1));
  };

  const enqueueQueue = () => {
    if (!dsInputValue) return;
    setQueueItems([...queueItems, Number(dsInputValue)]);
    addXp(5);
  };

  const dequeueQueue = () => {
    if (queueItems.length === 0) return;
    setQueueItems(queueItems.slice(1));
  };

  const insertHeadLinkedList = () => {
    if (!dsInputValue) return;
    setListNodes([Number(dsInputValue), ...listNodes]);
    addXp(5);
  };

  const deleteTailLinkedList = () => {
    if (listNodes.length === 0) return;
    setListNodes(listNodes.slice(0, -1));
  };

  // --- 4. RECURSION VISUALIZER ---
  const [recursionNum, setRecursionNum] = useState(4);
  const [callStack, setCallStack] = useState([]);
  const [recursionResult, setRecursionResult] = useState(null);

  const runFactorialRecursion = async () => {
    setCallStack([]);
    setRecursionResult(null);
    let frames = [];

    // Simulate recursion stack push
    for (let i = recursionNum; i >= 1; i--) {
      frames.push({ call: `factorial(${i})`, n: i, status: 'Active Frame (Pushing)' });
      setCallStack([...frames]);
      await delay(400);
    }

    let product = 1;
    // Simulate stack unwind / pop
    for (let i = 1; i <= recursionNum; i++) {
      product *= i;
      frames = frames.map(f => f.n === i ? { ...f, status: `Returns ${product} (Popping)` } : f);
      setCallStack([...frames]);
      await delay(400);
    }

    setRecursionResult(product);
    addXp(25);
  };

  // --- 5. GRAPH BFS / DFS GRID STATE ---
  const GRID_ROWS = 6;
  const GRID_COLS = 8;
  const [grid, setGrid] = useState(() => {
    const g = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      const row = [];
      for (let c = 0; c < GRID_COLS; c++) {
        row.push({ r, c, isWall: false, visited: false, isStart: r === 0 && c === 0, isEnd: r === 5 && c === 7 });
      }
      g.push(row);
    }
    return g;
  });

  const toggleWall = (r, c) => {
    if ((r === 0 && c === 0) || (r === 5 && c === 7)) return;
    setGrid(prev => prev.map(row => row.map(cell => (cell.r === r && cell.c === c ? { ...cell, isWall: !cell.isWall } : cell))));
  };

  const runBFS = async () => {
    let g = grid.map(row => row.map(cell => ({ ...cell, visited: false })));
    setGrid(g);

    const queue = [[0, 0]];
    g[0][0].visited = true;

    while (queue.length > 0) {
      const [currR, currC] = queue.shift();
      if (currR === 5 && currC === 7) {
        addXp(30);
        return;
      }

      const neighbors = [
        [currR + 1, currC],
        [currR - 1, currC],
        [currR, currC + 1],
        [currR, currC - 1]
      ];

      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS) {
          if (!g[nr][nc].visited && !g[nr][nc].isWall) {
            g[nr][nc].visited = true;
            queue.push([nr, nc]);
            setGrid([...g.map(r => [...r])]);
            await delay(50);
          }
        }
      }
    }
  };

  const resetGrid = () => {
    setGrid(grid.map(row => row.map(cell => ({ ...cell, visited: false, isWall: false }))));
  };

  return (
    <div className="cs-visualizers-container">
      {/* Category selector */}
      <div className="subtool-pills-bar flex gap-2 flex-wrap mb-6">
        {[
          { id: 'sorting', label: 'Sorting Visualizer', icon: BarChart2 },
          { id: 'searching', label: 'Binary & Linear Search', icon: Search },
          { id: 'ds', label: 'Stack, Queue & Linked List', icon: Layers },
          { id: 'graph', label: 'Graph BFS Pathfinding', icon: GitBranch },
          { id: 'recursion', label: 'Recursion Call Stack', icon: CornerDownRight },
          { id: 'bigo', label: 'Big-O Complexity Guide', icon: Zap }
        ].map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              className={`filter-pill text-xs flex items-center gap-1 ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Icon size={14} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. SORTING VISUALIZER */}
      {activeCategory === 'sorting' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge cyan font-mono uppercase">{sortAlgo} Sort</span>
                <span className="badge">O(n²) Average</span>
              </div>
              <h3 className="text-xl font-bold">Interactive Sorting Visualizer</h3>
              <p className="text-xs text-muted">Watch elements compare, shift, and lock into sorted positions</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                className="codelab-select text-xs"
                value={sortAlgo}
                onChange={(e) => { setSortAlgo(e.target.value); resetSortingArray(); }}
                disabled={isSorting}
              >
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
              </select>

              <button className="primary text-xs flex items-center gap-2" onClick={runSorting}>
                {isSorting ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                {isSorting ? 'Pause' : 'Start Sort'}
              </button>

              <button className="outline-btn text-xs" onClick={resetSortingArray} disabled={isSorting}>
                <RotateCcw size={14} /> Randomize
              </button>
            </div>
          </div>

          {/* Stats Header */}
          <div className="flex gap-4 mb-4 text-xs font-mono">
            <span className="text-muted">Comparisons: <strong className="text-cyan">{comparisons}</strong></span>
            <span className="text-muted">Swaps / Shifts: <strong className="text-accent">{swaps}</strong></span>
          </div>

          {/* Bar Chart Visualization Canvas */}
          <div className="sorting-bars-container glass-panel p-6 flex items-end justify-center gap-3" style={{ height: '240px', background: '#05070e' }}>
            {array.map((val, idx) => {
              const isActive = activeIndices.includes(idx);
              const isSorted = sortedIndices.includes(idx);
              let barBg = 'linear-gradient(180deg, var(--primary), var(--primary-deep))';
              if (isActive) barBg = 'linear-gradient(180deg, var(--warning), #d97706)';
              if (isSorted) barBg = 'linear-gradient(180deg, var(--accent), #059669)';

              return (
                <div key={idx} className="flex flex-col items-center flex-1" style={{ maxWidth: '42px', height: '100%', justifyContent: 'flex-end' }}>
                  <span className="text-xs font-mono mb-1 text-muted" style={{ fontSize: '0.7rem' }}>{val}</span>
                  <div
                    style={{
                      width: '100%',
                      height: `${(val / 100) * 100}%`,
                      background: barBg,
                      borderRadius: '6px 6px 2px 2px',
                      transition: 'height 0.15s ease, background 0.15s'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Algorithm Breakdown Box */}
          <div className="mt-4 p-4 glass-panel text-xs text-muted" style={{ background: 'rgba(0, 0, 0, 0.25)' }}>
            <h4 className="text-cyan font-bold uppercase mb-1 flex items-center gap-1 font-mono">
              <Info size={14} /> Algorithm Complexity & Mechanics:
            </h4>
            {sortAlgo === 'bubble' ? (
              <p>
                <strong>Bubble Sort</strong> repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Pass after pass, the largest unsorted element "bubbles" up to its correct final index.<br />
                • <strong>Best Case:</strong> O(n) (when already sorted with early termination flag)<br />
                • <strong>Average & Worst Case:</strong> O(n²)<br />
                • <strong>Auxiliary Space:</strong> O(1) In-Place
              </p>
            ) : (
              <p>
                <strong>Selection Sort</strong> divides the input list into a sorted sublist and an unsorted sublist. It repeatedly finds the minimum element from the unsorted sublist and moves it to the sorted boundary.<br />
                • <strong>Best, Average & Worst Case:</strong> O(n²)<br />
                • <strong>Auxiliary Space:</strong> O(1) In-Place
              </p>
            )}
          </div>
        </div>
      )}

      {/* 2. SEARCHING VISUALIZER */}
      {activeCategory === 'searching' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge cyan font-mono">O(log n) Time</span>
                <span className="badge">Divide & Conquer</span>
              </div>
              <h3 className="text-xl font-bold">Binary Search Pointer Visualizer</h3>
              <p className="text-xs text-muted">Watch low, mid, and high pointers converge on the target element in O(log n) steps</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="devtools-textarea font-mono text-xs"
                style={{ width: '100px', padding: '0.45rem' }}
                value={searchTarget}
                onChange={(e) => setSearchTarget(e.target.value)}
              />
              <button className="primary text-xs flex items-center gap-1" onClick={runBinarySearch} disabled={isSearching}>
                <Search size={14} /> Search Target
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-4 text-xs font-mono">
            <span>Steps: <strong className="text-cyan">{searchSteps}</strong></span>
            {searchHighLow.found && <span className="text-accent font-bold">✓ Target Found at Index {searchHighLow.mid}!</span>}
            {searchHighLow.notFound && <span className="text-danger font-bold">❌ Target Not Present in Array</span>}
          </div>

          {/* Array visualization */}
          <div className="search-array-canvas glass-panel p-6 flex justify-center gap-2 flex-wrap" style={{ background: '#05070e' }}>
            {searchArr.map((val, idx) => {
              const isMid = searchHighLow.mid === idx;
              const isLow = searchHighLow.low === idx;
              const isHigh = searchHighLow.high === idx;
              const isFound = isMid && searchHighLow.found;

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-xs font-mono text-muted mb-1">
                    {isLow && 'Low '}
                    {isMid && 'Mid '}
                    {isHigh && 'High'}
                  </div>
                  <div 
                    className={`search-cell flex items-center justify-center p-3 rounded-lg font-mono font-bold text-sm ${isFound ? 'found' : (isMid ? 'mid' : (isLow || isHigh ? 'boundary' : ''))}`}
                    style={{
                      width: '48px',
                      height: '48px',
                      background: isFound ? 'var(--accent)' : (isMid ? 'var(--warning)' : (isLow || isHigh ? 'rgba(6, 182, 212, 0.25)' : 'rgba(255, 255, 255, 0.05)')),
                      color: isFound ? '#0f172a' : (isMid ? '#0f172a' : '#fff'),
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {val}
                  </div>
                  <span className="text-xs text-muted font-mono mt-1">idx {idx}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. DATA STRUCTURES (Stack, Queue, Linked List) */}
      {activeCategory === 'ds' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold">Fundamental Data Structures</h3>
              <p className="text-xs text-muted">Interactive Stack (LIFO), Queue (FIFO), and Singly Linked List operations</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Value"
                className="devtools-textarea font-mono text-xs"
                style={{ width: '80px', padding: '0.45rem' }}
                value={dsInputValue}
                onChange={(e) => setDsInputValue(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 devtools-split-grid">
            {/* Stack Box */}
            <div className="glass-panel p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase text-primary mb-1">Stack (LIFO)</h4>
                <p className="text-xs text-muted mb-3">Last-In, First-Out</p>
                <div className="stack-container flex flex-col-reverse gap-2 p-3 rounded-lg" style={{ minHeight: '160px', background: '#05070e' }}>
                  {stackItems.map((val, i) => (
                    <div key={i} className="p-2 rounded text-center font-mono text-xs font-bold" style={{ background: 'rgba(139, 92, 246, 0.3)', border: '1px solid var(--primary)' }}>
                      {val} {i === stackItems.length - 1 ? '(TOP)' : ''}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="primary text-xs flex-1" onClick={pushStack}>Push</button>
                <button className="outline-btn text-xs flex-1" onClick={popStack}>Pop</button>
              </div>
            </div>

            {/* Queue Box */}
            <div className="glass-panel p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase text-cyan mb-1">Queue (FIFO)</h4>
                <p className="text-xs text-muted mb-3">First-In, First-Out</p>
                <div className="queue-container flex gap-2 p-3 rounded-lg overflow-x-auto" style={{ minHeight: '160px', background: '#05070e', alignItems: 'center' }}>
                  {queueItems.map((val, i) => (
                    <div key={i} className="p-2 rounded text-center font-mono text-xs font-bold flex-shrink-0" style={{ width: '50px', background: 'rgba(6, 182, 212, 0.3)', border: '1px solid var(--cyan)' }}>
                      {val}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="cyan-btn text-xs flex-1" onClick={enqueueQueue}>Enqueue</button>
                <button className="outline-btn text-xs flex-1" onClick={dequeueQueue}>Dequeue</button>
              </div>
            </div>

            {/* Linked List Box */}
            <div className="glass-panel p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase text-accent mb-1">Linked List</h4>
                <p className="text-xs text-muted mb-3">Dynamic Node Pointers</p>
                <div className="ll-container flex items-center gap-1 p-3 rounded-lg overflow-x-auto" style={{ minHeight: '160px', background: '#05070e' }}>
                  {listNodes.map((val, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="p-2 rounded text-center font-mono text-xs font-bold" style={{ background: 'rgba(16, 185, 129, 0.3)', border: '1px solid var(--accent)' }}>
                        {val}
                      </div>
                      <span className="text-muted text-xs">➔</span>
                    </div>
                  ))}
                  <span className="text-muted font-mono text-xs">NULL</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="primary text-xs flex-1" onClick={insertHeadLinkedList}>Insert Head</button>
                <button className="outline-btn text-xs flex-1" onClick={deleteTailLinkedList}>Del Tail</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. GRAPH BFS PATHFINDING */}
      {activeCategory === 'graph' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge cyan font-mono">Queue-Based BFS</span>
                <span className="badge">Shortest Path</span>
              </div>
              <h3 className="text-xl font-bold">Breadth-First Search (BFS) Grid Wave</h3>
              <p className="text-xs text-muted">Click any tile to toggle obstacles/walls, then start the level-order traversal</p>
            </div>

            <div className="flex gap-2">
              <button className="primary text-xs flex items-center gap-1" onClick={runBFS}>
                <Play size={14} fill="currentColor" /> Run BFS Wave
              </button>
              <button className="outline-btn text-xs" onClick={resetGrid}>
                Reset Grid
              </button>
            </div>
          </div>

          {/* Grid Canvas */}
          <div className="grid-canvas-box flex flex-col items-center justify-center p-6 glass-panel" style={{ background: '#05070e' }}>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 44px)` }}>
              {grid.map(row => row.map(cell => {
                let cellBg = 'rgba(255, 255, 255, 0.05)';
                let border = '1px solid rgba(255, 255, 255, 0.08)';
                let label = '';

                if (cell.isStart) {
                  cellBg = 'var(--primary)';
                  label = 'S';
                } else if (cell.isEnd) {
                  cellBg = 'var(--accent)';
                  label = 'E';
                } else if (cell.isWall) {
                  cellBg = '#334155';
                } else if (cell.visited) {
                  cellBg = 'rgba(6, 182, 212, 0.4)';
                  border = '1px solid var(--cyan)';
                }

                return (
                  <div
                    key={`${cell.r}-${cell.c}`}
                    className="grid-tile cursor-pointer flex items-center justify-center font-bold text-xs rounded transition-all"
                    style={{ width: '44px', height: '44px', background: cellBg, border }}
                    onClick={() => toggleWall(cell.r, cell.c)}
                  >
                    {label}
                  </div>
                );
              }))}
            </div>
          </div>
        </div>
      )}

      {/* 5. RECURSION VISUALIZER */}
      {activeCategory === 'recursion' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge">Call Stack Execution</span>
                <span className="badge cyan">Activation Records</span>
              </div>
              <h3 className="text-xl font-bold">Call Stack Recursion Visualizer</h3>
              <p className="text-xs text-muted">Inspect how execution contexts push onto and pop off the runtime stack</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted font-bold">factorial(n):</span>
              <select
                className="codelab-select text-xs"
                value={recursionNum}
                onChange={(e) => setRecursionNum(Number(e.target.value))}
              >
                <option value={3}>factorial(3)</option>
                <option value={4}>factorial(4)</option>
                <option value={5}>factorial(5)</option>
              </select>
              <button className="primary text-xs" onClick={runFactorialRecursion}>
                Simulate Call Stack
              </button>
            </div>
          </div>

          <div className="call-stack-wrapper glass-panel p-6 flex flex-col-reverse gap-2" style={{ minHeight: '220px', background: '#05070e' }}>
            {callStack.map((frame, i) => (
              <div key={i} className="frame-box p-3 rounded-lg flex justify-between items-center text-xs font-mono" style={{ background: 'rgba(139, 92, 246, 0.2)', border: '1px solid var(--primary)' }}>
                <span className="font-bold text-cyan">{frame.call}</span>
                <span className="text-muted">{frame.status}</span>
              </div>
            ))}
            {callStack.length === 0 && (
              <div className="text-center text-xs text-muted py-8">
                Click 'Simulate Call Stack' to observe stack activation frames.
              </div>
            )}
          </div>

          {recursionResult && (
            <div className="mt-4 p-3 glass-panel text-accent font-mono text-sm font-bold text-center">
              ✓ Base case hit & stack unwound: factorial({recursionNum}) = {recursionResult}
            </div>
          )}
        </div>
      )}

      {/* 6. BIG-O COMPLEXITY GUIDE */}
      {activeCategory === 'bigo' && (
        <div className="glass-panel p-6 fade-in">
          <div className="mb-6">
            <h3 className="text-xl font-bold">Big-O Asymptotic Complexity Reference</h3>
            <p className="text-xs text-muted">Comparative breakdown of algorithmic orders of growth from O(1) to O(2ⁿ)</p>
          </div>

          <div className="grid grid-cols-3 gap-4 devtools-split-grid mb-6">
            <div className="glass-panel p-4 text-center" style={{ borderTop: '3px solid #10b981' }}>
              <div className="text-lg font-bold font-mono text-accent">O(1) Constant</div>
              <p className="text-xs text-muted mt-1">Hash table lookups, array indexing by index, stack push/pop.</p>
            </div>
            <div className="glass-panel p-4 text-center" style={{ borderTop: '3px solid #06b6d4' }}>
              <div className="text-lg font-bold font-mono text-cyan">O(log n) Logarithmic</div>
              <p className="text-xs text-muted mt-1">Binary search, balanced binary search tree operations.</p>
            </div>
            <div className="glass-panel p-4 text-center" style={{ borderTop: '3px solid #3b82f6' }}>
              <div className="text-lg font-bold font-mono text-primary">O(n) Linear</div>
              <p className="text-xs text-muted mt-1">Single loop traversals, linear search, array copying.</p>
            </div>
            <div className="glass-panel p-4 text-center" style={{ borderTop: '3px solid #f59e0b' }}>
              <div className="text-lg font-bold font-mono text-warning">O(n log n) Linearithmic</div>
              <p className="text-xs text-muted mt-1">Merge Sort, QuickSort (avg), HeapSort, standard library sorts.</p>
            </div>
            <div className="glass-panel p-4 text-center" style={{ borderTop: '3px solid #f97316' }}>
              <div className="text-lg font-bold font-mono" style={{ color: '#f97316' }}>O(n²) Quadratic</div>
              <p className="text-xs text-muted mt-1">Nested loops, Bubble Sort, Selection Sort, brute-force pair comparisons.</p>
            </div>
            <div className="glass-panel p-4 text-center" style={{ borderTop: '3px solid #ef4444' }}>
              <div className="text-lg font-bold font-mono text-danger">O(2ⁿ) Exponential</div>
              <p className="text-xs text-muted mt-1">Recursive Fibonacci without memoization, generating all subsets.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
