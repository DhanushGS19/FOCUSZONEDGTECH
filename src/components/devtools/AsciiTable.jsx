import React, { useState } from 'react';
import { Search, Copy, Check, Hash, Info } from 'lucide-react';

const ASCII_CHARACTERS = Array.from({ length: 128 }, (_, i) => {
  let char = String.fromCharCode(i);
  let name = '';
  let category = 'Printable';

  if (i < 32) {
    category = 'Control';
    const names = [
      'NUL (Null char)', 'SOH (Start of Header)', 'STX (Start of Text)', 'ETX (End of Text)',
      'EOT (End of Trans)', 'ENQ (Enquiry)', 'ACK (Acknowledge)', 'BEL (Bell / Alert)',
      'BS (Backspace)', 'HT (Horizontal Tab)', 'LF (Line Feed / Newline)', 'VT (Vertical Tab)',
      'FF (Form Feed)', 'CR (Carriage Return)', 'SO (Shift Out)', 'SI (Shift In)',
      'DLE (Data Link Escape)', 'DC1 (Device Control 1)', 'DC2 (Device Control 2)', 'DC3 (Device Control 3)',
      'DC4 (Device Control 4)', 'NAK (Negative Ack)', 'SYN (Synchronous Idle)', 'ETB (End Trans Block)',
      'CAN (Cancel)', 'EM (End of Medium)', 'SUB (Substitute)', 'ESC (Escape)',
      'FS (File Separator)', 'GS (Group Separator)', 'RS (Record Separator)', 'US (Unit Separator)'
    ];
    name = names[i];
    char = names[i].split(' ')[0];
  } else if (i === 32) {
    category = 'Space';
    name = 'Space';
    char = '␣';
  } else if (i === 127) {
    category = 'Control';
    name = 'DEL (Delete)';
    char = 'DEL';
  } else if (i >= 48 && i <= 57) {
    category = 'Digit';
    name = `Digit ${char}`;
  } else if (i >= 65 && i <= 90) {
    category = 'Uppercase';
    name = `Uppercase letter ${char}`;
  } else if (i >= 97 && i <= 122) {
    category = 'Lowercase';
    name = `Lowercase letter ${char}`;
  } else {
    category = 'Punctuation';
    name = `Symbol ${char}`;
  }

  return {
    dec: i,
    hex: '0x' + i.toString(16).toUpperCase().padStart(2, '0'),
    oct: '0' + i.toString(8).padStart(3, '0'),
    bin: i.toString(2).padStart(8, '0'),
    char,
    name,
    category
  };
});

export const AsciiTable = () => {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [copiedDec, setCopiedDec] = useState(null);

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item.dec >= 32 && item.dec < 127 ? String.fromCharCode(item.dec) : item.hex);
    setCopiedDec(item.dec);
    setTimeout(() => setCopiedDec(null), 1500);
  };

  const filtered = ASCII_CHARACTERS.filter(item => {
    const matchesCat = filterCat === 'All' || item.category === filterCat;
    const matchesSearch = !search || 
      item.dec.toString().includes(search) ||
      item.hex.toLowerCase().includes(search.toLowerCase()) ||
      item.bin.includes(search) ||
      item.char.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="ascii-table-wrapper glass-panel p-6 fade-in">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Hash size={18} className="text-cyan" /> ASCII Table Reference (0 - 127)
          </h3>
          <p className="text-xs text-muted">Complete 7-bit standard ASCII lookup with Decimal, Hexadecimal, Octal, and Binary encoding</p>
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          <input
            type="text"
            className="devtools-textarea font-mono text-xs"
            style={{ width: '220px', padding: '0.45rem 0.75rem' }}
            placeholder="Search Dec, Hex, Char..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="codelab-select font-mono text-xs"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Printable">Printable</option>
            <option value="Digit">Digits (0-9)</option>
            <option value="Uppercase">Uppercase (A-Z)</option>
            <option value="Lowercase">Lowercase (a-z)</option>
            <option value="Punctuation">Punctuation</option>
            <option value="Control">Control Characters</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto" style={{ maxHeight: '520px', overflowY: 'auto' }}>
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-border bg-slate-900/60 text-muted uppercase text-[11px]">
              <th className="p-2.5">Dec</th>
              <th className="p-2.5">Hex</th>
              <th className="p-2.5">Oct</th>
              <th className="p-2.5">Binary (8-bit)</th>
              <th className="p-2.5">Char</th>
              <th className="p-2.5">Description</th>
              <th className="p-2.5">Category</th>
              <th className="p-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr 
                key={item.dec} 
                className="border-b border-border/50 hover:bg-slate-800/40 transition-colors"
              >
                <td className="p-2.5 font-bold text-slate-200">{item.dec}</td>
                <td className="p-2.5 text-cyan">{item.hex}</td>
                <td className="p-2.5 text-slate-400">{item.oct}</td>
                <td className="p-2.5 text-slate-400 text-[11px]">{item.bin}</td>
                <td className="p-2.5">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    item.category === 'Control' ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-cyan'
                  }`}>
                    {item.char}
                  </span>
                </td>
                <td className="p-2.5 text-slate-300 font-sans text-xs">{item.name}</td>
                <td className="p-2.5">
                  <span className="badge text-[10px]">{item.category}</span>
                </td>
                <td className="p-2.5 text-right">
                  <button
                    type="button"
                    className="icon-btn-sm"
                    onClick={() => handleCopy(item)}
                    title="Copy character or hex"
                  >
                    {copiedDec === item.dec ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
