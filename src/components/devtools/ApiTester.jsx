import React, { useState } from 'react';
import { 
  Send, Globe, Shield, Clock, Database, Copy, Check, 
  RotateCcw, Plus, Trash2, Code2, AlertCircle, Sparkles, CheckCircle2 
} from 'lucide-react';
import './ApiTester.css';

const SAMPLE_ENDPOINTS = [
  { label: 'JSONPlaceholder - Get 10 Posts (GET)', method: 'GET', url: 'https://jsonplaceholder.typicode.com/posts?_limit=10', body: '' },
  { label: 'JSONPlaceholder - Get User Profile (GET)', method: 'GET', url: 'https://jsonplaceholder.typicode.com/users/1', body: '' },
  { label: 'JSONPlaceholder - Create Post (POST)', method: 'POST', url: 'https://jsonplaceholder.typicode.com/posts', body: JSON.stringify({ title: 'Techverse Dev Tools', body: 'Exploring modern developer platforms.', userId: 1 }, null, 2) },
  { label: 'HTTPBin - Headers Echo (GET)', method: 'GET', url: 'https://httpbin.org/headers', body: '' },
  { label: 'HTTPBin - IP Address Echo (GET)', method: 'GET', url: 'https://httpbin.org/ip', body: '' }
];

export const ApiTester = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [activeReqTab, setActiveReqTab] = useState('params'); // 'params' | 'headers' | 'body'
  const [activeResTab, setActiveResTab] = useState('pretty'); // 'pretty' | 'raw' | 'headers'

  // Query Params Key-Value pairs
  const [params, setParams] = useState([
    { key: '', value: '', enabled: true }
  ]);

  // Headers Key-Value pairs
  const [headers, setHeaders] = useState([
    { key: 'Accept', value: 'application/json', enabled: true },
    { key: 'Content-Type', value: 'application/json', enabled: true }
  ]);

  // Body content
  const [bodyContent, setBodyContent] = useState('');
  const [bodyError, setBodyError] = useState(null);

  // Response state
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [copiedRes, setCopiedRes] = useState(false);

  // History state
  const [history, setHistory] = useState([
    { id: 'h1', method: 'GET', url: 'https://jsonplaceholder.typicode.com/posts/1', status: 200, timeMs: 142, date: 'Earlier' }
  ]);

  const handleAddParam = () => setParams(prev => [...prev, { key: '', value: '', enabled: true }]);
  const handleRemoveParam = (idx) => setParams(prev => prev.filter((_, i) => i !== idx));
  const handleUpdateParam = (idx, field, val) => {
    setParams(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleAddHeader = () => setHeaders(prev => [...prev, { key: '', value: '', enabled: true }]);
  const handleRemoveHeader = (idx) => setHeaders(prev => prev.filter((_, i) => i !== idx));
  const handleUpdateHeader = (idx, field, val) => {
    setHeaders(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleSelectSample = (sample) => {
    setMethod(sample.method);
    setUrl(sample.url);
    if (sample.body) {
      setBodyContent(sample.body);
      setActiveReqTab('body');
    }
  };

  const handleFormatJson = () => {
    try {
      if (!bodyContent.trim()) return;
      const parsed = JSON.parse(bodyContent);
      setBodyContent(JSON.stringify(parsed, null, 2));
      setBodyError(null);
    } catch (err) {
      setBodyError('Invalid JSON syntax: ' + err.message);
    }
  };

  const handleSendRequest = async () => {
    if (!url.trim()) return;
    setIsLoading(true);
    setResponse(null);
    const startTime = Date.now();

    try {
      // Build full URL with active query params
      const urlObj = new URL(url);
      params.forEach(p => {
        if (p.enabled && p.key.trim()) {
          urlObj.searchParams.set(p.key.trim(), p.value.trim());
        }
      });

      // Assemble headers object
      const reqHeaders = {};
      headers.forEach(h => {
        if (h.enabled && h.key.trim()) {
          reqHeaders[h.key.trim()] = h.value.trim();
        }
      });

      const options = {
        method,
        headers: reqHeaders
      };

      if (['POST', 'PUT', 'PATCH'].includes(method) && bodyContent.trim()) {
        options.body = bodyContent;
      }

      const res = await fetch(urlObj.toString(), options);
      const latency = Date.now() - startTime;
      const resHeaders = {};
      res.headers.forEach((v, k) => { resHeaders[k] = v; });

      const text = await res.text();
      let parsedJson = null;
      try {
        parsedJson = JSON.parse(text);
      } catch {}

      const resSize = new Blob([text]).size;

      const result = {
        status: res.status,
        statusText: res.statusText || (res.status === 200 ? 'OK' : 'Response'),
        timeMs: latency,
        sizeBytes: resSize,
        headers: resHeaders,
        bodyRaw: text,
        bodyJson: parsedJson
      };

      setResponse(result);

      // Add to history
      setHistory(prev => [
        { id: `h_${Date.now()}`, method, url: urlObj.toString(), status: res.status, timeMs: latency, date: 'Just now' },
        ...prev.slice(0, 5)
      ]);
    } catch (err) {
      const latency = Date.now() - startTime;
      setResponse({
        status: 0,
        statusText: 'CORS / Network Error',
        timeMs: latency,
        sizeBytes: 0,
        headers: {},
        bodyRaw: `Error sending request: ${err.message}.\n\nNote: Browsers enforce Cross-Origin Resource Sharing (CORS). Public APIs like JSONPlaceholder and HTTPBin permit browser requests, but private endpoints without 'Access-Control-Allow-Origin: *' are blocked by browser sandbox policy.`,
        bodyJson: null,
        isError: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (!response) return;
    const text = response.bodyJson ? JSON.stringify(response.bodyJson, null, 2) : response.bodyRaw;
    navigator.clipboard.writeText(text);
    setCopiedRes(true);
    setTimeout(() => setCopiedRes(false), 2000);
  };

  return (
    <div className="api-tester-container fade-in">
      {/* Security notice & guidance banner */}
      <div className="security-notice glass-panel p-3 mb-4 flex items-center justify-between flex-wrap gap-2 text-xs border border-white-10">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-cyan shrink-0" />
          <span>
            <strong>Destination Security & Credential Protection:</strong> Client-side requests run in your browser sandbox. Never transmit production secrets or API passwords to unverified third-party hosts.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted text-[11px]">Quick Preload:</span>
          <select 
            onChange={(e) => {
              const sample = SAMPLE_ENDPOINTS.find(s => s.label === e.target.value);
              if (sample) handleSelectSample(sample);
            }} 
            className="p-1 bg-charcoal border border-white-10 rounded text-xs text-white"
          >
            <option value="">Choose Test API...</option>
            {SAMPLE_ENDPOINTS.map((s, idx) => (
              <option key={idx} value={s.label}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Request Configuration */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <div className="glass-panel p-4">
            {/* Method + URL Input Bar */}
            <div className="flex gap-2 mb-4">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className={`method-select text-xs font-bold p-2 rounded bg-charcoal border border-white-10 ${
                  method === 'GET' ? 'text-green-400' :
                  method === 'POST' ? 'text-cyan' :
                  method === 'PUT' ? 'text-amber-400' :
                  method === 'DELETE' ? 'text-red-400' : 'text-purple-400'
                }`}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>

              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/v1/resource..."
                className="p-2 text-xs bg-dark rounded border border-white-10 flex-1 font-mono"
              />

              <button
                onClick={handleSendRequest}
                disabled={isLoading}
                className="btn-primary text-xs px-4 flex items-center gap-1.5 shrink-0"
              >
                {isLoading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <>
                    <Send size={14} /> Send
                  </>
                )}
              </button>
            </div>

            {/* Request Configuration Sub-Tabs */}
            <div className="flex gap-2 border-b border-white-10 pb-2 mb-3">
              <button
                className={`filter-pill text-xs ${activeReqTab === 'params' ? 'active' : ''}`}
                onClick={() => setActiveReqTab('params')}
              >
                Params ({params.filter(p => p.key).length})
              </button>
              <button
                className={`filter-pill text-xs ${activeReqTab === 'headers' ? 'active' : ''}`}
                onClick={() => setActiveReqTab('headers')}
              >
                Headers ({headers.filter(h => h.key).length})
              </button>
              {['POST', 'PUT', 'PATCH'].includes(method) && (
                <button
                  className={`filter-pill text-xs ${activeReqTab === 'body' ? 'active' : ''}`}
                  onClick={() => setActiveReqTab('body')}
                >
                  Body (JSON)
                </button>
              )}
            </div>

            {/* Params Tab */}
            {activeReqTab === 'params' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted font-bold">Query Parameters</span>
                  <button onClick={handleAddParam} className="btn-secondary text-xs px-2 py-0.5 flex items-center gap-1">
                    <Plus size={11} /> Add Param
                  </button>
                </div>
                {params.map((p, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={p.enabled}
                      onChange={(e) => handleUpdateParam(idx, 'enabled', e.target.checked)}
                      className="rounded"
                    />
                    <input
                      type="text"
                      placeholder="Key (e.g. limit)"
                      value={p.key}
                      onChange={(e) => handleUpdateParam(idx, 'key', e.target.value)}
                      className="p-1.5 text-xs bg-dark rounded border border-white-10 flex-1 font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 10)"
                      value={p.value}
                      onChange={(e) => handleUpdateParam(idx, 'value', e.target.value)}
                      className="p-1.5 text-xs bg-dark rounded border border-white-10 flex-1 font-mono"
                    />
                    <button onClick={() => handleRemoveParam(idx)} className="text-muted hover:text-red-400 p-1">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Headers Tab */}
            {activeReqTab === 'headers' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted font-bold">HTTP Request Headers</span>
                  <button onClick={handleAddHeader} className="btn-secondary text-xs px-2 py-0.5 flex items-center gap-1">
                    <Plus size={11} /> Add Header
                  </button>
                </div>
                {headers.map((h, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={h.enabled}
                      onChange={(e) => handleUpdateHeader(idx, 'enabled', e.target.checked)}
                      className="rounded"
                    />
                    <input
                      type="text"
                      placeholder="Header Key (e.g. Content-Type)"
                      value={h.key}
                      onChange={(e) => handleUpdateHeader(idx, 'key', e.target.value)}
                      className="p-1.5 text-xs bg-dark rounded border border-white-10 flex-1 font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Header Value"
                      value={h.value}
                      onChange={(e) => handleUpdateHeader(idx, 'value', e.target.value)}
                      className="p-1.5 text-xs bg-dark rounded border border-white-10 flex-1 font-mono"
                    />
                    <button onClick={() => handleRemoveHeader(idx)} className="text-muted hover:text-red-400 p-1">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Body Tab */}
            {activeReqTab === 'body' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted font-bold">Raw JSON Payload</span>
                  <button onClick={handleFormatJson} className="btn-secondary text-xs px-2 py-0.5 flex items-center gap-1">
                    <Sparkles size={11} /> Format JSON
                  </button>
                </div>
                <textarea
                  value={bodyContent}
                  onChange={(e) => { setBodyContent(e.target.value); setBodyError(null); }}
                  placeholder='{\n  "title": "New item",\n  "status": "active"\n}'
                  rows={8}
                  className="w-full p-2.5 text-xs bg-dark rounded border border-white-10 font-mono text-cyan"
                />
                {bodyError && (
                  <div className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {bodyError}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Request History */}
          <div className="glass-panel p-3">
            <span className="text-xs text-muted font-bold block mb-2 font-mono">RECENT API CALLS</span>
            <div className="space-y-1.5">
              {history.map(h => (
                <div 
                  key={h.id} 
                  onClick={() => { setMethod(h.method); setUrl(h.url); }}
                  className="p-2 bg-charcoal hover:bg-dark rounded border border-white-10 cursor-pointer flex justify-between items-center text-xs transition-colors"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className={`font-mono font-bold text-[11px] ${
                      h.method === 'GET' ? 'text-green-400' : 'text-cyan'
                    }`}>{h.method}</span>
                    <span className="text-muted truncate font-mono">{h.url}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`badge text-[10px] ${h.status >= 200 && h.status < 300 ? 'cyan' : 'amber'}`}>
                      {h.status || 'ERR'}
                    </span>
                    <span className="text-muted text-[10px] font-mono">{h.timeMs}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Response Inspector */}
        <div className="col-span-12 lg:col-span-6">
          <div className="glass-panel p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Database size={16} className="text-cyan" /> Response Inspector
              </h3>

              {response && (
                <div className="flex items-center gap-2">
                  <span className={`badge ${response.status >= 200 && response.status < 300 ? 'cyan' : 'amber'} font-mono text-xs`}>
                    {response.status} {response.statusText}
                  </span>
                  <span className="badge font-mono text-xs text-muted flex items-center gap-1">
                    <Clock size={11} /> {response.timeMs}ms
                  </span>
                  <button 
                    onClick={handleCopyResponse}
                    className="btn-secondary text-xs px-2 py-1 flex items-center gap-1"
                  >
                    {copiedRes ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                    {copiedRes ? 'Copied' : 'Copy'}
                  </button>
                </div>
              )}
            </div>

            {response ? (
              <div className="flex-1 flex flex-col">
                {/* Response subtabs */}
                <div className="flex gap-2 border-b border-white-10 pb-2 mb-3">
                  <button
                    className={`filter-pill text-xs ${activeResTab === 'pretty' ? 'active' : ''}`}
                    onClick={() => setActiveResTab('pretty')}
                  >
                    Pretty JSON
                  </button>
                  <button
                    className={`filter-pill text-xs ${activeResTab === 'raw' ? 'active' : ''}`}
                    onClick={() => setActiveResTab('raw')}
                  >
                    Raw Content
                  </button>
                  <button
                    className={`filter-pill text-xs ${activeResTab === 'headers' ? 'active' : ''}`}
                    onClick={() => setActiveResTab('headers')}
                  >
                    Headers ({Object.keys(response.headers || {}).length})
                  </button>
                </div>

                {/* Response Body Content */}
                {activeResTab === 'pretty' && (
                  <pre className="p-3 bg-dark rounded border border-white-10 text-xs font-mono text-cyan overflow-auto flex-1 max-h-[460px]">
                    <code>
                      {response.bodyJson ? JSON.stringify(response.bodyJson, null, 2) : response.bodyRaw}
                    </code>
                  </pre>
                )}

                {activeResTab === 'raw' && (
                  <pre className="p-3 bg-dark rounded border border-white-10 text-xs font-mono text-muted overflow-auto flex-1 max-h-[460px] whitespace-pre-wrap">
                    <code>{response.bodyRaw}</code>
                  </pre>
                )}

                {activeResTab === 'headers' && (
                  <div className="p-3 bg-dark rounded border border-white-10 overflow-auto flex-1 max-h-[460px]">
                    <table className="w-full text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white-10 text-left text-muted">
                          <th className="p-1">Header</th>
                          <th className="p-1">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(response.headers).map(([k, v]) => (
                          <tr key={k} className="border-b border-white-10">
                            <td className="p-1 text-cyan font-bold">{k}</td>
                            <td className="p-1 text-muted break-all">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted border border-dashed border-white-10 rounded">
                <Globe size={32} className="mb-2 opacity-50 text-cyan" />
                <p className="text-xs">Send a request to inspect HTTP response payload, status codes, and latency.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
