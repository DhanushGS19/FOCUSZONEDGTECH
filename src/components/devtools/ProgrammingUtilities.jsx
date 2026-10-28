import React, { useState, useEffect } from 'react';
import { 
  FileJson, Binary, Globe, Regex, GitCompare, Hash, Clock, 
  Type, Bookmark, Code2, Copy, Check, AlertCircle, Plus, Trash2, ArrowRight 
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const ProgrammingUtilities = () => {
  const { addXp, recentSnippets, saveSnippet } = useUser();
  const [activeSubTool, setActiveSubTool] = useState('json');
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // 1. JSON Formatter
  const [jsonInput, setJsonInput] = useState('{\n  "project": "Techverse",\n  "status": "production",\n  "version": 2.0,\n  "features": ["Code Lab", "Flow AI", "Dev Tools", "Practice Arena"]\n}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState(null);

  const formatJson = (indent = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, indent));
      setJsonError(null);
      addXp(10);
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
      setJsonError(null);
      addXp(10);
    } catch (err) {
      setJsonError(err.message);
    }
  };

  // 2. Base64 & URL
  const [codecInput, setCodecInput] = useState('Welcome to Techverse Developer Suite!');
  const [codecOutput, setCodecOutput] = useState('');
  const [codecMode, setCodecMode] = useState('b64_encode');

  const processCodec = (mode) => {
    setCodecMode(mode);
    try {
      if (mode === 'b64_encode') {
        setCodecOutput(btoa(unescape(encodeURIComponent(codecInput))));
      } else if (mode === 'b64_decode') {
        setCodecOutput(decodeURIComponent(escape(atob(codecInput.trim()))));
      } else if (mode === 'url_encode') {
        setCodecOutput(encodeURIComponent(codecInput));
      } else if (mode === 'url_decode') {
        setCodecOutput(decodeURIComponent(codecInput));
      }
      addXp(10);
    } catch (err) {
      setCodecOutput(`Error processing input: ${err.message}`);
    }
  };

  // 3. Regex Tester
  const [regexPattern, setRegexPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexText, setRegexText] = useState('Contact developers at team@techverse.io or alex.rivera@university.edu for queries.');

  let regexMatches = [];
  let regexError = null;
  if (regexPattern) {
    try {
      const re = new RegExp(regexPattern, regexFlags);
      const matches = Array.from(regexText.matchAll(re));
      regexMatches = matches.map(m => m[0]);
    } catch (err) {
      regexError = err.message;
    }
  }

  // 4. Text Diff Checker
  const [diffOriginal, setDiffOriginal] = useState('function calculateTotal(items) {\n  let sum = 0;\n  for (let i = 0; i < items.length; i++) {\n    sum += items[i].price;\n  }\n  return sum;\n}');
  const [diffModified, setDiffModified] = useState('function calculateTotal(items) {\n  if (!items || items.length === 0) return 0;\n  return items.reduce((acc, item) => acc + item.price, 0);\n}');
  const [diffResult, setDiffResult] = useState([]);

  const computeDiff = () => {
    const origLines = diffOriginal.split('\n');
    const modLines = diffModified.split('\n');
    const result = [];
    const maxLen = Math.max(origLines.length, modLines.length);

    for (let i = 0; i < maxLen; i++) {
      const o = origLines[i];
      const m = modLines[i];
      if (o === undefined) {
        result.push({ type: 'added', line: m, num: i + 1 });
      } else if (m === undefined) {
        result.push({ type: 'removed', line: o, num: i + 1 });
      } else if (o === m) {
        result.push({ type: 'unchanged', line: o, num: i + 1 });
      } else {
        result.push({ type: 'removed', line: o, num: i + 1 });
        result.push({ type: 'added', line: m, num: i + 1 });
      }
    }
    setDiffResult(result);
    addXp(15);
  };

  useEffect(() => {
    computeDiff();
  }, [diffOriginal, diffModified]);

  // 5. Number-Base Converter
  const [decVal, setDecVal] = useState('255');
  const [binVal, setBinVal] = useState('11111111');
  const [hexVal, setHexVal] = useState('ff');
  const [octVal, setOctVal] = useState('377');

  const updateFromDec = (val) => {
    setDecVal(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setBinVal(num.toString(2));
      setHexVal(num.toString(16));
      setOctVal(num.toString(8));
    }
  };

  const updateFromBin = (val) => {
    setBinVal(val);
    const num = parseInt(val, 2);
    if (!isNaN(num)) {
      setDecVal(num.toString(10));
      setHexVal(num.toString(16));
      setOctVal(num.toString(8));
    }
  };

  const updateFromHex = (val) => {
    setHexVal(val);
    const num = parseInt(val, 16);
    if (!isNaN(num)) {
      setDecVal(num.toString(10));
      setBinVal(num.toString(2));
      setOctVal(num.toString(8));
    }
  };

  // 6. Timestamp Converter
  const [epochInput, setEpochInput] = useState(String(Date.now()));
  const [dateResult, setDateResult] = useState({ iso: '', utc: '', local: '' });

  useEffect(() => {
    try {
      let ms = Number(epochInput);
      if (epochInput.length === 10) ms *= 1000; // handle seconds
      const d = new Date(ms);
      if (!isNaN(d.getTime())) {
        setDateResult({
          iso: d.toISOString(),
          utc: d.toUTCString(),
          local: d.toLocaleString()
        });
      }
    } catch {}
  }, [epochInput]);

  // 7. Word & Character Counter
  const [textInput, setTextInput] = useState("Techverse is an AI-powered tech learning and developer platform. It provides students with interactive curricula, real code compilation, and developer tools.");
  const charCount = textInput.length;
  const charNoSpace = textInput.replace(/\s+/g, '').length;
  const wordCount = textInput.trim() ? textInput.trim().split(/\s+/).length : 0;
  const sentenceCount = textInput.trim() ? (textInput.match(/[.!?]+(\s|$)/g) || []).length + 1 : 0;
  const readingTime = Math.ceil(wordCount / 200);

  // 8. Code Formatter / Indenter
  const [formatterInput, setFormatterInput] = useState('const user={name:"Alex",roles:["admin","developer"],active:true};function getStatus(){return user.active?"Active":"Offline";}');
  const [formatterOutput, setFormatterOutput] = useState('');

  const formatCodeSimple = () => {
    try {
      // Basic aesthetic indenter for JavaScript / JSON
      let formatted = formatterInput
        .replace(/\{/g, ' {\n  ')
        .replace(/\}/g, '\n}\n')
        .replace(/;/g, ';\n')
        .replace(/,/g, ', ');
      setFormatterOutput(formatted.trim());
      addXp(10);
    } catch (e) {
      setFormatterOutput(formatterInput);
    }
  };

  return (
    <div className="programming-utilities-container">
      {/* Subtool Tabs */}
      <div className="subtool-pills-bar flex gap-2 flex-wrap mb-6">
        {[
          { id: 'json', label: 'JSON Formatter', icon: FileJson },
          { id: 'codec', label: 'Base64 & URL', icon: Binary },
          { id: 'regex', label: 'RegEx Tester', icon: Regex },
          { id: 'diff', label: 'Text Diff Checker', icon: GitCompare },
          { id: 'bases', label: 'Number-Base Converter', icon: Hash },
          { id: 'timestamp', label: 'Timestamp Converter', icon: Clock },
          { id: 'counter', label: 'Word & Char Counter', icon: Type },
          { id: 'snippets', label: 'Snippet Library', icon: Bookmark },
          { id: 'formatter', label: 'Code Formatter', icon: Code2 }
        ].map(tool => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              className={`filter-pill text-xs flex items-center gap-1 ${activeSubTool === tool.id ? 'active' : ''}`}
              onClick={() => setActiveSubTool(tool.id)}
            >
              <Icon size={14} />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. JSON Formatter */}
      {activeSubTool === 'json' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold">JSON Formatter & Validator</h3>
              <p className="text-xs text-muted">Beautify, inspect syntax trees, validate or minify JSON</p>
            </div>
            <div className="flex gap-2">
              <button className="primary text-xs" onClick={() => formatJson(2)}>Beautify (2 Spaces)</button>
              <button className="outline-btn text-xs" onClick={() => formatJson(4)}>4 Spaces</button>
              <button className="cyan-btn text-xs" onClick={minifyJson}>Minify</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 devtools-split-grid">
            <div>
              <label className="text-xs text-muted block mb-1 font-bold uppercase font-mono">Input JSON</label>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={12}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste raw JSON here..."
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-muted font-bold uppercase font-mono">Formatted JSON Output</label>
                {jsonOutput && (
                  <button className="text-btn text-xs flex items-center gap-1" onClick={() => copyToClipboard(jsonOutput, 'json')}>
                    {copiedKey === 'json' ? <Check size={13} className="text-accent" /> : <Copy size={13} />} Copy
                  </button>
                )}
              </div>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={12}
                value={jsonOutput}
                readOnly
                placeholder="Formatted result will render here..."
              />
            </div>
          </div>

          {jsonError && (
            <div className="mt-4 p-3 glass-panel text-danger flex items-center gap-2 text-xs" style={{ background: 'rgba(239, 68, 68, 0.12)' }}>
              <AlertCircle size={16} /> <strong>Syntax Error:</strong> {jsonError}
            </div>
          )}
        </div>
      )}

      {/* 2. Base64 & URL */}
      {activeSubTool === 'codec' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold">Base64 & URL Encoder / Decoder</h3>
              <p className="text-xs text-muted">UTF-8 safe Base64 token generation and URL string processing</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className={codecMode === 'b64_encode' ? 'primary text-xs' : 'outline-btn text-xs'} onClick={() => processCodec('b64_encode')}>
                Base64 Encode
              </button>
              <button className={codecMode === 'b64_decode' ? 'primary text-xs' : 'outline-btn text-xs'} onClick={() => processCodec('b64_decode')}>
                Base64 Decode
              </button>
              <button className={codecMode === 'url_encode' ? 'cyan-btn text-xs' : 'outline-btn text-xs'} onClick={() => processCodec('url_encode')}>
                URL Encode
              </button>
              <button className={codecMode === 'url_decode' ? 'cyan-btn text-xs' : 'outline-btn text-xs'} onClick={() => processCodec('url_decode')}>
                URL Decode
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 devtools-split-grid">
            <div>
              <label className="text-xs text-muted block mb-1 font-bold uppercase font-mono">Input Text</label>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={10}
                value={codecInput}
                onChange={(e) => setCodecInput(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-muted font-bold uppercase font-mono">Processed Output</label>
                {codecOutput && (
                  <button className="text-btn text-xs flex items-center gap-1" onClick={() => copyToClipboard(codecOutput, 'codec')}>
                    {copiedKey === 'codec' ? <Check size={13} className="text-accent" /> : <Copy size={13} />} Copy
                  </button>
                )}
              </div>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={10}
                value={codecOutput}
                readOnly
                placeholder="Result will appear here..."
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. RegEx Tester */}
      {activeSubTool === 'regex' && (
        <div className="glass-panel p-6 fade-in">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Regular Expression (RegEx) Tester</h3>
            <p className="text-xs text-muted">Test patterns against sample texts with live match counts and flags</p>
          </div>

          <div className="flex gap-3 mb-4">
            <div style={{ flex: 1 }}>
              <label className="text-xs text-muted block mb-1 font-bold">RegEx Pattern</label>
              <input
                type="text"
                className="devtools-textarea font-mono text-xs"
                style={{ padding: '0.65rem 1rem' }}
                value={regexPattern}
                onChange={(e) => setRegexPattern(e.target.value)}
              />
            </div>
            <div style={{ width: '120px' }}>
              <label className="text-xs text-muted block mb-1 font-bold">Flags</label>
              <input
                type="text"
                className="devtools-textarea font-mono text-xs"
                style={{ padding: '0.65rem 1rem' }}
                value={regexFlags}
                onChange={(e) => setRegexFlags(e.target.value)}
                placeholder="g, i, m"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 devtools-split-grid">
            <div>
              <label className="text-xs text-muted block mb-1 font-bold">Test Subject String</label>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={8}
                value={regexText}
                onChange={(e) => setRegexText(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1 font-bold">
                Matches Found ({regexMatches.length})
              </label>
              <div className="devtools-textarea font-mono text-xs p-3 overflow-y-auto" style={{ minHeight: '170px' }}>
                {regexMatches.length === 0 ? (
                  <span className="text-muted">No matches found for current pattern and flags.</span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {regexMatches.map((m, idx) => (
                      <span key={idx} className="regex-match-pill">{m}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {regexError && (
            <div className="mt-4 p-3 glass-panel text-danger text-xs flex items-center gap-2">
              <AlertCircle size={15} /> RegEx Syntax Error: {regexError}
            </div>
          )}
        </div>
      )}

      {/* 4. Text Diff Checker */}
      {activeSubTool === 'diff' && (
        <div className="glass-panel p-6 fade-in">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Text & Code Comparison (Diff Viewer)</h3>
            <p className="text-xs text-muted">Compare two versions of code or text to identify additions and deletions</p>
          </div>

          <div className="grid grid-cols-2 gap-4 devtools-split-grid mb-4">
            <div>
              <label className="text-xs text-muted block mb-1 font-bold uppercase font-mono">Original Text</label>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={8}
                value={diffOriginal}
                onChange={(e) => setDiffOriginal(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1 font-bold uppercase font-mono">Modified Text</label>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={8}
                value={diffModified}
                onChange={(e) => setDiffModified(e.target.value)}
              />
            </div>
          </div>

          <div className="diff-results-box glass-panel p-4">
            <div className="text-xs text-muted font-bold uppercase mb-2">Line-by-Line Unified Diff:</div>
            <div className="font-mono text-xs flex flex-col gap-1">
              {diffResult.map((res, i) => (
                <div 
                  key={i} 
                  className={`diff-line p-1 rounded ${res.type === 'added' ? 'diff-added' : (res.type === 'removed' ? 'diff-removed' : 'diff-unchanged')}`}
                >
                  <span className="diff-sign font-bold mr-2">
                    {res.type === 'added' ? '+' : (res.type === 'removed' ? '-' : ' ')}
                  </span>
                  <span>{res.line || ' '}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Number-Base Converter */}
      {activeSubTool === 'bases' && (
        <div className="glass-panel p-6 fade-in">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Number-Base Converter</h3>
            <p className="text-xs text-muted">Two-way conversion between Decimal, Binary, Hexadecimal, and Octal</p>
          </div>

          <div className="grid grid-cols-2 gap-4 devtools-split-grid">
            <div className="glass-panel p-4">
              <label className="text-xs text-cyan font-bold block mb-1">Decimal (Base 10)</label>
              <input
                type="text"
                className="devtools-textarea font-mono text-sm"
                value={decVal}
                onChange={(e) => updateFromDec(e.target.value)}
              />
            </div>
            <div className="glass-panel p-4">
              <label className="text-xs text-primary font-bold block mb-1">Binary (Base 2)</label>
              <input
                type="text"
                className="devtools-textarea font-mono text-sm"
                value={binVal}
                onChange={(e) => updateFromBin(e.target.value)}
              />
            </div>
            <div className="glass-panel p-4">
              <label className="text-xs text-accent font-bold block mb-1">Hexadecimal (Base 16)</label>
              <input
                type="text"
                className="devtools-textarea font-mono text-sm"
                value={hexVal}
                onChange={(e) => updateFromHex(e.target.value)}
              />
            </div>
            <div className="glass-panel p-4">
              <label className="text-xs text-warning font-bold block mb-1">Octal (Base 8)</label>
              <input
                type="text"
                className="devtools-textarea font-mono text-sm"
                value={octVal}
                readOnly
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. Timestamp Converter */}
      {activeSubTool === 'timestamp' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-bold">Unix Epoch Timestamp Converter</h3>
              <p className="text-xs text-muted">Convert epoch milliseconds or seconds into ISO 8601, UTC, and local time</p>
            </div>
            <button className="primary text-xs" onClick={() => setEpochInput(String(Date.now()))}>
              Current Timestamp Now
            </button>
          </div>

          <div className="mb-4">
            <label className="text-xs text-muted block mb-1 font-bold">Unix Epoch Timestamp</label>
            <input
              type="text"
              className="devtools-textarea font-mono text-sm"
              value={epochInput}
              onChange={(e) => setEpochInput(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 devtools-split-grid">
            <div className="glass-panel p-4">
              <span className="text-xs text-cyan font-bold block mb-1">ISO 8601 Format</span>
              <div className="font-mono text-xs break-all">{dateResult.iso}</div>
            </div>
            <div className="glass-panel p-4">
              <span className="text-xs text-primary font-bold block mb-1">UTC Time</span>
              <div className="font-mono text-xs break-all">{dateResult.utc}</div>
            </div>
            <div className="glass-panel p-4">
              <span className="text-xs text-accent font-bold block mb-1">Local Browser Time</span>
              <div className="font-mono text-xs break-all">{dateResult.local}</div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Word & Character Counter */}
      {activeSubTool === 'counter' && (
        <div className="glass-panel p-6 fade-in">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Word & Character Counter</h3>
            <p className="text-xs text-muted">Analyze document statistics, reading time estimates, and densities</p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 devtools-split-grid">
            <div className="glass-panel p-3 text-center">
              <div className="text-xl font-bold text-primary">{charCount}</div>
              <div className="text-xs text-muted">Characters</div>
            </div>
            <div className="glass-panel p-3 text-center">
              <div className="text-xl font-bold text-cyan">{charNoSpace}</div>
              <div className="text-xs text-muted">Chars (No spaces)</div>
            </div>
            <div className="glass-panel p-3 text-center">
              <div className="text-xl font-bold text-accent">{wordCount}</div>
              <div className="text-xs text-muted">Words</div>
            </div>
            <div className="glass-panel p-3 text-center">
              <div className="text-xl font-bold text-warning">{readingTime} min</div>
              <div className="text-xs text-muted">Est. Read Time</div>
            </div>
          </div>

          <textarea
            className="devtools-textarea text-xs"
            rows={8}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type or paste document text here..."
          />
        </div>
      )}

      {/* 8. Snippet Manager */}
      {activeSubTool === 'snippets' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold">Code Snippet Manager</h3>
              <p className="text-xs text-muted">Your saved reusable programming algorithms and boilerplates</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {recentSnippets.map((snip) => (
              <div key={snip.id} className="glass-panel p-4 flex justify-between items-start flex-wrap gap-3">
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge cyan text-xs font-mono">{snip.language}</span>
                    <span className="text-xs text-muted">{snip.updatedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold mb-2">{snip.title}</h4>
                  <pre className="font-mono text-xs p-2 rounded" style={{ background: '#0a0d16', maxHeight: '100px', overflowY: 'auto' }}>
                    {snip.code}
                  </pre>
                </div>
                <button 
                  className="primary text-xs flex items-center gap-1"
                  onClick={() => copyToClipboard(snip.code, snip.id)}
                >
                  {copiedKey === snip.id ? <Check size={14} /> : <Copy size={14} />} Copy Snippet
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. Code Formatter */}
      {activeSubTool === 'formatter' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-bold">Code Formatter & Indenter</h3>
              <p className="text-xs text-muted">Beautify minified or unindented code syntax</p>
            </div>
            <button className="primary text-xs" onClick={formatCodeSimple}>
              Format Code
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 devtools-split-grid">
            <div>
              <label className="text-xs text-muted block mb-1 font-bold">Raw Code Input</label>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={10}
                value={formatterInput}
                onChange={(e) => setFormatterInput(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1 font-bold">Formatted Result</label>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={10}
                value={formatterOutput}
                readOnly
                placeholder="Click 'Format Code' to view output..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
