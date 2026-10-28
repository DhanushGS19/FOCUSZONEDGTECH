import React, { useState } from 'react';
import { 
  GitBranch, GitCommit, GitMerge, GitPullRequest, Terminal, 
  HelpCircle, Check, Copy, ArrowRight, RotateCcw, AlertTriangle, 
  BookOpen, Sparkles, CheckCircle2, ChevronRight, Play 
} from 'lucide-react';
import './GitTools.css';

const GIT_COMMANDS_DATA = [
  {
    category: 'Setup & Config',
    commands: [
      { cmd: 'git init', desc: 'Initialize a new local Git repository in current directory', example: 'git init' },
      { cmd: 'git clone <url>', desc: 'Clone a remote repository to your local machine', example: 'git clone https://github.com/user/repo.git' },
      { cmd: 'git config --global user.name "Your Name"', desc: 'Set global username for all commits', example: 'git config --global user.name "Alex Rivera"' },
      { cmd: 'git config --global user.email "email@domain.com"', desc: 'Set global email for all commits', example: 'git config --global user.email "alex@tech.edu"' }
    ]
  },
  {
    category: 'Basic Snapshotting',
    commands: [
      { cmd: 'git status', desc: 'Show working tree status (untracked, modified, staged files)', example: 'git status' },
      { cmd: 'git add <file>', desc: 'Add file contents to the staging index', example: 'git add index.js' },
      { cmd: 'git add .', desc: 'Stage all modified and new files in the working directory', example: 'git add .' },
      { cmd: 'git commit -m "<msg>"', desc: 'Record staged changes in repository history', example: 'git commit -m "feat: add user authentication"' },
      { cmd: 'git diff', desc: 'Show file changes between working directory and staging index', example: 'git diff' }
    ]
  },
  {
    category: 'Branching & Merging',
    commands: [
      { cmd: 'git branch', desc: 'List all local branches (highlighting active branch)', example: 'git branch' },
      { cmd: 'git branch <branch-name>', desc: 'Create a new branch at current HEAD commit', example: 'git branch feature-auth' },
      { cmd: 'git switch <branch-name>', desc: 'Switch to specified branch (modern syntax)', example: 'git switch feature-auth' },
      { cmd: 'git checkout -b <branch>', desc: 'Create a new branch and switch to it immediately', example: 'git checkout -b feature-payment' },
      { cmd: 'git merge <branch>', desc: 'Merge specified branch into the currently checked-out branch', example: 'git merge feature-auth' },
      { cmd: 'git branch -d <branch>', desc: 'Safely delete a branch that has already been merged', example: 'git branch -d feature-auth' }
    ]
  },
  {
    category: 'Remote & Collaboration',
    commands: [
      { cmd: 'git remote add origin <url>', desc: 'Link a local repository to a remote GitHub URL', example: 'git remote add origin https://github.com/user/project.git' },
      { cmd: 'git push -u origin <branch>', desc: 'Upload local commits to remote repository and set upstream', example: 'git push -u origin main' },
      { cmd: 'git pull origin <branch>', desc: 'Fetch and immediately integrate changes from remote branch', example: 'git pull origin main' },
      { cmd: 'git fetch origin', desc: 'Download objects and refs from another repository without merging', example: 'git fetch origin' }
    ]
  },
  {
    category: 'Undo & Stashing',
    commands: [
      { cmd: 'git stash', desc: 'Temporarily shelve dirty working directory changes', example: 'git stash' },
      { cmd: 'git stash pop', desc: 'Reapply shelved stashed changes and drop from stash stack', example: 'git stash pop' },
      { cmd: 'git log --oneline --graph', desc: 'Display pretty single-line commit history with ASCII tree', example: 'git log --oneline --graph' },
      { cmd: 'git revert <commit-sha>', desc: 'Create a new commit that inverts the effects of an earlier commit', example: 'git revert 7f8a9b2' },
      { cmd: 'git reset --soft HEAD~1', desc: 'Undo last commit but keep changes staged', example: 'git reset --soft HEAD~1' }
    ]
  }
];

