import React, { useState } from 'react';
import { 
  Palette, Smartphone, Tablet, Monitor, Sparkles, Copy, Check, 
  Layers, Sliders, Box, Code2, Terminal, Eye, BookOpen 
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const HTML_ENTITIES = [
  { name: '&amp;', char: '&', code: '&#38;', desc: 'Ampersand' },
  { name: '&lt;', char: '<', code: '&#60;', desc: 'Less than' },
  { name: '&gt;', char: '>', code: '&#62;', desc: 'Greater than' },
  { name: '&quot;', char: '"', code: '&#34;', desc: 'Double quote' },
  { name: '&apos;', char: "'", code: '&#39;', desc: 'Single quote' },
  { name: '&copy;', char: '©', code: '&#169;', desc: 'Copyright symbol' },
  { name: '&reg;', char: '®', code: '&#174;', desc: 'Registered trademark' },
  { name: '&trade;', char: '™', code: '&#8482;', desc: 'Trademark' },
  { name: '&euro;', char: '€', code: '&#8364;', desc: 'Euro currency' },
  { name: '&pound;', char: '£', code: '&#163;', desc: 'Pound currency' },
  { name: '&yen;', char: '¥', code: '&#165;', desc: 'Yen currency' },
  { name: '&times;', char: '×', code: '&#215;', desc: 'Multiplication sign' },
  { name: '&divide;', char: '÷', code: '&#247;', desc: 'Division sign' },
  { name: '&infin;', char: '∞', code: '&#8734;', desc: 'Infinity symbol' },
  { name: '&hearts;', char: '♥', code: '&#9829;', desc: 'Black heart suit' },
  { name: '&bull;', char: '•', code: '&#8226;', desc: 'Bullet point' },
  { name: '&nbsp;', char: ' ', code: '&#160;', desc: 'Non-breaking space' },
  { name: '&check;', char: '✓', code: '&#10003;', desc: 'Checkmark' }
];

export const WebDevTools = () => {
  const { addXp } = useUser();
  const [activeSubTool, setActiveSubTool] = useState('playground');
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // 1. HTML/CSS Live Playground with Responsive Viewport
  const [htmlCode, setHtmlCode] = useState('<div class="hero-card">\n  <h1>Techverse Web Lab</h1>\n  <p>Live responsive CSS & HTML prototype preview.</p>\n  <button class="cta-btn">Get Started</button>\n</div>');
  const [cssCode, setCssCode] = useState('body {\n  margin: 0;\n  padding: 2rem;\n  font-family: sans-serif;\n  background: #0f172a;\n  color: #f8fafc;\n  display: flex;\n  justify-content: center;\n}\n.hero-card {\n  background: #1e293b;\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 16px;\n  padding: 2rem;\n  text-align: center;\n  max-width: 400px;\n}\nh1 {\n  color: #8b5cf6;\n  margin-top: 0;\n}\n.cta-btn {\n  background: linear-gradient(135deg, #8b5cf6, #06b6d4);\n  border: none;\n  color: white;\n  padding: 0.6rem 1.4rem;\n  border-radius: 8px;\n  font-weight: 700;\n  cursor: pointer;\n}');
  const [viewportMode, setViewportMode] = useState('desktop'); // desktop (100%), tablet (768px), mobile (375px)

  const combinedWebDoc = `<!DOCTYPE html><html><head><style>${cssCode}</style></head><body>${htmlCode}</body></html>`;

  // 2. CSS Gradient Generator
  const [gradientType, setGradientType] = useState('linear');
  const [gradientAngle, setGradientAngle] = useState(135);
  const [color1, setColor1] = useState('#8b5cf6');
  const [color2, setColor2] = useState('#06b6d4');
  const [color3, setColor3] = useState('#ec4899');
  const [useThreeColors, setUseThreeColors] = useState(false);

  const generatedGradientCss = useThreeColors
    ? gradientType === 'linear'
      ? `linear-gradient(${gradientAngle}deg, ${color1}, ${color2}, ${color3})`
      : `radial-gradient(circle, ${color1}, ${color2}, ${color3})`
    : gradientType === 'linear'
      ? `linear-gradient(${gradientAngle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  // 3. Color Picker & Palette Generator
  const [primaryColor, setPrimaryColor] = useState('#8b5cf6');

  // Convert hex to rgb
  const hexToRgb = (hex) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  const rgb = hexToRgb(primaryColor);

  // Luminance & Contrast against white and black
  const getLuminance = (r, g, b) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum = getLuminance(rgb.r, rgb.g, rgb.b);
  const contrastWithWhite = ((1.0 + 0.05) / (lum + 0.05)).toFixed(2);
  const contrastWithBlack = ((lum + 0.05) / (0.0 + 0.05)).toFixed(2);

  // 4. Box-Shadow Generator
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(12);
  const [shadowBlur, setShadowBlur] = useState(30);
  const [shadowSpread, setShadowSpread] = useState(0);
  const [shadowColor, setShadowColor] = useState('rgba(0, 0, 0, 0.45)');
  const [isInset, setIsInset] = useState(false);

  const generatedShadowCss = `box-shadow: ${isInset ? 'inset ' : ''}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor};`;

  // 5. Border-Radius Generator
  const [radiusTL, setRadiusTL] = useState(24);
  const [radiusTR, setRadiusTR] = useState(24);
  const [radiusBR, setRadiusBR] = useState(24);
  const [radiusBL, setRadiusBL] = useState(24);

  const generatedRadiusCss = `border-radius: ${radiusTL}px ${radiusTR}px ${radiusBR}px ${radiusBL}px;`;

  // 6. HTML Entity Search
  const [entityQuery, setEntityQuery] = useState('');
  const filteredEntities = HTML_ENTITIES.filter(e => 
    e.name.toLowerCase().includes(entityQuery.toLowerCase()) ||
    e.desc.toLowerCase().includes(entityQuery.toLowerCase())
  );

  // 7. JS Playground / Console
  const [jsSnippet, setJsSnippet] = useState('// JavaScript Scratchpad\nconst array = [10, 20, 30, 40, 50];\nconst doubled = array.map(x => x * 2);\nconsole.log("Original Array:", array);\nconsole.log("Doubled Array: ", doubled);\nconsole.log("Sum:           ", array.reduce((a, b) => a + b, 0));');
  const [jsConsoleLogs, setJsConsoleLogs] = useState([]);

  const runJsSnippet = () => {
    const logs = [];
    const origLog = console.log;
    const origErr = console.error;

    console.log = (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    console.error = (...args) => logs.push('[ERROR] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));

    try {
      const fn = new Function(jsSnippet);
      fn();
      setJsConsoleLogs(logs);
      addXp(15);
    } catch (err) {
      setJsConsoleLogs([...logs, `[RUNTIME ERROR] ${err.message}`]);
    } finally {
      console.log = origLog;
      console.error = origErr;
    }
  };

  return (
    <div className="web-devtools-container">
      {/* Subtool selector */}
      <div className="subtool-pills-bar flex gap-2 flex-wrap mb-6">
        {[
          { id: 'playground', label: 'HTML/CSS Live Playground', icon: Eye },
          { id: 'gradient', label: 'CSS Gradient Studio', icon: Palette },
          { id: 'color', label: 'Color Picker & Contrast', icon: Sliders },
          { id: 'shadow', label: 'Box-Shadow Generator', icon: Box },
          { id: 'radius', label: 'Border-Radius Generator', icon: Layers },
          { id: 'entities', label: 'HTML Entity Reference', icon: BookOpen },
          { id: 'jsconsole', label: 'JS Scratchpad Console', icon: Terminal }
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

      {/* 1. HTML/CSS Live Playground & Responsive Preview */}
      {activeSubTool === 'playground' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold">HTML/CSS Live Sandbox</h3>
              <p className="text-xs text-muted">Real-time sandboxed DOM preview with responsive device viewport simulation</p>
            </div>

            {/* Viewport Toggles */}
            <div className="flex gap-2">
              <button
                className={`filter-pill text-xs flex items-center gap-1 ${viewportMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setViewportMode('desktop')}
              >
                <Monitor size={14} /> Desktop (100%)
              </button>
              <button
                className={`filter-pill text-xs flex items-center gap-1 ${viewportMode === 'tablet' ? 'active' : ''}`}
                onClick={() => setViewportMode('tablet')}
              >
                <Tablet size={14} /> Tablet (768px)
              </button>
              <button
                className={`filter-pill text-xs flex items-center gap-1 ${viewportMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setViewportMode('mobile')}
              >
                <Smartphone size={14} /> Mobile (375px)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 devtools-split-grid mb-6">
            <div>
              <label className="text-xs text-muted block mb-1 font-bold font-mono uppercase">HTML Structure</label>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={8}
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1 font-bold font-mono uppercase">CSS Stylesheet</label>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={8}
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
              />
            </div>
          </div>

          {/* Iframe Viewport Sandbox */}
          <div className="viewport-wrapper glass-panel p-4 flex justify-center" style={{ background: '#05070e' }}>
            <div 
              className="viewport-container"
              style={{
                width: viewportMode === 'mobile' ? '375px' : (viewportMode === 'tablet' ? '768px' : '100%'),
                transition: 'width 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              <iframe
                title="Responsive Sandbox Preview"
                srcDoc={combinedWebDoc}
                sandbox="allow-scripts allow-modals"
                style={{ width: '100%', height: '360px', border: 'none', background: '#0f172a' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. CSS Gradient Studio */}
      {activeSubTool === 'gradient' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-bold">CSS Gradient Generator</h3>
              <p className="text-xs text-muted">Craft smooth linear and radial gradients with CSS rules export</p>
            </div>
            <button className="primary text-xs" onClick={() => copyToClipboard(`background: ${generatedGradientCss};`, 'gradient')}>
              {copiedKey === 'gradient' ? <Check size={14} /> : <Copy size={14} />} Copy CSS
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 devtools-split-grid">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <button className={`filter-pill text-xs ${gradientType === 'linear' ? 'active' : ''}`} onClick={() => setGradientType('linear')}>
                  Linear
                </button>
                <button className={`filter-pill text-xs ${gradientType === 'radial' ? 'active' : ''}`} onClick={() => setGradientType('radial')}>
                  Radial
                </button>
                <button className={`filter-pill text-xs ${useThreeColors ? 'active' : ''}`} onClick={() => setUseThreeColors(!useThreeColors)}>
                  {useThreeColors ? '3 Color Stops' : '2 Color Stops'}
                </button>
              </div>

              {gradientType === 'linear' && (
                <div>
                  <div className="flex justify-between text-xs text-muted mb-1 font-bold">
                    <span>Angle</span>
                    <span>{gradientAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={gradientAngle}
                    onChange={(e) => setGradientAngle(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <div>
                  <label className="text-xs text-muted block mb-1 font-bold">Color 1</label>
                  <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1 font-bold">Color 2</label>
                  <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
                </div>
                {useThreeColors && (
                  <div>
                    <label className="text-xs text-muted block mb-1 font-bold">Color 3</label>
                    <input type="color" value={color3} onChange={(e) => setColor3(e.target.value)} />
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs text-muted block mb-1 font-bold">Generated CSS Rule</label>
                <textarea
                  className="devtools-textarea font-mono text-xs"
                  rows={2}
                  value={`background: ${generatedGradientCss};`}
                  readOnly
                />
              </div>
            </div>

            {/* Live Gradient Card */}
            <div 
              className="gradient-preview-card flex items-center justify-center p-8 rounded-xl"
              style={{
                background: generatedGradientCss,
                minHeight: '220px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div className="glass-panel p-4 text-center" style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(8px)' }}>
                <span className="font-bold text-sm">Techverse Gradient</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Color Picker & Contrast */}
      {activeSubTool === 'color' && (
        <div className="glass-panel p-6 fade-in">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Color Picker & Accessibility Contrast Studio</h3>
            <p className="text-xs text-muted">Inspect HEX, RGB, HSL values, harmonic palettes, and WCAG accessibility contrast</p>
          </div>

          <div className="grid grid-cols-2 gap-6 devtools-split-grid mb-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)} 
                  style={{ width: '60px', height: '60px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
                />
                <div>
                  <div className="text-base font-bold font-mono">{primaryColor.toUpperCase()}</div>
                  <div className="text-xs text-muted font-mono">RGB({rgb.r}, {rgb.g}, {rgb.b})</div>
                </div>
              </div>

              {/* WCAG Contrast Ratings */}
              <div className="glass-panel p-4">
                <h4 className="text-xs text-muted font-bold uppercase mb-2">WCAG Contrast Ratios</h4>
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span>Contrast with White (#FFFFFF):</span>
                  <span className={`font-bold font-mono ${Number(contrastWithWhite) >= 4.5 ? 'text-accent' : 'text-danger'}`}>
                    {contrastWithWhite}:1 ({Number(contrastWithWhite) >= 4.5 ? 'PASS AA' : 'FAIL'})
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span>Contrast with Black (#000000):</span>
                  <span className={`font-bold font-mono ${Number(contrastWithBlack) >= 4.5 ? 'text-accent' : 'text-danger'}`}>
                    {contrastWithBlack}:1 ({Number(contrastWithBlack) >= 4.5 ? 'PASS AA' : 'FAIL'})
                  </span>
                </div>
              </div>
            </div>

            {/* Generated Harmony Swatches */}
            <div className="glass-panel p-4">
              <h4 className="text-xs text-muted font-bold uppercase mb-3">Harmonic Swatches</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Base', col: primaryColor },
                  { name: 'Light Shade', col: `rgb(${Math.min(255, rgb.r + 40)}, ${Math.min(255, rgb.g + 40)}, ${Math.min(255, rgb.b + 40)})` },
                  { name: 'Deep Shade', col: `rgb(${Math.max(0, rgb.r - 40)}, ${Math.max(0, rgb.g - 40)}, ${Math.max(0, rgb.b - 40)})` }
                ].map(swatch => (
                  <div key={swatch.name} className="swatch-card p-3 rounded-lg text-center" style={{ background: swatch.col }}>
                    <span className="text-xs font-bold" style={{ color: Number(contrastWithWhite) > 3 ? '#000' : '#fff' }}>
                      {swatch.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Box-Shadow Generator */}
      {activeSubTool === 'shadow' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-bold">Box-Shadow Generator</h3>
              <p className="text-xs text-muted">Generate smooth multi-offset box shadows with live CSS export</p>
            </div>
            <button className="primary text-xs" onClick={() => copyToClipboard(generatedShadowCss, 'shadow')}>
              {copiedKey === 'shadow' ? <Check size={14} /> : <Copy size={14} />} Copy CSS
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 devtools-split-grid">
            <div className="flex flex-col gap-3">
              <div>
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span>Horizontal Offset (X)</span>
                  <span>{shadowX}px</span>
                </div>
                <input type="range" min="-50" max="50" value={shadowX} onChange={(e) => setShadowX(Number(e.target.value))} className="w-full" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span>Vertical Offset (Y)</span>
                  <span>{shadowY}px</span>
                </div>
                <input type="range" min="-50" max="50" value={shadowY} onChange={(e) => setShadowY(Number(e.target.value))} className="w-full" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span>Blur Radius</span>
                  <span>{shadowBlur}px</span>
                </div>
                <input type="range" min="0" max="100" value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="w-full" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span>Spread Radius</span>
                  <span>{shadowSpread}px</span>
                </div>
                <input type="range" min="-20" max="50" value={shadowSpread} onChange={(e) => setShadowSpread(Number(e.target.value))} className="w-full" />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs text-muted font-bold flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isInset} onChange={(e) => setIsInset(e.target.checked)} />
                  <span>Inset Shadow</span>
                </label>
              </div>

              <div>
                <label className="text-xs text-muted block mb-1 font-bold">Generated CSS</label>
                <textarea className="devtools-textarea font-mono text-xs" rows={2} value={generatedShadowCss} readOnly />
              </div>
            </div>

            {/* Live Shadow Box */}
            <div className="glass-preview-box flex items-center justify-center p-8 rounded-xl" style={{ background: '#0a0d16' }}>
              <div 
                style={{
                  width: '180px',
                  height: '140px',
                  background: '#1e293b',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: `${isInset ? 'inset ' : ''}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.85rem'
                }}
              >
                Preview Card
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Border-Radius Generator */}
      {activeSubTool === 'radius' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-bold">Border-Radius Generator</h3>
              <p className="text-xs text-muted">Generate organic curved corners with instant CSS rule generation</p>
            </div>
            <button className="primary text-xs" onClick={() => copyToClipboard(generatedRadiusCss, 'radius')}>
              {copiedKey === 'radius' ? <Check size={14} /> : <Copy size={14} />} Copy CSS
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 devtools-split-grid">
            <div className="flex flex-col gap-3">
              <div>
                <div className="flex justify-between text-xs text-muted mb-1"><span>Top Left</span><span>{radiusTL}px</span></div>
                <input type="range" min="0" max="100" value={radiusTL} onChange={(e) => setRadiusTL(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted mb-1"><span>Top Right</span><span>{radiusTR}px</span></div>
                <input type="range" min="0" max="100" value={radiusTR} onChange={(e) => setRadiusTR(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted mb-1"><span>Bottom Right</span><span>{radiusBR}px</span></div>
                <input type="range" min="0" max="100" value={radiusBR} onChange={(e) => setRadiusBR(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted mb-1"><span>Bottom Left</span><span>{radiusBL}px</span></div>
                <input type="range" min="0" max="100" value={radiusBL} onChange={(e) => setRadiusBL(Number(e.target.value))} className="w-full" />
              </div>

              <div>
                <label className="text-xs text-muted block mb-1 font-bold">CSS Declaration</label>
                <textarea className="devtools-textarea font-mono text-xs" rows={2} value={generatedRadiusCss} readOnly />
              </div>
            </div>

            <div className="glass-preview-box flex items-center justify-center p-8 rounded-xl" style={{ background: '#0a0d16' }}>
              <div
                style={{
                  width: '200px',
                  height: '140px',
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  borderRadius: `${radiusTL}px ${radiusTR}px ${radiusBR}px ${radiusBL}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                Curved Shape
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. HTML Entity Reference */}
      {activeSubTool === 'entities' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold">HTML Entity Reference</h3>
              <p className="text-xs text-muted">Special characters, symbols, and entities with 1-click copy</p>
            </div>
            <input
              type="text"
              placeholder="Search entities (e.g. quote, copy, amp)..."
              className="devtools-textarea text-xs"
              style={{ width: '240px', padding: '0.5rem 0.75rem' }}
              value={entityQuery}
              onChange={(e) => setEntityQuery(e.target.value)}
            />
          </div>

          <div className="entities-table-wrapper glass-panel overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="text-muted border-b border-white-10 text-left">
                  <th className="p-3">Character</th>
                  <th className="p-3">Entity Name</th>
                  <th className="p-3">Unicode</th>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntities.map((ent) => (
                  <tr key={ent.name} className="border-b border-white-10">
                    <td className="p-3 font-bold text-lg text-cyan">{ent.char}</td>
                    <td className="p-3 text-primary">{ent.name}</td>
                    <td className="p-3 text-muted">{ent.code}</td>
                    <td className="p-3 font-sans">{ent.desc}</td>
                    <td className="p-3 text-right">
                      <button 
                        className="text-btn text-xs"
                        onClick={() => copyToClipboard(ent.name, ent.name)}
                      >
                        {copiedKey === ent.name ? <Check size={13} className="text-accent" /> : <Copy size={13} />} Copy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. JS Scratchpad Console */}
      {activeSubTool === 'jsconsole' && (
        <div className="glass-panel p-6 fade-in">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-bold">JavaScript Scratchpad & Console</h3>
              <p className="text-xs text-muted">Write quick JavaScript functions and evaluate console.log statements</p>
            </div>
            <button className="primary text-xs" onClick={runJsSnippet}>
              Execute Script
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 devtools-split-grid">
            <div>
              <label className="text-xs text-muted block mb-1 font-bold">JavaScript Source</label>
              <textarea
                className="devtools-textarea font-mono text-xs"
                rows={11}
                value={jsSnippet}
                onChange={(e) => setJsSnippet(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1 font-bold">Console Terminal Output</label>
              <div className="devtools-textarea font-mono text-xs p-3" style={{ minHeight: '220px', background: '#05070e', overflowY: 'auto' }}>
                {jsConsoleLogs.length === 0 ? (
                  <span className="text-muted">Click 'Execute Script' to run console output...</span>
                ) : (
                  jsConsoleLogs.map((log, i) => (
                    <div key={i} className="py-1 border-b border-white-10 text-accent">
                      ➜ {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
