import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  Play, RotateCcw, Copy, Download, Bot, Terminal, Eye, Sparkles, 
  Check, AlertTriangle, AlertCircle, Bookmark, FolderOpen, X, Clock, 
  Code2, Bug, HelpCircle, CheckCircle2, ChevronDown, ChevronRight,
  FolderTree, FileCode, Sliders, ShieldCheck
} from 'lucide-react';
import './CodeLab.css';

const SAMPLE_PROGRAMS = {
  python: {
    name: 'Python 3',
    pistonLang: 'python',
    version: '3.10.0',
    mode: 'code',
    filename: 'main.py',
    starterCode: `# TechVerse Code Studio: Python Execution
import sys

def solve():
    print("=== Python 3.10 Execution Engine ===")
    languages = ["Python", "JavaScript", "C++", "Java", "SQL"]
    print(f"Registered tracks: {languages}")
    
    # Mathematical demonstration
    squares = [x**2 for x in range(1, 8)]
    print(f"Squares 1-7: {squares}")
    
    # Read standard input (stdin) if provided
    print("\\nReading input stream:")
    user_line = sys.stdin.readline().strip()
    if user_line:
        print(f"✓ Stdin received: '{user_line}'")
    else:
        print("ℹ No stdin passed. Type into the Input Panel below and re-run!")

if __name__ == "__main__":
    solve()
`
  },
  javascript: {
    name: 'JavaScript (Node.js)',
    pistonLang: 'javascript',
    version: '18.15.0',
    mode: 'code',
    filename: 'index.js',
    starterCode: `// TechVerse Code Studio: Two Sum Hash Map
function twoSum(nums, target) {
  const map = new Map();
  console.log("Searching in array:", nums, "for target sum:", target);

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      console.log(\`✓ Match found! indices [\${map.get(complement)}, \${i}] sum to \${target}\`);
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

const testArray = [2, 7, 11, 15];
const targetVal = 9;
const result = twoSum(testArray, targetVal);
console.log("Result Indices:", result);
`
  },
  cpp: {
    name: 'C++ (G++)',
    pistonLang: 'cpp',
    version: '10.2.0',
    mode: 'code',
    filename: 'main.cpp',
    starterCode: `// TechVerse Code Studio: Modern C++ Engine
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

int main() {
    std::cout << "=== C++ (G++) Execution Engine ===\\n";
    std::vector<int> nums = {42, 17, 89, 5, 23, 64};
    std::sort(nums.begin(), nums.end());

    std::cout << "Sorted elements: ";
    for (int n : nums) {
        std::cout << n << " ";
    }
    std::cout << "\\n";

    std::string line;
    if (std::getline(std::cin, line) && !line.empty()) {
        std::cout << "Stdin read: " << line << "\\n";
    } else {
        std::cout << "(Tip: Enter text in the Input Panel to test std::cin)\\n";
    }
    return 0;
}
`
  },
  c: {
    name: 'C (GCC)',
    pistonLang: 'c',
    version: '10.2.0',
    mode: 'code',
    filename: 'main.c',
    starterCode: `// Techverse Code Lab: C Memory & Pointers
#include <stdio.h>
#include <stdlib.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    printf("=== C (GCC) Compiler Engine ===\\n");
    int x = 100, y = 200;
    printf("Before swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After swap:  x = %d, y = %d\\n", x, y);

    char buffer[64];
    if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        printf("Stdin read: %s\\n", buffer);
    }
    return 0;
}
`
  },
  java: {
    name: 'Java (OpenJDK)',
    pistonLang: 'java',
    version: '15.0.2',
    mode: 'code',
    filename: 'Main.java',
    starterCode: `// Techverse Code Lab: Java OpenJDK
import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Java OpenJDK Engine ===");
        List<String> tracks = Arrays.asList("Algorithms", "Distributed Systems", "AI", "Cloud");
        System.out.println("Core topics:");
        for (String t : tracks) {
            System.out.println("  • " + t);
        }

        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            System.out.println("\\nStdin: " + sc.nextLine());
        } else {
            System.out.println("\\n(Type into the input panel to test Scanner input)");
        }
    }
}
`
  },
  web: {
    name: 'HTML / CSS / JS Live',
    pistonLang: 'web',
    version: 'browser',
    mode: 'web',
    filename: 'index.html',
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      font-family: 'Inter', system-ui, sans-serif;
      background: #090d16;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .card {
      background: rgba(18, 26, 43, 0.9);
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: 16px;
      padding: 2.5rem;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      max-width: 320px;
      width: 100%;
    }
    h2 { color: #8b5cf6; margin: 0 0 0.5rem; font-size: 1.5rem; }
    p { color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.5rem; }
    .counter-val {
      font-size: 3.5rem;
      font-weight: 800;
      color: #06b6d4;
      margin: 1rem 0;
    }
    .btn-group { display: flex; gap: 0.75rem; justify-content: center; }
    button {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
      color: white;
      border: none;
      padding: 0.65rem 1.25rem;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.15s;
    }
    button:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="card">
    <h2>Techverse Live Sandbox</h2>
    <p>Real-time sandboxed DOM preview</p>
    <div id="count" class="counter-val">0</div>
    <div class="btn-group">
      <button onclick="decrement()">- 1</button>
      <button onclick="reset()">Reset</button>
      <button onclick="increment()">+ 1</button>
    </div>
  </div>

  <script>
    let count = 0;
    const el = document.getElementById('count');
    function update() { el.innerText = count; }
    function increment() { count++; update(); }
    function decrement() { if (count > 0) count--; update(); }
    function reset() { count = 0; update(); }
  </script>
</body>
</html>
`
  }
};

const CodeLab = () => {
  const navigate = useNavigate();
  const { addXp, saveSnippet, recentSnippets } = useUser();

  const [selectedLang, setSelectedLang] = useState('python');
  const [fileBuffers, setFileBuffers] = useState({
    python: SAMPLE_PROGRAMS.python.starterCode,
    javascript: SAMPLE_PROGRAMS.javascript.starterCode,
    cpp: SAMPLE_PROGRAMS.cpp.starterCode,
    c: SAMPLE_PROGRAMS.c.starterCode,
    java: SAMPLE_PROGRAMS.java.starterCode,
    web: SAMPLE_PROGRAMS.web.starterCode
  });
  const [code, setCode] = useState(SAMPLE_PROGRAMS.python.starterCode);
  const [showExplorer, setShowExplorer] = useState(true);
  const [stdin, setStdin] = useState('');
  const [showStdinPanel, setShowStdinPanel] = useState(false);
  const [activeSnippetModal, setActiveSnippetModal] = useState(false);
  const [snippetTitle, setSnippetTitle] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [runStatus, setRunStatus] = useState('idle'); // 'idle' | 'running' | 'success' | 'error'
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [compileOutput, setCompileOutput] = useState('');
  const [execTime, setExecTime] = useState(null);
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef(null);

  // Handle incoming review request from other pages
  useEffect(() => {
    const pendingCode = localStorage.getItem('focusflow_code_review');
    if (pendingCode) {
      setCode(pendingCode);
      setFileBuffers(prev => ({ ...prev, [selectedLang]: pendingCode }));
      localStorage.removeItem('focusflow_code_review');
    }
  }, [selectedLang]);

  const handleSelectLanguage = (langKey) => {
    // Save current buffer
    setFileBuffers(prev => ({ ...prev, [selectedLang]: code }));
    setSelectedLang(langKey);
    setCode(fileBuffers[langKey] || SAMPLE_PROGRAMS[langKey].starterCode);
    setStdout('');
    setStderr('');
    setCompileOutput('');
    setExecTime(null);
    setRunStatus('idle');
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setFileBuffers(prev => ({ ...prev, [selectedLang]: newCode }));
  };

  const handleEditorKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const updatedCode = code.substring(0, start) + '  ' + code.substring(end);
      handleCodeChange(updatedCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleReset = () => {
    if (window.confirm(`Reset ${SAMPLE_PROGRAMS[selectedLang].filename} to the starter template?`)) {
      const resetCode = SAMPLE_PROGRAMS[selectedLang].starterCode;
      setCode(resetCode);
      setFileBuffers(prev => ({ ...prev, [selectedLang]: resetCode }));
      setStdout('');
      setStderr('');
      setCompileOutput('');
      setRunStatus('idle');
    }
  };

  // Real execution engine via Piston API
  const handleRunCode = async () => {
    setIsRunning(true);
    setStdout('');
    setStderr('');
    setCompileOutput('');
    setExecTime(null);
    addXp(20);

    const currentConfig = SAMPLE_PROGRAMS[selectedLang];

    // For HTML/CSS Web mode, rendering is instantaneous inside iframe sandbox
    if (currentConfig.mode === 'web') {
      setIsRunning(false);
      setStdout('✓ Live Web DOM rendered inside sandboxed iframe.');
      return;
    }

    const startTime = performance.now();

    try {
      // Connect to the real public Piston code execution API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          language: currentConfig.pistonLang,
          version: '*',
          files: [
            {
              name: currentConfig.filename,
              content: code
            }
          ],
          stdin: stdin,
          run_timeout: 6000,
          compile_timeout: 10000
        })
      });

      clearTimeout(timeoutId);
      const elapsed = (performance.now() - startTime).toFixed(0);
      setExecTime(elapsed);

      if (!response.ok) {
        throw new Error(`Execution server responded with status: ${response.status}`);
      }

      const data = await response.json();

      // Check compile phase (e.g. C, C++, Java)
      if (data.compile && data.compile.code !== 0) {
        setCompileOutput(data.compile.output || data.compile.stderr || 'Compilation error occurred.');
      } else {
        if (data.compile?.output) {
          setCompileOutput(data.compile.output);
        }
      }

      // Check runtime phase
      if (data.run) {
        setStdout(data.run.stdout || (data.run.code === 0 && !data.run.stderr ? 'Program finished with no stdout.' : ''));
        setStderr(data.run.stderr || '');
      }

      // Automatically auto-save recent snippet
      if (saveSnippet) {
        saveSnippet(`${currentConfig.name} Sandbox`, code, currentConfig.name);
      }
    } catch (err) {
      const elapsed = (performance.now() - startTime).toFixed(0);
      setExecTime(elapsed);

      // Fallback for JavaScript running locally if API is offline
      if (selectedLang === 'javascript') {
        runJsLocally();
      } else {
        setStderr(`Execution Provider Notice: ${err.name === 'AbortError' ? 'Execution timed out (12s limit)' : err.message}\nEnsure an internet connection is available to reach the Piston sandbox compiler.`);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const runJsLocally = () => {
    const logs = [];
    const origLog = console.log;
    const origErr = console.error;

    console.log = (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    console.error = (...args) => logs.push('[ERROR] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));

    try {
      const fn = new Function(code);
      fn();
      setStdout(logs.join('\n') || 'Program completed with no console output.');
    } catch (e) {
      setStderr(e.message);
    } finally {
      console.log = origLog;
      console.error = origErr;
    }
  };

  // Keyboard shortcut Ctrl+Enter / Cmd+Enter to run
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const config = SAMPLE_PROGRAMS[selectedLang];
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = config.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveSnippetModal = (e) => {
    e.preventDefault();
    if (!snippetTitle.trim()) return;
    saveSnippet(snippetTitle.trim(), code, SAMPLE_PROGRAMS[selectedLang].name);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveSnippetModal(false);
      setSnippetTitle('');
    }, 1200);
  };

  const handleAskFlowAi = (mode) => {
    localStorage.setItem('focusflow_code_review', code);
    localStorage.setItem('focusflow_ai_mode', mode);
    navigate('/flow-ai');
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 16) }, (_, i) => i + 1);

  return (
    <div className="codelab-container fade-in">
      {/* Top Header */}
      <header className="mb-4 flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge">TechVerse IDE</span>
            <span className="badge cyan">Real Container Runtime</span>
            <span className="badge green flex items-center gap-1">
              <ShieldCheck size={11} /> Piston v2 API
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold font-heading">
            <Terminal className="text-primary" size={26} /> Code Studio
          </h1>
          <p className="text-muted text-xs">
            Professional developer workspace with isolated sandboxed compiler execution for Python, C++, C, Java, JavaScript, and Web Live DOM
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex gap-2 flex-wrap items-center">
          <button 
            className="btn-primary flex items-center gap-2" 
            onClick={handleRunCode} 
            disabled={isRunning}
            title="Execute Code (Ctrl + Enter)"
          >
            <Play size={16} fill="currentColor" /> {isRunning ? 'Compiling & Running...' : 'Run Code (Ctrl+Enter)'}
          </button>

          <button 
            className="btn-ai flex items-center gap-2 text-xs" 
            onClick={() => handleAskFlowAi('explain')}
            title="Ask AI Assistant to explain this program"
          >
            <Bot size={15} /> Explain Code
          </button>

          <button 
            className="outline-btn flex items-center gap-2 text-xs" 
            onClick={() => handleAskFlowAi('debug')}
            title="Ask Flow AI to debug errors"
          >
            <Bug size={15} className="text-danger" /> Debug
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="codelab-toolbar glass-panel p-3 mb-4 flex justify-between items-center flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* File Explorer Toggle */}
          <button
            className={`filter-pill text-xs flex items-center gap-1.5 ${showExplorer ? 'active' : ''}`}
            onClick={() => setShowExplorer(!showExplorer)}
            title="Toggle File Explorer sidebar"
          >
            <FolderTree size={14} />
            <span>Files {showExplorer ? '‹' : '›'}</span>
          </button>

          {/* Active File Display / Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted uppercase font-bold font-mono">Environment:</span>
            <select
              className="codelab-select font-mono text-xs"
              value={selectedLang}
              onChange={(e) => handleSelectLanguage(e.target.value)}
            >
              <option value="python">🐍 Python 3.10 (main.py)</option>
              <option value="javascript">⚡ JavaScript Node 18 (index.js)</option>
              <option value="cpp">🚀 C++ G++ 10 (main.cpp)</option>
              <option value="c">⚙️ C GCC 10 (main.c)</option>
              <option value="java">☕ Java OpenJDK 15 (Main.java)</option>
              <option value="web">🌐 HTML5 / CSS3 / JS (index.html)</option>
            </select>
          </div>

          {/* Stdin Toggle Button */}
          {selectedLang !== 'web' && (
            <button
              className={`filter-pill text-xs flex items-center gap-1.5 ${showStdinPanel ? 'active' : ''}`}
              onClick={() => setShowStdinPanel(!showStdinPanel)}
              title="Toggle Standard Input (stdin)"
            >
              <Sliders size={13} />
              <span>Input Stream (stdin) {stdin.trim() ? '•' : ''}</span>
            </button>
          )}
        </div>

        {/* Secondary Toolbar Actions */}
        <div className="flex items-center gap-2">
          <button 
            className="icon-btn text-xs flex items-center gap-1" 
            onClick={() => setActiveSnippetModal(true)} 
            title="Save snippet or project"
          >
            <Bookmark size={15} /> Save
          </button>
          <button className="icon-btn" onClick={handleCopy} title="Copy code" aria-label="Copy code">
            {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
          </button>
          <button className="icon-btn" onClick={handleDownload} title="Download file" aria-label="Download file">
            <Download size={15} />
          </button>
          <button className="icon-btn" onClick={handleReset} title="Reset to Starter Template" aria-label="Reset code">
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Optional Stdin Panel */}
      {showStdinPanel && selectedLang !== 'web' && (
        <div className="stdin-panel glass-panel mb-4 p-3 fade-in">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-mono text-cyan font-bold uppercase flex items-center gap-1.5">
              <Sliders size={13} /> Standard Input Stream (stdin)
            </label>
            <span className="text-[11px] text-muted">Data piped to sys.stdin / std::cin / Scanner at runtime</span>
          </div>
          <textarea
            className="stdin-textarea"
            rows={2}
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            placeholder="Type input data here (e.g., numbers, arguments, strings)..."
          />
        </div>
      )}

      {/* Repositioned IDE Container: Output Console on Left | Editor in Center | Explorer on Right */}
      <div className={`codelab-ide-container ${!showExplorer ? 'no-explorer' : ''}`}>
        {/* Pane 1 (REPOSITIONED TO LEFT): Output Terminal / Web Preview */}
        <div className="output-panel glass-panel">
          <div className="panel-header">
            <div className="panel-title flex items-center gap-2">
              {selectedLang === 'web' ? <Eye size={16} className="text-cyan" /> : <Terminal size={16} className="text-emerald" />}
              <span className="text-xs font-bold uppercase tracking-wider">
                {selectedLang === 'web' ? 'Live Interactive Preview' : 'Execution Console'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isRunning && (
                <span className="badge cyan text-[11px] animate-pulse">
                  ⚙️ Compiling...
                </span>
              )}
              {execTime && !isRunning && (
                <span className="text-xs text-muted font-mono flex items-center gap-1">
                  <Clock size={12} /> {execTime} ms
                </span>
              )}
              {selectedLang === 'web' && (
                <span className="badge cyan text-xs">Sandboxed iframe</span>
              )}
            </div>
          </div>

          {selectedLang === 'web' ? (
            <iframe
              className="preview-iframe"
              title="Web Preview Sandbox"
              srcDoc={code}
              sandbox="allow-scripts allow-modals"
            />
          ) : (
            <div className="terminal-content font-mono text-xs">
              {/* Execution Status Bar */}
              <div className="terminal-status-bar flex justify-between items-center pb-2 mb-3 border-b border-border text-[11px]">
                <span className="text-muted flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-cyan animate-pulse' : (stderr || compileOutput) ? 'bg-red-400' : stdout ? 'bg-emerald' : 'bg-slate-500'}`}></span>
                  Status: {isRunning ? 'Executing in Container...' : (compileOutput ? 'Compilation Diagnostic' : stderr ? 'Runtime Error' : stdout ? 'Process Finished (Exit 0)' : 'Idle - Ready')}
                </span>
                <span className="text-muted text-[10px]">Container: isolation level 2</span>
              </div>

              {/* Compilation Errors Display */}
              {compileOutput && (
                <div className="compile-error-box mb-3 p-3 rounded-lg border border-red-500/30 bg-red-950/20">
                  <div className="flex items-center gap-2 text-danger font-bold mb-1">
                    <AlertTriangle size={15} /> Compilation Diagnostics:
                  </div>
                  <pre className="compile-text text-red-300 font-mono text-xs whitespace-pre-wrap">{compileOutput}</pre>
                </div>
              )}

              {/* Standard Output */}
              {stdout && (
                <div className="stdout-box mb-2">
                  <pre className="stdout-text text-slate-100 font-mono text-xs whitespace-pre-wrap leading-relaxed">{stdout}</pre>
                </div>
              )}

              {/* Runtime Stderr / Errors */}
              {stderr && (
                <div className="stderr-box mb-2 p-3 rounded-lg border border-red-500/30 bg-red-950/20">
                  <div className="flex items-center gap-2 text-danger font-bold mb-1">
                    <AlertCircle size={15} /> Runtime Error:
                  </div>
                  <pre className="stderr-text text-red-300 font-mono text-xs whitespace-pre-wrap">{stderr}</pre>
                </div>
              )}

              {/* Empty / Initial Idle state */}
              {!stdout && !stderr && !compileOutput && !isRunning && (
                <div className="text-muted text-xs py-12 text-center">
                  <div className="mb-2">💻 Ready to execute program.</div>
                  <p className="text-[11px] text-slate-500">
                    Press <strong className="text-slate-300">Run Code (Ctrl+Enter)</strong> to compile and execute via the real container engine.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pane 2: Source Code Editor (Expanded in Center) */}
        <div className="editor-panel glass-panel">
          <div className="panel-header">
            <div className="panel-title flex items-center gap-2">
              <Code2 size={16} className="text-primary-accent" />
              <span className="font-mono text-xs">{SAMPLE_PROGRAMS[selectedLang].filename}</span>
              <span className="badge text-[10px] font-mono">{SAMPLE_PROGRAMS[selectedLang].name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted font-mono">{lineCount} lines</span>
              <span className="text-[10px] text-muted font-mono">Tab: 2 spaces</span>
            </div>
          </div>

          <div className="editor-wrapper">
            <div className="line-numbers">
              {lineNumbers.map(n => <div key={n}>{n}</div>)}
            </div>
            <textarea
              ref={textareaRef}
              className="code-textarea"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyDown={handleEditorKeyDown}
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Pane 3 (REPOSITIONED TO RIGHT): File Explorer & Workspace Status */}
        {showExplorer && (
          <aside className="explorer-panel glass-panel">
            <div className="panel-header">
              <div className="panel-title flex items-center gap-1.5">
                <FolderOpen size={14} className="text-primary-accent" />
                <span>Files</span>
              </div>
              <span className="text-[10px] text-muted font-mono uppercase">Workspace</span>
            </div>

            <div className="explorer-files-list p-2 space-y-1">
              <div className="text-[10px] uppercase font-bold text-muted px-2 py-1 tracking-wider">
                Source Files
              </div>
              {Object.entries(SAMPLE_PROGRAMS).map(([key, item]) => {
                const isActive = selectedLang === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectLanguage(key)}
                    className={`explorer-file-item w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                      isActive ? 'active-file' : 'text-muted hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileCode size={14} className={isActive ? 'text-emerald' : 'text-muted'} />
                      <span className="font-mono truncate">{item.filename}</span>
                    </div>
                    <span className="text-[10px] text-muted font-mono">{key.toUpperCase()}</span>
                  </button>
                );
              })}

              <div className="mt-4 pt-3 border-t border-border px-2">
                <div className="text-[10px] text-muted uppercase font-bold mb-2">Runtime Status</div>
                <div className="p-2 rounded bg-slate-900/60 border border-border text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-emerald mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
                    <span>Piston Isolated Sandbox</span>
                  </div>
                  <div className="text-muted text-[10px]">
                    Lang: {SAMPLE_PROGRAMS[selectedLang].pistonLang} ({SAMPLE_PROGRAMS[selectedLang].version})
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Save Snippet Modal */}
      {activeSnippetModal && (
        <div className="modal-overlay" onClick={() => setActiveSnippetModal(false)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Bookmark size={18} className="text-primary" /> Save Code Snippet
              </h3>
              <button className="icon-btn-sm" onClick={() => setActiveSnippetModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveSnippetModal}>
              <div className="mb-4">
                <label className="text-xs text-muted block mb-1">Snippet Title</label>
                <input
                  type="text"
                  placeholder="e.g. Binary Search Tree Insertion"
                  className="devtools-textarea"
                  style={{ padding: '0.65rem 1rem' }}
                  value={snippetTitle}
                  onChange={(e) => setSnippetTitle(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setActiveSnippetModal(false)}>Cancel</button>
                <button type="submit" className="primary">
                  {saveSuccess ? 'Saved ✓' : 'Save to Library'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeLab;
