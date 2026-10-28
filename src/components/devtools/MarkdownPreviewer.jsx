import React, { useState } from 'react';
import { FileText, Copy, Check, RotateCcw, Eye, Code2 } from 'lucide-react';

const SAMPLE_MARKDOWN = `# TechVerse Platform Specification

Welcome to the **TechVerse** interactive Markdown preview studio.

## Core Features
* **Code Playground**: Multi-language execution engine (Python, C++, Java, Node.js)
* **Interactive Curricula**: Step-by-step programming language mastery
* **Git Studio**: Visual branch simulator and merge conflict solver

### Sample Code Demonstration
\`\`\`javascript
// Fibonacci dynamic programming generator
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
}
console.log("Fib(10) =", fibonacci(10));
\`\`\`

> *"Good software architecture turns complex systems into maintainable components."*

| Tool | Status | Engine |
| :--- | :--- | :--- |
| JSON Formatter | Complete | Native Browser |
| Python Runner | Complete | Isolated Container |
| SQL Playground | Complete | In-Memory SQLite |

---
*Created in TechVerse Developer Suite*
`;

export const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [copied, setCopied] = useState(false);

  // Fast client-side markdown to HTML parser
  const renderMarkdownToHtml = (md) => {
    let html = md
      // Code blocks
      .replace(/```([a-z]*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre class="bg-slate-900 border border-slate-700/60 p-3 rounded-lg font-mono text-xs text-cyan overflow-x-auto my-3"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
      })
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-cyan px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
      // Headings
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-100 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-slate-100 mt-5 mb-2 pb-1 border-b border-border">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-cyan mt-2 mb-3 pb-2 border-b border-border">$1</h1>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-cyan pl-3 py-1 my-3 bg-slate-900/50 text-slate-300 italic text-xs">$1</blockquote>')
      // Horizontal rules
      .replace(/^---$/gim, '<hr class="border-border my-4" />')
      // Bold & Italic
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-100 font-bold">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="text-slate-300 italic">$1</em>')
      // Unordered lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-xs text-slate-300 my-1">$1</li>')
      // Line breaks into paragraphs
      .replace(/\n\n/g, '<br/>');

    // Simple Table parser
    if (html.includes('|')) {
      const lines = html.split('\n');
      let inTable = false;
      let tableHtml = '<div class="overflow-x-auto my-3"><table class="w-full text-xs text-left border-collapse border border-border font-mono">';
      
      const newLines = [];
      for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          if (trimmed.includes(':---') || trimmed.includes('---')) {
            continue; // Skip divider row
          }
          const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());
          if (!inTable) {
            inTable = true;
            tableHtml += '<tr class="bg-slate-900/80 border-b border-border text-cyan font-bold">';
            cells.forEach(c => tableHtml += `<th class="p-2 border border-border">${c}</th>`);
            tableHtml += '</tr>';
          } else {
            tableHtml += '<tr class="border-b border-border/50 hover:bg-slate-800/30">';
            cells.forEach(c => tableHtml += `<td class="p-2 border border-border">${c}</td>`);
            tableHtml += '</tr>';
          }
        } else {
          if (inTable) {
            tableHtml += '</table></div>';
            newLines.push(tableHtml);
            tableHtml = '<div class="overflow-x-auto my-3"><table class="w-full text-xs text-left border-collapse border border-border font-mono">';
            inTable = false;
          }
          newLines.push(line);
        }
      }
      if (inTable) {
        tableHtml += '</table></div>';
        newLines.push(tableHtml);
      }
      html = newLines.join('\n');
    }

    return html;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="markdown-previewer glass-panel p-6 fade-in">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FileText size={18} className="text-cyan" /> Markdown Studio & Live Previewer
          </h3>
          <p className="text-xs text-muted">Author technical documentation, READMEs, specifications, and notes with real-time formatting</p>
        </div>

        <div className="flex gap-2">
          <button 
            type="button"
            className="filter-pill text-xs flex items-center gap-1"
            onClick={() => setMarkdown(SAMPLE_MARKDOWN)}
          >
            <RotateCcw size={13} /> Reset Template
          </button>
          <button 
            type="button"
            className="primary text-xs flex items-center gap-1"
            onClick={handleCopyMarkdown}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy Markdown'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ minHeight: '520px' }}>
        {/* Markdown Editor */}
        <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-slate-950">
          <div className="p-2.5 bg-slate-900 border-b border-border flex justify-between items-center text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Code2 size={14} className="text-primary" /> Markdown Source
            </span>
            <span>{markdown.length} chars</span>
          </div>
          <textarea
            className="w-full flex-1 p-3 bg-transparent text-slate-200 font-mono text-xs outline-none resize-none leading-relaxed"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck="false"
          />
        </div>

        {/* Live Preview */}
        <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-slate-950">
          <div className="p-2.5 bg-slate-900 border-b border-border flex justify-between items-center text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5 text-cyan">
              <Eye size={14} /> Rendered Preview
            </span>
            <span className="badge text-[10px]">HTML Live</span>
          </div>
          <div 
            className="p-4 flex-1 overflow-y-auto text-xs text-slate-200 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(markdown) }}
          />
        </div>
      </div>
    </div>
  );
};
