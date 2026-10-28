import React, { useState } from 'react';
import { Database, Play, RotateCcw, Table, Check, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { useUser } from '../../context/UserContext';

// Practice In-Memory Relational Database
const PRACTICE_DB = {
  employees: [
    { id: 1, name: 'Alex Rivera', department_id: 101, salary: 95000, hire_date: '2023-01-15' },
    { id: 2, name: 'Aisha Chen', department_id: 102, salary: 110000, hire_date: '2022-03-20' },
    { id: 3, name: 'Rahul Sharma', department_id: 101, salary: 88000, hire_date: '2023-06-01' },
    { id: 4, name: 'Elena Rostova', department_id: 103, salary: 105000, hire_date: '2021-11-10' },
    { id: 5, name: 'Marcus Vance', department_id: 102, salary: 92000, hire_date: '2024-02-18' }
  ],
  departments: [
    { id: 101, name: 'Engineering', location: 'San Francisco, CA' },
    { id: 102, name: 'AI & Data Science', location: 'New York, NY' },
    { id: 103, name: 'Cloud Infrastructure', location: 'Seattle, WA' }
  ],
  orders: [
    { id: 1001, customer_name: 'Tech Corp', product: 'Cloud GPU Cluster', amount: 4800, order_date: '2026-02-14' },
    { id: 1002, customer_name: 'Dev Hub', product: 'IDE Licenses', amount: 1200, order_date: '2026-02-18' },
    { id: 1003, customer_name: 'Data Labs', product: 'Vector DB Instance', amount: 3500, order_date: '2026-02-22' },
    { id: 1004, customer_name: 'AI Institute', product: 'Model Fine-tuning Pipeline', amount: 7200, order_date: '2026-03-01' }
  ],
  students: [
    { id: 201, name: 'Jordan Lee', major: 'Computer Science', gpa: 3.85 },
    { id: 202, name: 'Samantha Wu', major: 'Data Science', gpa: 3.92 },
    { id: 203, name: 'David Kim', major: 'Computer Science', gpa: 3.45 },
    { id: 204, name: 'Maria Garcia', major: 'Software Engineering', gpa: 3.78 }
  ]
};

const SAMPLE_SQL_QUERIES = [
  {
    title: '1. Select Employees with Salary > 90,000',
    sql: 'SELECT id, name, salary FROM employees WHERE salary > 90000 ORDER BY salary DESC;'
  },
  {
    title: '2. Inner Join: Employees with Department Names',
    sql: 'SELECT employees.name, departments.name AS department, employees.salary\nFROM employees\nJOIN departments ON employees.department_id = departments.id;'
  },
  {
    title: '3. Group By: High Value Orders (> 3000)',
    sql: 'SELECT customer_name, product, amount FROM orders WHERE amount > 3000 ORDER BY amount DESC;'
  },
  {
    title: '4. Top Computer Science Students',
    sql: 'SELECT name, major, gpa FROM students WHERE major = \'Computer Science\' ORDER BY gpa DESC;'
  }
];

export const SqlPlayground = () => {
  const { addXp } = useUser();
  const [query, setQuery] = useState(SAMPLE_SQL_QUERIES[0].sql);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [execLatency, setExecLatency] = useState(null);
  const [activeTableTab, setActiveTableTab] = useState('employees');

  const executeQuery = () => {
    setError(null);
    setResults(null);
    const start = performance.now();

    try {
      const q = query.trim().replace(/;$/, '');
      const lower = q.toLowerCase();

      if (!lower.startsWith('select')) {
        throw new Error('Only SELECT queries are permitted in the Practice Sandbox.');
      }

      // Check target table
      let tableName = '';
      if (lower.includes('from employees')) tableName = 'employees';
      else if (lower.includes('from departments')) tableName = 'departments';
      else if (lower.includes('from orders')) tableName = 'orders';
      else if (lower.includes('from students')) tableName = 'students';
      else throw new Error("Could not find valid table in query. Tables available: 'employees', 'departments', 'orders', 'students'.");

      let rows = [...PRACTICE_DB[tableName]];

      // Handle JOIN departments
      if (tableName === 'employees' && lower.includes('join departments')) {
        rows = rows.map(emp => {
          const dept = PRACTICE_DB.departments.find(d => d.id === emp.department_id);
          return {
            ...emp,
            department: dept ? dept.name : 'Unknown',
            location: dept ? dept.location : 'Unknown'
          };
        });
      }

      // Handle WHERE filtering
      if (lower.includes('where')) {
        const wherePart = q.substring(lower.indexOf('where') + 5).split(/order by|group by|limit/i)[0].trim();
        
        if (wherePart.includes('>')) {
          const [col, val] = wherePart.split('>').map(s => s.trim().replace(/['"]/g, ''));
          const cleanCol = col.includes('.') ? col.split('.')[1] : col;
          rows = rows.filter(r => Number(r[cleanCol]) > Number(val));
        } else if (wherePart.includes('<')) {
          const [col, val] = wherePart.split('<').map(s => s.trim().replace(/['"]/g, ''));
          const cleanCol = col.includes('.') ? col.split('.')[1] : col;
          rows = rows.filter(r => Number(r[cleanCol]) < Number(val));
        } else if (wherePart.includes('=')) {
          const [col, val] = wherePart.split('=').map(s => s.trim().replace(/['"]/g, ''));
          const cleanCol = col.includes('.') ? col.split('.')[1] : col;
          rows = rows.filter(r => String(r[cleanCol]).toLowerCase() === String(val).toLowerCase());
        }
      }

      // Handle ORDER BY
      if (lower.includes('order by')) {
        const orderPart = q.substring(lower.indexOf('order by') + 8).split(/limit/i)[0].trim();
        const isDesc = orderPart.toLowerCase().includes('desc');
        const col = orderPart.replace(/asc|desc/i, '').trim().split('.')[0];
        const cleanCol = col.includes('.') ? col.split('.')[1] : col;

        rows.sort((a, b) => {
          if (a[cleanCol] < b[cleanCol]) return isDesc ? 1 : -1;
          if (a[cleanCol] > b[cleanCol]) return isDesc ? -1 : 1;
          return 0;
        });
      }

      // Handle column projection
      const selectPart = q.substring(6, lower.indexOf('from')).trim();
      if (selectPart !== '*') {
        const requestedCols = selectPart.split(',').map(c => {
          const raw = c.trim();
          if (raw.toLowerCase().includes(' as ')) {
            return raw.split(/ as /i)[1].trim();
          }
          return raw.includes('.') ? raw.split('.')[1] : raw;
        });

        rows = rows.map(r => {
          const projected = {};
          requestedCols.forEach(col => {
            if (r[col] !== undefined) projected[col] = r[col];
          });
          return projected;
        });
      }

      const elapsed = (performance.now() - start).toFixed(2);
      setExecLatency(elapsed);
      setResults(rows);
      addXp(20);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sql-playground-container glass-panel p-6 fade-in">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge accent">Relational Sandbox</span>
            <span className="badge">In-Memory Engine</span>
          </div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Database className="text-accent" size={24} /> SQL Query Playground
          </h3>
          <p className="text-xs text-muted">Execute real SQL SELECT, JOIN, and WHERE queries against preloaded relational tables</p>
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          <select 
            className="codelab-select text-xs"
            onChange={(e) => {
              const selected = SAMPLE_SQL_QUERIES.find(s => s.title === e.target.value);
              if (selected) setQuery(selected.sql);
            }}
          >
            {SAMPLE_SQL_QUERIES.map(s => (
              <option key={s.title} value={s.title}>{s.title}</option>
            ))}
          </select>

          <button className="primary text-xs flex items-center gap-1" onClick={executeQuery}>
            <Play size={14} fill="currentColor" /> Run SQL Query
          </button>
        </div>
      </div>

      {/* Database Schema Viewer Strip */}
      <div className="schema-strip mb-4 p-3 glass-panel" style={{ background: '#05070e' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted uppercase font-bold font-mono">Available Database Tables:</span>
          <div className="flex gap-1">
            {Object.keys(PRACTICE_DB).map(tbl => (
              <button
                key={tbl}
                className={`filter-pill text-xs font-mono py-1 px-3 ${activeTableTab === tbl ? 'active' : ''}`}
                onClick={() => setActiveTableTab(tbl)}
              >
                {tbl} ({PRACTICE_DB[tbl].length})
              </button>
            ))}
          </div>
        </div>

        {/* Active Table Schema Display */}
        <div className="text-xs text-muted font-mono">
          Columns: {Object.keys(PRACTICE_DB[activeTableTab][0]).map(c => <span key={c} className="text-cyan mr-3">• {c}</span>)}
        </div>
      </div>

      {/* SQL Input Area */}
      <div className="mb-4">
        <label className="text-xs text-muted block mb-1 font-bold font-mono uppercase">SQL Editor</label>
        <textarea
          className="devtools-textarea font-mono text-xs"
          rows={5}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Write SQL SELECT query here..."
        />
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-3 mb-4 glass-panel text-danger text-xs flex items-center gap-2" style={{ background: 'rgba(239, 68, 68, 0.12)' }}>
          <AlertCircle size={16} /> <strong>SQL Error:</strong> {error}
        </div>
      )}

      {/* Query Results Table */}
      {results && (
        <div className="results-container glass-panel p-4" style={{ background: '#05070e' }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-accent font-bold font-mono">
              ✓ {results.length} rows returned ({execLatency} ms)
            </span>
            <span className="text-xs text-muted">Relational Record Output</span>
          </div>

          {results.length === 0 ? (
            <div className="text-muted text-xs py-4 text-center">0 rows matched the WHERE criteria.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="text-muted border-b border-white-10 text-left">
                    {Object.keys(results[0]).map(col => (
                      <th key={col} className="p-2 text-cyan uppercase font-bold">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => (
                    <tr key={idx} className="border-b border-white-10">
                      {Object.values(row).map((val, cIdx) => (
                        <td key={cIdx} className="p-2">{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