export const GitTools = () => {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'conflict' | 'reference' | 'exercises' | 'workflows'
  
  // Interactive Simulator State
  const [branches, setBranches] = useState({
    main: [
      { sha: 'a1b2c3d', message: 'Initial repository setup', author: 'Alex', branch: 'main' },
      { sha: 'e4f5a6b', message: 'Add package.json and config', author: 'Alex', branch: 'main' }
    ],
    feature: [
      { sha: 'a1b2c3d', message: 'Initial repository setup', author: 'Alex', branch: 'main' },
      { sha: 'e4f5a6b', message: 'Add package.json and config', author: 'Alex', branch: 'main' },
      { sha: '8c9d0e1', message: 'Implement dark mode toggle', author: 'Alex', branch: 'feature' }
    ]
  });
  const [activeBranch, setActiveBranch] = useState('main');
  const [newCommitMsg, setNewCommitMsg] = useState('');
  const [newBranchInput, setNewBranchInput] = useState('');
  const [simLog, setSimLog] = useState(['Initialized Git visualizer on branch: main']);

  // Merge Conflict Simulator State
  const [conflictResolved, setConflictResolved] = useState(false);
  const [resolvedContent, setResolvedContent] = useState('');
  const [conflictStep, setConflictStep] = useState('unresolved'); // 'unresolved' | 'resolved'

  // Exercises State
  const [exerciseStep, setExerciseStep] = useState(1);
  const [exerciseTerminalInput, setExerciseTerminalInput] = useState('');
  const [exerciseFeedback, setExerciseFeedback] = useState(null);

  // Command Reference Search
  const [cmdSearch, setCmdSearch] = useState('');
  const [copiedCmd, setCopiedCmd] = useState(null);

  const handleCopyCmd = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  // Simulator actions
  const handleSimCommit = (e) => {
    e?.preventDefault();
    if (!newCommitMsg.trim()) return;
    const newSha = Math.random().toString(16).substring(2, 9);
    const newCommit = {
      sha: newSha,
      message: newCommitMsg.trim(),
      author: 'Alex',
      branch: activeBranch
    };

    setBranches(prev => ({
      ...prev,
      [activeBranch]: [...(prev[activeBranch] || []), newCommit]
    }));
    setSimLog(prev => [`[${activeBranch}] commit ${newSha}: ${newCommitMsg.trim()}`, ...prev.slice(0, 10)]);
    setNewCommitMsg('');
  };

  const handleCreateBranch = (e) => {
    e?.preventDefault();
    const branchName = newBranchInput.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    if (!branchName || branches[branchName]) return;

    setBranches(prev => ({
      ...prev,
      [branchName]: [...(prev[activeBranch] || [])]
    }));
    setSimLog(prev => [`Created branch '${branchName}' pointing to HEAD of '${activeBranch}'`, ...prev.slice(0, 10)]);
    setActiveBranch(branchName);
    setNewBranchInput('');
  };

  const handleSwitchBranch = (b) => {
    setActiveBranch(b);
    setSimLog(prev => [`Switched to branch '${b}'`, ...prev.slice(0, 10)]);
  };

  const handleSimMerge = (sourceBranch) => {
    if (sourceBranch === activeBranch) return;
    const sourceCommits = branches[sourceBranch] || [];
    const targetCommits = branches[activeBranch] || [];
    
    // Find unique commits from source
    const targetShas = new Set(targetCommits.map(c => c.sha));
    const missingCommits = sourceCommits.filter(c => !targetShas.has(c.sha));

    if (missingCommits.length === 0) {
      setSimLog(prev => [`Already up to date. Nothing to merge from '${sourceBranch}' into '${activeBranch}'.`, ...prev.slice(0, 10)]);
      return;
    }

    const mergeSha = Math.random().toString(16).substring(2, 9);
    const mergeCommit = {
      sha: mergeSha,
      message: `Merge branch '${sourceBranch}' into ${activeBranch}`,
      author: 'Alex',
      branch: activeBranch
    };

    setBranches(prev => ({
      ...prev,
      [activeBranch]: [...targetCommits, ...missingCommits, mergeCommit]
    }));
    setSimLog(prev => [`Merged branch '${sourceBranch}' into '${activeBranch}' (Merge commit: ${mergeSha})`, ...prev.slice(0, 10)]);
  };

  const handleResetSim = () => {
    setBranches({
      main: [
        { sha: 'a1b2c3d', message: 'Initial repository setup', author: 'Alex', branch: 'main' },
        { sha: 'e4f5a6b', message: 'Add package.json and config', author: 'Alex', branch: 'main' }
      ],
      feature: [
        { sha: 'a1b2c3d', message: 'Initial repository setup', author: 'Alex', branch: 'main' },
        { sha: 'e4f5a6b', message: 'Add package.json and config', author: 'Alex', branch: 'main' },
        { sha: '8c9d0e1', message: 'Implement dark mode toggle', author: 'Alex', branch: 'feature' }
      ]
    });
    setActiveBranch('main');
    setSimLog(['Reset simulation to initial state.']);
  };

  // Conflict demonstration actions
  const conflictBase = `def calculate_pricing(item):
<<<<<<< HEAD (main branch)
    # Applied tax calculation
    tax_rate = 0.08
    return item.price * (1 + tax_rate)
=======
    # Applied promotional student discount
    discount_rate = 0.15
    return item.price * (1 - discount_rate)
>>>>>>> feature-student-discount`;

  const handleResolveConflict = (strategy) => {
    let code = '';
    if (strategy === 'current') {
      code = `def calculate_pricing(item):\n    # Applied tax calculation\n    tax_rate = 0.08\n    return item.price * (1 + tax_rate)`;
    } else if (strategy === 'incoming') {
      code = `def calculate_pricing(item):\n    # Applied promotional student discount\n    discount_rate = 0.15\n    return item.price * (1 - discount_rate)`;
    } else {
      code = `def calculate_pricing(item):\n    # Applied student discount then sales tax\n    discounted = item.price * (1 - 0.15)\n    return discounted * (1 + 0.08)`;
    }
    setResolvedContent(code);
    setConflictStep('resolved');
  };

  // Guided Exercises Runner
  const handleExecuteExerciseCmd = (e) => {
    e.preventDefault();
    const input = exerciseTerminalInput.trim();
    if (!input) return;

    if (exerciseStep === 1) {
      if (input === 'git init') {
        setExerciseFeedback({ success: true, message: 'Initialized empty Git repository in .git/ ✅' });
        setTimeout(() => { setExerciseStep(2); setExerciseTerminalInput(''); setExerciseFeedback(null); }, 1200);
      } else {
        setExerciseFeedback({ success: false, message: 'Try again: Type "git init" to create the repository.' });
      }
    } else if (exerciseStep === 2) {
      if (input === 'git branch feature-login' || input === 'git checkout -b feature-login' || input === 'git switch -c feature-login') {
        setExerciseFeedback({ success: true, message: 'Branch "feature-login" created! ✅' });
        setTimeout(() => { setExerciseStep(3); setExerciseTerminalInput(''); setExerciseFeedback(null); }, 1200);
      } else {
        setExerciseFeedback({ success: false, message: 'Try: "git branch feature-login" or "git checkout -b feature-login"' });
      }
    } else if (exerciseStep === 3) {
      if (input.startsWith('git commit -m') || input.startsWith('git commit')) {
        setExerciseFeedback({ success: true, message: 'Commit recorded on feature branch! ✅' });
        setTimeout(() => { setExerciseStep(4); setExerciseTerminalInput(''); setExerciseFeedback(null); }, 1200);
      } else {
        setExerciseFeedback({ success: false, message: 'Try: git commit -m "feat: login form"' });
      }
    } else if (exerciseStep === 4) {
      if (input === 'git merge feature-login' || input === 'git merge') {
        setExerciseFeedback({ success: true, message: '🎉 Fantastic! You completed the Git Branching & Merging drill!' });
      } else {
        setExerciseFeedback({ success: false, message: 'Try: git merge feature-login' });
      }
    }
  };

  return (
    <div className="git-tools-container fade-in">
      {/* Sub-nav tabs */}
      <div className="git-tabs-header flex gap-2 mb-6 border-b border-white-10 pb-3 flex-wrap">
        <button 
          className={`filter-pill ${activeTab === 'simulator' ? 'active' : ''}`}
          onClick={() => setActiveTab('simulator')}
        >
          <GitBranch size={15} /> Branch & Commit Visualizer
        </button>
        <button 
          className={`filter-pill ${activeTab === 'conflict' ? 'active' : ''}`}
          onClick={() => setActiveTab('conflict')}
        >
          <AlertTriangle size={15} /> Merge Conflict Studio
        </button>
        <button 
          className={`filter-pill ${activeTab === 'reference' ? 'active' : ''}`}
          onClick={() => setActiveTab('reference')}
        >
          <BookOpen size={15} /> Git Command Reference
        </button>
        <button 
          className={`filter-pill ${activeTab === 'exercises' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercises')}
        >
          <Terminal size={15} /> Interactive Drills
        </button>
        <button 
          className={`filter-pill ${activeTab === 'workflows' ? 'active' : ''}`}
          onClick={() => setActiveTab('workflows')}
        >
          <GitPullRequest size={15} /> Workflow Architectures
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: BRANCHING & COMMIT VISUALIZER                           */}
      {/* ============================================================== */}
      {activeTab === 'simulator' && (
        <div className="git-simulator-grid grid grid-cols-12 gap-6 fade-in">
          {/* Controls & Commands */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            <div className="glass-panel p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Terminal size={16} className="text-cyan" /> Git Action Panel
                </h3>
                <button onClick={handleResetSim} className="btn-secondary text-xs p-1 flex items-center gap-1">
                  <RotateCcw size={12} /> Reset
                </button>
              </div>

              {/* Active Branch Indicator */}
              <div className="mb-4 p-2 bg-charcoal rounded border border-white-10 flex justify-between items-center">
                <span className="text-xs text-muted">Active Branch (HEAD):</span>
                <span className="badge cyan font-mono text-xs">{activeBranch}</span>
              </div>

              {/* Branch Switcher */}
              <div className="mb-4">
                <label className="text-xs text-muted block mb-1">Switch Branch (git switch / checkout):</label>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(branches).map(b => (
                    <button
                      key={b}
                      onClick={() => handleSwitchBranch(b)}
                      className={`filter-pill text-xs ${activeBranch === b ? 'active' : ''}`}
                    >
                      <GitBranch size={12} /> {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Make a Commit */}
              <form onSubmit={handleSimCommit} className="mb-4">
                <label className="text-xs text-muted block mb-1">Make a Commit (git commit -m):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Commit message..."
                    value={newCommitMsg}
                    onChange={(e) => setNewCommitMsg(e.target.value)}
                    className="p-2 text-xs bg-dark rounded border border-white-10 flex-1"
                  />
                  <button type="submit" className="btn-primary text-xs px-3">
                    Commit
                  </button>
                </div>
              </form>

              {/* Create New Branch */}
              <form onSubmit={handleCreateBranch} className="mb-4">
                <label className="text-xs text-muted block mb-1">Create Branch (git branch):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="new-branch-name..."
                    value={newBranchInput}
                    onChange={(e) => setNewBranchInput(e.target.value)}
                    className="p-2 text-xs bg-dark rounded border border-white-10 flex-1"
                  />
                  <button type="submit" className="btn-secondary text-xs px-3">
                    + Branch
                  </button>
                </div>
              </form>

              {/* Merge into active branch */}
              <div>
                <label className="text-xs text-muted block mb-1">Merge into {activeBranch} (git merge):</label>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(branches).filter(b => b !== activeBranch).map(b => (
                    <button
                      key={b}
                      onClick={() => handleSimMerge(b)}
                      className="btn-secondary text-xs px-2 py-1 flex items-center gap-1"
                    >
                      <GitMerge size={12} /> Merge '{b}'
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal Audit Log */}
            <div className="glass-panel p-3">
              <span className="text-xs text-muted font-bold block mb-2 font-mono">SIMULATED CLI LOG</span>
              <div className="font-mono text-xs text-muted space-y-1 bg-charcoal p-2 rounded max-h-36 overflow-y-auto">
                {simLog.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-cyan">$</span> {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Commit Graph Canvas */}
          <div className="col-span-12 lg:col-span-8">
            <div className="glass-panel p-5 h-full">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <GitCommit size={18} className="text-primary" /> Visual Commit History Graph
                  </h3>
                  <p className="text-xs text-muted">
                    Interactive directed acyclic graph (DAG) representing repository commits, branch pointers, and HEAD
                  </p>
                </div>
                <span className="badge font-mono text-xs">{branches[activeBranch]?.length || 0} Commits</span>
              </div>

              {/* Graph Visualizer */}
              <div className="commit-graph-view p-4 rounded bg-dark border border-white-10 min-h-[380px] relative overflow-x-auto">
                {Object.keys(branches).map((branchName, bIdx) => {
                  const commitList = branches[branchName] || [];
                  const isCurrent = branchName === activeBranch;

                  return (
                    <div key={branchName} className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`badge ${isCurrent ? 'cyan' : ''} text-xs font-mono`}>
                          <GitBranch size={12} className="inline mr-1" /> {branchName}
                        </span>
                        {isCurrent && <span className="text-xs text-cyan font-bold">← HEAD</span>}
                      </div>

                      {/* Commit Chain Nodes */}
                      <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        {commitList.map((c, i) => (
                          <React.Fragment key={c.sha + i}>
                            <div className={`commit-node-card p-3 rounded border ${isCurrent ? 'border-primary' : 'border-white-10'} bg-charcoal min-w-[170px]`}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-mono text-xs text-cyan font-bold">{c.sha}</span>
                                <span className="text-muted text-[10px]">{c.author}</span>
                              </div>
                              <p className="text-xs text-white line-clamp-2" title={c.message}>
                                {c.message}
                              </p>
                            </div>
                            {i < commitList.length - 1 && (
                              <ArrowRight size={14} className="text-muted shrink-0" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: MERGE CONFLICT STUDIO                                   */}
      {/* ============================================================== */}
      {activeTab === 'conflict' && (
        <div className="conflict-studio glass-panel p-6 fade-in">
          <div className="mb-6 flex justify-between items-start flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge" style={{ borderColor: 'var(--amber)', color: 'var(--amber)' }}>Merge Conflict</span>
                <span className="badge">pricing.py</span>
              </div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber" /> Interactive Merge Conflict Resolver
              </h2>
              <p className="text-xs text-muted">
                Simulated conflict occurring when merging <code className="text-cyan">feature-student-discount</code> into <code className="text-primary">main</code>.
              </p>
            </div>

            {conflictStep === 'resolved' && (
              <button 
                onClick={() => setConflictStep('unresolved')} 
                className="btn-secondary text-xs flex items-center gap-1"
              >
                <RotateCcw size={12} /> Reset Conflict
              </button>
            )}
          </div>

          {conflictStep === 'unresolved' ? (
            <div>
              {/* Conflict Explanation Banner */}
              <div className="p-3 bg-amber-500-10 border border-amber rounded mb-4 text-xs leading-relaxed">
                <strong>Git Conflict Markers Explained:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> represents changes from your current branch (e.g. <code>main</code>).</li>
                  <li><code>=======</code> divides the conflicting blocks of code.</li>
                  <li><code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-...</code> represents the incoming changes from the branch being merged.</li>
                </ul>
              </div>

              {/* Code Conflict Box */}
              <div className="code-diff-view bg-charcoal p-4 rounded border border-white-10 font-mono text-xs mb-4 overflow-x-auto">
                <pre className="text-muted"><code>{conflictBase}</code></pre>
              </div>

              {/* Action Buttons to Resolve */}
              <div className="flex gap-3 flex-wrap">
                <button 
                  onClick={() => handleResolveConflict('current')}
                  className="btn-secondary text-xs py-2 px-3 border-cyan"
                >
                  Accept Current Change (Keep Tax Only)
                </button>
                <button 
                  onClick={() => handleResolveConflict('incoming')}
                  className="btn-secondary text-xs py-2 px-3 border-primary"
                >
                  Accept Incoming Change (Keep Discount Only)
                </button>
                <button 
                  onClick={() => handleResolveConflict('both')}
                  className="btn-primary text-xs py-2 px-3 flex items-center gap-1"
                >
                  <Sparkles size={14} /> Accept Both & Combine (Apply Discount + Tax)
                </button>
              </div>
            </div>
          ) : (
            <div className="resolved-view bg-charcoal p-5 rounded border border-green-500 fade-in">
              <div className="flex items-center gap-2 text-green-400 font-bold mb-3 text-sm">
                <CheckCircle2 size={18} /> Conflict Successfully Resolved!
              </div>
              <p className="text-xs text-muted mb-3 font-mono">
                Clean resolved file ready to stage with <code>git add pricing.py</code> and commit:
              </p>
              <pre className="p-3 bg-dark rounded border border-white-10 text-xs font-mono text-cyan mb-4">
                <code>{resolvedContent}</code>
              </pre>
              <button 
                onClick={() => alert("Merge committed: git commit -m 'Merge branch feature-student-discount' completed!")}
                className="btn-primary text-xs flex items-center gap-1"
              >
                <GitCommit size={14} /> Commit Resolved Merge
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: SEARCHABLE GIT COMMAND REFERENCE                        */}
      {/* ============================================================== */}
      {activeTab === 'reference' && (
        <div className="git-reference-view fade-in">
          {/* Search bar */}
          <div className="mb-6 max-w-md">
            <input
              type="text"
              placeholder="Search Git commands (e.g. branch, stash, reset, clone)..."
              value={cmdSearch}
              onChange={(e) => setCmdSearch(e.target.value)}
              className="p-3 text-xs bg-dark rounded border border-white-10 w-full"
            />
          </div>

          <div className="space-y-6">
            {GIT_COMMANDS_DATA.map((cat, idx) => {
              const filteredCmds = cat.commands.filter(c => 
                !cmdSearch || 
                c.cmd.toLowerCase().includes(cmdSearch.toLowerCase()) || 
                c.desc.toLowerCase().includes(cmdSearch.toLowerCase())
              );

              if (filteredCmds.length === 0) return null;

              return (
                <div key={idx} className="glass-panel p-5">
                  <h3 className="text-sm font-bold text-cyan mb-3 uppercase tracking-wider">
                    {cat.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredCmds.map((c, i) => (
                      <div key={i} className="p-3 bg-charcoal rounded border border-white-10 flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <code className="text-xs font-bold text-white block mb-1 font-mono">
                            {c.cmd}
                          </code>
                          <p className="text-xs text-muted mb-2">{c.desc}</p>
                          <span className="text-[11px] text-cyan font-mono bg-dark px-2 py-0.5 rounded">
                            {c.example}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyCmd(c.example)}
                          className="btn-secondary text-xs p-1.5 shrink-0"
                          title="Copy example command"
                        >
                          {copiedCmd === c.example ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: INTERACTIVE GIT EXERCISES                               */}
      {/* ============================================================== */}
      {activeTab === 'exercises' && (
        <div className="git-exercises-view glass-panel p-6 fade-in max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="badge cyan mb-1">Step {exerciseStep} of 4</span>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Terminal size={20} className="text-cyan" /> Guided Git Terminal Drill
              </h2>
            </div>
            <button 
              onClick={() => { setExerciseStep(1); setExerciseFeedback(null); setExerciseTerminalInput(''); }}
              className="btn-secondary text-xs flex items-center gap-1"
            >
              <RotateCcw size={12} /> Reset Drill
            </button>
          </div>

          {/* Prompt card */}
          <div className="p-4 bg-charcoal rounded border border-white-10 mb-5">
            {exerciseStep === 1 && (
              <div>
                <h4 className="font-bold text-sm text-white mb-1">Task 1: Initialize Git Repository</h4>
                <p className="text-xs text-muted mb-2">
                  Create a new Git repository in this current directory so we can begin tracking project source code.
                </p>
                <span className="text-xs text-cyan font-mono">Target Command: git init</span>
              </div>
            )}
            {exerciseStep === 2 && (
              <div>
                <h4 className="font-bold text-sm text-white mb-1">Task 2: Create a Feature Branch</h4>
                <p className="text-xs text-muted mb-2">
                  Never work directly on main! Create a new branch named <code className="text-cyan">feature-login</code> to isolate changes.
                </p>
                <span className="text-xs text-cyan font-mono">Target Command: git branch feature-login</span>
              </div>
            )}
            {exerciseStep === 3 && (
              <div>
                <h4 className="font-bold text-sm text-white mb-1">Task 3: Commit Feature Changes</h4>
                <p className="text-xs text-muted mb-2">
                  Save your staged changes to the commit history with a clear message.
                </p>
                <span className="text-xs text-cyan font-mono">Target Command: git commit -m "feat: login form"</span>
              </div>
            )}
            {exerciseStep === 4 && (
              <div>
                <h4 className="font-bold text-sm text-white mb-1">Task 4: Merge Feature into Main</h4>
                <p className="text-xs text-muted mb-2">
                  Integrate your completed <code className="text-cyan">feature-login</code> branch into <code className="text-primary">main</code>.
                </p>
                <span className="text-xs text-cyan font-mono">Target Command: git merge feature-login</span>
              </div>
            )}
          </div>

          {/* Interactive Shell Terminal */}
          <form onSubmit={handleExecuteExerciseCmd} className="p-4 bg-dark rounded border border-white-10 font-mono text-xs">
            <div className="text-muted mb-2">$ techverse-terminal:~/project</div>
            <div className="flex items-center gap-2">
              <span className="text-cyan font-bold">$</span>
              <input
                type="text"
                value={exerciseTerminalInput}
                onChange={(e) => setExerciseTerminalInput(e.target.value)}
                placeholder="Type git command here..."
                className="bg-transparent border-none outline-none text-white flex-1 font-mono text-xs"
                autoFocus
              />
              <button type="submit" className="btn-primary text-xs px-3 py-1">
                Execute
              </button>
            </div>

            {exerciseFeedback && (
              <div className={`mt-3 pt-2 border-t border-white-10 ${exerciseFeedback.success ? 'text-green-400' : 'text-amber-400'}`}>
                {exerciseFeedback.message}
              </div>
            )}
          </form>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: GIT WORKFLOW TUTORIALS                                  */}
      {/* ============================================================== */}
      {activeTab === 'workflows' && (
        <div className="git-workflows-view grid grid-cols-1 md:grid-cols-3 gap-6 fade-in">
          {/* Workflow 1 */}
          <div className="glass-panel p-5 flex flex-col justify-between">
            <div>
              <div className="badge cyan mb-2">Industry Standard</div>
              <h3 className="font-bold text-base mb-2">Feature Branch Workflow</h3>
              <p className="text-xs text-muted mb-4 leading-relaxed">
                All feature development takes place in dedicated branches rather than <code>main</code>. Developers open Pull Requests (PRs) for code review before merging.
              </p>
              <div className="p-3 bg-charcoal rounded text-xs font-mono text-muted mb-4 space-y-1">
                <div>1. git switch -c feat/search</div>
                <div>2. git commit -m "add index"</div>
                <div>3. git push -u origin feat/search</div>
                <div>4. Open GitHub Pull Request</div>
              </div>
            </div>
            <div className="text-xs text-cyan font-semibold">Best for: Agile sprints & startups</div>
          </div>

          {/* Workflow 2 */}
          <div className="glass-panel p-5 flex flex-col justify-between">
            <div>
              <div className="badge mb-2">Enterprise</div>
              <h3 className="font-bold text-base mb-2">Gitflow Workflow</h3>
              <p className="text-xs text-muted mb-4 leading-relaxed">
                Uses strict branching structure: <code>main</code> (production), <code>develop</code> (integration), <code>release/*</code>, and <code>hotfix/*</code> branches for scheduled deployments.
              </p>
              <div className="p-3 bg-charcoal rounded text-xs font-mono text-muted mb-4 space-y-1">
                <div>• main (Strictly tagged releases)</div>
                <div>• develop (Nightly builds)</div>
                <div>• release/v2.1 (Staging QA)</div>
                <div>• hotfix/auth-leak (Urgent patch)</div>
              </div>
            </div>
            <div className="text-xs text-primary font-semibold">Best for: Scheduled release cycles</div>
          </div>

          {/* Workflow 3 */}
          <div className="glass-panel p-5 flex flex-col justify-between">
            <div>
              <div className="badge mb-2">Open Source</div>
              <h3 className="font-bold text-base mb-2">Fork & Pull Request</h3>
              <p className="text-xs text-muted mb-4 leading-relaxed">
                Contributors fork the upstream repository to their own GitHub account, push changes without write access to upstream, and file a cross-repository Pull Request.
              </p>
              <div className="p-3 bg-charcoal rounded text-xs font-mono text-muted mb-4 space-y-1">
                <div>1. Fork on GitHub</div>
                <div>2. git clone &lt;fork_url&gt;</div>
                <div>3. git remote add upstream &lt;repo&gt;</div>
                <div>4. Submit Pull Request to upstream</div>
              </div>
            </div>
            <div className="text-xs text-green-400 font-semibold">Best for: Public GitHub contributions</div>
          </div>
        </div>
      )}
    </div>
  );
};
