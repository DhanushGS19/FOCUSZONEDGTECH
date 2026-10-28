import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  Award, ShieldCheck, Printer, Download,
  Share2, Copy, Check, Search, 
  X, Lock, BookOpen, ExternalLink, Sparkles,
  CheckCircle2, Palette, Plus, RefreshCw
} from 'lucide-react';
import { TechVerseSymbol } from '../components/TechVerseLogo';
import './Certificates.css';

const DEFAULT_CERTIFICATES = [
  {
    id: 'TV-CERT-2026-PY8491',
    title: 'Python Systems & Computational Logic',
    trackName: 'Python Systems Engineering',
    category: 'Programming Languages',
    issuedDate: 'October 24, 2026',
    grade: '96% (Distinction)',
    status: 'Earned',
    theme: 'emerald',
    instructor: 'Dr. Elena Vance, Head of Computer Science',
    credentialUrl: 'https://techverse.dev/verify/TV-CERT-2026-PY8491',
    skills: ['OOP Architecture', 'File I/O Streams', 'Generators & Iterators', 'Algorithms & Time Complexity'],
    hoursLogged: '28 Hours',
    description: 'Awarded for demonstrated excellence in Python software architecture, data structures, and algorithmic execution in the TechVerse sandbox.'
  },
  {
    id: 'TV-CERT-2026-WD4102',
    title: 'Modern Full-Stack Web Development',
    trackName: 'Full-Stack Web Engineering',
    category: 'Web Development',
    issuedDate: 'October 26, 2026',
    grade: '98% (Honors)',
    status: 'Earned',
    theme: 'sapphire',
    instructor: 'Marcus Chen, Senior Frontend Architect',
    credentialUrl: 'https://techverse.dev/verify/TV-CERT-2026-WD4102',
    skills: ['React State Management', 'Modern CSS & Flexbox', 'Async Fetch & REST APIs', 'DOM Manipulation'],
    hoursLogged: '36 Hours',
    description: 'Awarded for building responsive interactive web interfaces, single-page application routing, and asynchronous API integrations.'
  },
  {
    id: 'TV-CERT-2026-GT9930',
    title: 'Production Git & Enterprise DevOps',
    trackName: 'Git & GitHub Workflows',
    category: 'Developer Operations',
    issuedDate: 'October 27, 2026',
    grade: '100% (Perfect Mastery)',
    status: 'Earned',
    theme: 'gold',
    instructor: 'Sarah Jenkins, Principal Infrastructure Engineer',
    credentialUrl: 'https://techverse.dev/verify/TV-CERT-2026-GT9930',
    skills: ['Git Branching Models', 'Merge Conflict Resolution', 'Rebasing & Cherry-Pick', 'Pull Request Auditing'],
    hoursLogged: '14 Hours',
    description: 'Awarded for complete mastery of source control workflows, simulated conflict resolutions, and multi-branch team collaboration.'
  },
  {
    id: 'TV-CERT-2026-DSA552',
    title: 'Algorithms & Data Structures Competency',
    trackName: 'DSA Arena Specialization',
    category: 'Computer Science',
    progress: 75,
    requiredTasks: 'Solve 2 more Medium difficulty challenges in Hash Maps or Trees',
    status: 'In Progress',
    theme: 'emerald',
    instructor: 'Dr. Elena Vance, Head of Computer Science',
    skills: ['Binary Search', 'Hash Map O(1) Lookup', 'Dynamic Programming', 'Kadane Algorithm'],
    hoursLogged: '22 Hours Logged',
    description: 'Certifies verified algorithmic problem solving, computational complexity assertions, and optimal data structure selection.'
  },
  {
    id: 'TV-CERT-2026-CPP714',
    title: 'Modern C++ & Systems Architecture',
    trackName: 'C++ Systems Programming',
    category: 'Systems Programming',
    progress: 54,
    requiredTasks: 'Complete 3 remaining lessons in Memory Allocators and STL iterators',
    status: 'In Progress',
    theme: 'sapphire',
    instructor: 'David K. Hoffman, Systems Engineer',
    skills: ['Pointers & References', 'Manual Memory Safety', 'STL Containers', 'Template Metaprogramming'],
    hoursLogged: '18 Hours Logged',
    description: 'Certifies competency in low-level systems programming, pointer mechanics, deterministic destruction, and performance tuning.'
  },
  {
    id: 'TV-CERT-2026-SQL339',
    title: 'Relational Database Engineering & SQL',
    trackName: 'Database Architecture',
    category: 'Databases',
    progress: 68,
    requiredTasks: 'Complete lessons on Indexing Strategies and 3NF Normalization',
    status: 'In Progress',
    theme: 'gold',
    instructor: 'Dr. Elena Vance, Head of Computer Science',
    skills: ['Inner & Outer Joins', 'Subqueries & CTEs', 'Normalization', 'Execution Plans'],
    hoursLogged: '16 Hours Logged',
    description: 'Certifies mastery of relational schema design, query optimization, joins, aggregation, and data normalization standards.'
  }
];

// High-resolution HTML5 Canvas certificate PNG generator
const exportCertificateAsPNG = (cert, recipientName, themeVariant = 'emerald') => {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1920, 1080);
  bgGrad.addColorStop(0, '#060A12');
  bgGrad.addColorStop(0.5, '#0B1324');
  bgGrad.addColorStop(1, '#050810');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1920, 1080);

  // Theme primary accent color
  let accentColor = '#10B981'; // emerald
  let accentLight = '#34D399';
  if (themeVariant === 'sapphire') {
    accentColor = '#2563EB';
    accentLight = '#60A5FA';
  } else if (themeVariant === 'gold') {
    accentColor = '#F59E0B';
    accentLight = '#FCD34D';
  }

  // Outer Ornate Border
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(50, 50, 1820, 980);

  // Inner Ornate Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(70, 70, 1780, 940);

  // Corner ornamental brackets
  const cornerSize = 40;
  ctx.strokeStyle = accentLight;
  ctx.lineWidth = 3;
  // Top-left
  ctx.beginPath(); ctx.moveTo(60, 60 + cornerSize); ctx.lineTo(60, 60); ctx.lineTo(60 + cornerSize, 60); ctx.stroke();
  // Top-right
  ctx.beginPath(); ctx.moveTo(1860 - cornerSize, 60); ctx.lineTo(1860, 60); ctx.lineTo(1860, 60 + cornerSize); ctx.stroke();
  // Bottom-left
  ctx.beginPath(); ctx.moveTo(60, 1020 - cornerSize); ctx.lineTo(60, 1020); ctx.lineTo(60 + cornerSize, 1020); ctx.stroke();
  // Bottom-right
  ctx.beginPath(); ctx.moveTo(1860 - cornerSize, 1020); ctx.lineTo(1860, 1020); ctx.lineTo(1860, 1020 - cornerSize); ctx.stroke();

  // Organization Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 20px "Courier New", monospace';
  ctx.fillText('TECHVERSE ACADEMY OF ENGINEERING & TECHNOLOGY', 960, 160);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('OFFICIAL ACCREDITED CREDENTIAL', 960, 200);

  // "THIS CERTIFIES THAT"
  ctx.fillStyle = '#64748B';
  ctx.font = 'italic 20px Georgia, serif';
  ctx.fillText('THIS CERTIFIES THAT', 960, 290);

  // Recipient Name
  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 64px sans-serif';
  ctx.fillText(recipientName, 960, 380);

  // Underline beneath name
  const nameWidth = ctx.measureText(recipientName).width;
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(960 - nameWidth / 2 - 20, 410);
  ctx.lineTo(960 + nameWidth / 2 + 20, 410);
  ctx.stroke();

  // Statement
  ctx.fillStyle = '#94A3B8';
  ctx.font = '22px sans-serif';
  ctx.fillText('has successfully satisfied all rigorous curriculum requirements, practical programming laboratories,', 960, 470);
  ctx.fillText('and algorithmic evaluations demonstrating verified competency in', 960, 505);

  // Degree Title
  ctx.fillStyle = accentLight;
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText(cert.title, 960, 580);

  // Verified Competencies list
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 20px "Courier New", monospace';
  const skillsText = (cert.skills || []).join('   •   ');
  ctx.fillText(skillsText, 960, 650);

  // Grade & Issued Date
  ctx.fillStyle = '#64748B';
  ctx.font = '18px sans-serif';
  ctx.fillText(`Issued: ${cert.issuedDate || 'October 2026'}   |   Evaluation: ${cert.grade || 'Verified Pass'}   |   ID: ${cert.id}`, 960, 710);

  // Signatures Row
  // Left: Dean Signature
  ctx.textAlign = 'left';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(250, 870); ctx.lineTo(600, 870); ctx.stroke();

  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'italic 28px "Brush Script MT", cursive, sans-serif';
  ctx.fillText('Dr. Elena Vance', 260, 855);

  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Dr. Elena Vance, Dean of Software Engineering', 250, 900);
  ctx.fillStyle = '#64748B';
  ctx.font = '14px sans-serif';
  ctx.fillText('TechVerse Academic Council & Engineering Standards', 250, 925);

  // Right: Date & Verification
  ctx.textAlign = 'right';
  ctx.beginPath(); ctx.moveTo(1320, 870); ctx.lineTo(1670, 870); ctx.stroke();

  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 20px "Courier New", monospace';
  ctx.fillText(cert.issuedDate || 'October 2026', 1670, 855);

  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Official Date of Conferment', 1670, 900);
  ctx.fillStyle = '#64748B';
  ctx.font = '14px sans-serif';
  ctx.fillText('Verified at techverse.dev/verify', 1670, 925);

  // Center Seal
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.beginPath();
  ctx.arc(960, 860, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = accentLight;
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('TECHVERSE', 960, 855);
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('VERIFIED', 960, 875);

  // Bottom Hash
  ctx.fillStyle = '#475569';
  ctx.font = '13px "Courier New", monospace';
  ctx.fillText(`Cryptographic Checksum: SHA256:${cert.id.replace(/-/g, '').toLowerCase()}8f9b2026e  •  Tamper-evident record`, 960, 1000);

  // Download Trigger
  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.download = `TechVerse_Certificate_${cert.id}.png`;
  a.href = dataUrl;
  a.click();
};

const Certificates = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Active Main Tab: 'catalog' | 'studio' | 'verify'
  const [activeMainTab, setActiveMainTab] = useState('catalog');

  // Certificate Catalog State (persisted in localStorage)
  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem('techverse_user_certificates');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_CERTIFICATES;
  });

  const [filterStatus, setFilterStatus] = useState('All'); // 'All' | 'Earned' | 'In Progress'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState('');

  // Custom Studio Form State
  const [studioName, setStudioName] = useState(user?.name || 'Alex Rivera');
  const [studioTrack, setStudioTrack] = useState('Full-Stack Cloud & Systems Architecture');
  const [studioGrade, setStudioGrade] = useState('98% (Honors)');
  const [studioTheme, setStudioTheme] = useState('emerald');
  const [studioSkillInput, setStudioSkillInput] = useState('');
  const [studioSkills, setStudioSkills] = useState([
    'Microservices Architecture', 'Docker & Containerization', 'RESTful API Engineering', 'Distributed SQL'
  ]);
  const [customCreatedSuccess, setCustomCreatedSuccess] = useState(false);

  // Verifier Portal State
  const [verifyInput, setVerifyInput] = useState('TV-CERT-2026-PY8491');
  const [verifiedResult, setVerifiedResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const studentName = user?.name || studioName || 'Alex Rivera';

  // Synchronize certificates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('techverse_user_certificates', JSON.stringify(certificates));
    } catch {
      // ignore
    }
  }, [certificates]);

  const filteredCerts = certificates.filter(c => {
    const matchesFilter = filterStatus === 'All' || c.status === filterStatus;
    const matchesSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.skills && c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  const earnedCount = certificates.filter(c => c.status === 'Earned').length;
  const inProgressCount = certificates.filter(c => c.status === 'In Progress').length;

  const handleCopyCredential = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Launch LinkedIn Add-To-Profile
  const handleAddToLinkedIn = (cert) => {
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(cert.title)}&organizationName=${encodeURIComponent('TechVerse Academy')}&issueYear=2026&issueMonth=10&certUrl=${encodeURIComponent(cert.credentialUrl || `https://techverse.dev/verify/${cert.id}`)}&certId=${encodeURIComponent(cert.id)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  // Add skill to custom studio
  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (studioSkillInput.trim() && !studioSkills.includes(studioSkillInput.trim())) {
      setStudioSkills(prev => [...prev, studioSkillInput.trim()]);
      setStudioSkillInput('');
    }
  };

  const handleRemoveCustomSkill = (skillToRemove) => {
    setStudioSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  // Claim and generate custom certificate
  const handleCreateCustomCertificate = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCert = {
      id: `TV-CERT-2026-CUSTOM${randomSuffix}`,
      title: studioTrack,
      trackName: studioTrack,
      category: 'Advanced Engineering',
      issuedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      grade: studioGrade,
      status: 'Earned',
      theme: studioTheme,
      instructor: 'Dr. Elena Vance, Head of Computer Science',
      credentialUrl: `https://techverse.dev/verify/TV-CERT-2026-CUSTOM${randomSuffix}`,
      skills: studioSkills,
      hoursLogged: '40+ Hours',
      description: `Awarded for validated proficiency in ${studioTrack} through verified execution on TechVerse.`
    };

    setCertificates(prev => [newCert, ...prev]);
    setCustomCreatedSuccess(true);
    setSelectedCert(newCert);
    setTimeout(() => setCustomCreatedSuccess(false), 3000);
  };

  // Run Verifier check
  const handleRunVerify = (certIdToVerify) => {
    const query = (certIdToVerify || verifyInput).trim();
    if (!query) return;

    setIsVerifying(true);
    setVerifiedResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      const found = certificates.find(c => c.id.toLowerCase() === query.toLowerCase());
      if (found) {
        setVerifiedResult({
          status: 'VALID',
          cert: found,
          hash: `SHA256:${found.id.replace(/-/g, '').toLowerCase()}8f9b2026e`,
          timestamp: new Date().toUTCString()
        });
      } else {
        setVerifiedResult({
          status: 'NOT_FOUND',
          searchedId: query
        });
      }
    }, 400);
  };

  return (
    <div className="certificates-container fade-in">
      {/* 1. TOP HEADER DECK */}
      <header className="certificates-header-deck flex justify-between items-center flex-wrap gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="badge emerald">Verified Credentials</span>
            <span className="badge">Accredited Learning</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2.5">
            <Award className="text-emerald" size={28} /> Engineering Certifications
          </h1>
          <p className="text-muted text-xs md:text-sm">
            Official verifiable credentials issued by TechVerse upon mastering verified curriculum tracks and coding benchmarks.
          </p>
        </div>

        {/* Global Summary Stats */}
        <div className="flex items-center gap-3">
          <div className="cert-stat-pill">
            <span className="pill-num font-mono text-emerald">{earnedCount}</span>
            <span className="pill-txt">Earned</span>
          </div>
          <div className="cert-stat-pill">
            <span className="pill-num font-mono text-warning">{inProgressCount}</span>
            <span className="pill-txt">In Progress</span>
          </div>
        </div>
      </header>

      {/* 2. MAIN NAVIGATION TABS (My Certificates | Custom Studio | Verify Authenticity) */}
      <div className="flex justify-between items-center flex-wrap gap-3 my-6 border-b border-border pb-3">
        <div className="flex gap-2 items-center flex-wrap">
          <button
            type="button"
            className={`filter-pill text-xs font-bold flex items-center gap-1.5 ${activeMainTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('catalog')}
          >
            <Award size={14} />
            <span>My Credentials ({certificates.length})</span>
          </button>
          <button
            type="button"
            className={`filter-pill text-xs font-bold flex items-center gap-1.5 ${activeMainTab === 'studio' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('studio')}
          >
            <Sparkles size={14} className="text-warning" />
            <span>Custom Certificate Studio</span>
          </button>
          <button
            type="button"
            className={`filter-pill text-xs font-bold flex items-center gap-1.5 ${activeMainTab === 'verify' ? 'active' : ''}`}
            onClick={() => {
              setActiveMainTab('verify');
              if (!verifiedResult) handleRunVerify('TV-CERT-2026-PY8491');
            }}
          >
            <ShieldCheck size={14} className="text-emerald" />
            <span>Verify Authenticity</span>
          </button>
        </div>

        {activeMainTab === 'catalog' && (
          <div className="search-bar" style={{ minWidth: '260px' }}>
            <Search size={15} className="text-muted mr-2" />
            <input
              type="text"
              placeholder="Search credentials, skills, or tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* VIEW 1: CERTIFICATES CATALOG */}
      {/* ========================================================= */}
      {activeMainTab === 'catalog' && (
        <div className="fade-in">
          {/* Status Sub-Filters */}
          <div className="flex gap-2 items-center mb-5 flex-wrap">
            {['All', 'Earned', 'In Progress'].map(status => (
              <button
                key={status}
                type="button"
                className={`filter-pill text-2xs ${filterStatus === status ? 'active' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status === 'All' ? `All (${certificates.length})` : 
                 status === 'Earned' ? `Verified Earned (${earnedCount})` : `In Progress (${inProgressCount})`}
              </button>
            ))}
          </div>

          <div className="certificates-grid">
            {filteredCerts.map(cert => {
              const isEarned = cert.status === 'Earned';
              return (
                <div 
                  key={cert.id} 
                  className={`cert-card surface-card flex flex-col justify-between ${isEarned ? 'earned-card' : 'locked-card'}`}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`cert-icon-box ${isEarned ? 'earned' : 'locked'}`}>
                          {isEarned ? <ShieldCheck size={20} className="text-emerald" /> : <Lock size={18} className="text-muted" />}
                        </div>
                        <div>
                          <span className="text-2xs font-mono text-muted uppercase tracking-wider">{cert.category}</span>
                          <h3 className="text-sm md:text-base font-bold text-white leading-tight">{cert.title}</h3>
                        </div>
                      </div>

                      <span className={`badge text-2xs ${isEarned ? 'emerald' : 'amber'}`}>
                        {isEarned ? '✓ Verified' : `${cert.progress}% Complete`}
                      </span>
                    </div>

                    <p className="text-xs text-secondary leading-relaxed mb-4">
                      {cert.description}
                    </p>

                    {/* Skills Mastered Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(cert.skills || []).map((skill, idx) => (
                        <span key={idx} className="skill-chip text-2xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer / Action */}
                  <div className="pt-3 border-t border-border">
                    {isEarned ? (
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <div>
                          <span className="text-2xs text-muted block">Issued: {cert.issuedDate}</span>
                          <span className="text-2xs font-mono text-emerald font-semibold">{cert.grade}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <button
                            type="button"
                            className="btn-secondary text-2xs py-1.5 px-2"
                            onClick={() => exportCertificateAsPNG(cert, studentName, cert.theme || 'emerald')}
                            title="Direct PNG Download"
                          >
                            <Download size={13} className="text-emerald" />
                          </button>
                          <button
                            type="button"
                            className="btn-secondary text-2xs py-1.5 px-2"
                            onClick={() => handleCopyCredential(cert.id)}
                            title="Copy Credential ID"
                          >
                            {copiedId === cert.id ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
                          </button>
                          <button
                            type="button"
                            className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
                            onClick={() => setSelectedCert(cert)}
                          >
                            <Award size={14} /> View Certificate
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between text-2xs text-muted mb-1.5">
                          <span>Curriculum Milestone</span>
                          <span className="font-mono text-warning font-bold">{cert.progress}%</span>
                        </div>
                        <div className="progress-bar-bg h-1.5 mb-2">
                          <div className="progress-bar-fill" style={{ width: `${cert.progress}%` }} />
                        </div>
                        <p className="text-2xs text-muted italic line-clamp-1 mb-2">
                          Requirement: {cert.requiredTasks}
                        </p>
                        <button
                          type="button"
                          className="btn-secondary text-xs w-full py-1.5 flex items-center justify-center gap-1"
                          onClick={() => navigate('/learn')}
                        >
                          <BookOpen size={13} /> Continue Track to Unlock
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: CUSTOM CERTIFICATE STUDIO */}
      {/* ========================================================= */}
      {activeMainTab === 'studio' && (
        <div className="custom-studio-container fade-in">
          <div className="studio-grid grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Form: Customization Controls (5 cols) */}
            <div className="surface-card p-5 lg:col-span-5 flex flex-col gap-4 border-border">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Palette className="text-emerald" size={20} />
                <div>
                  <h3 className="text-sm font-bold text-white">Certificate Personalization Studio</h3>
                  <p className="text-2xs text-muted">Generate and issue accredited credentials for customized curriculum achievements</p>
                </div>
              </div>

              {/* Recipient Name */}
              <div className="form-group">
                <label className="text-2xs font-mono uppercase tracking-wider text-muted block mb-1">
                  Recipient Legal / Portfolio Name
                </label>
                <input
                  type="text"
                  className="w-full bg-elevated border border-border rounded px-3 py-2 text-xs text-white"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                />
              </div>

              {/* Specialization Track */}
              <div className="form-group">
                <label className="text-2xs font-mono uppercase tracking-wider text-muted block mb-1">
                  Specialization Track Title
                </label>
                <select
                  className="w-full bg-elevated border border-border rounded px-3 py-2 text-xs text-white"
                  value={studioTrack}
                  onChange={(e) => setStudioTrack(e.target.value)}
                >
                  <option value="Full-Stack Cloud & Systems Architecture">Full-Stack Cloud & Systems Architecture</option>
                  <option value="Modern C++ & High-Performance Computing">Modern C++ & High-Performance Computing</option>
                  <option value="Enterprise Python & Computational Logic">Enterprise Python & Computational Logic</option>
                  <option value="Algorithms & Data Structures Mastery">Algorithms & Data Structures Mastery</option>
                  <option value="DevOps, Git & CI/CD Pipelines">DevOps, Git & CI/CD Pipelines</option>
                  <option value="Distributed Relational Database Systems">Distributed Relational Database Systems</option>
                </select>
              </div>

              {/* Academic Grade / Honors */}
              <div className="form-group">
                <label className="text-2xs font-mono uppercase tracking-wider text-muted block mb-1">
                  Honor Level / Evaluation Grade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['98% (Honors)', '96% (Distinction)', '100% (Mastery)'].map(grade => (
                    <button
                      key={grade}
                      type="button"
                      className={`filter-pill text-3xs ${studioGrade === grade ? 'active' : ''}`}
                      onClick={() => setStudioGrade(grade)}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Theme Variant */}
              <div className="form-group">
                <label className="text-2xs font-mono uppercase tracking-wider text-muted block mb-1">
                  Aesthetic Theme & Seal Accent
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    className={`filter-pill text-2xs flex items-center justify-center gap-1.5 ${studioTheme === 'emerald' ? 'active' : ''}`}
                    onClick={() => setStudioTheme('emerald')}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald inline-block" />
                    <span>Emerald</span>
                  </button>
                  <button
                    type="button"
                    className={`filter-pill text-2xs flex items-center justify-center gap-1.5 ${studioTheme === 'sapphire' ? 'active' : ''}`}
                    onClick={() => setStudioTheme('sapphire')}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                    <span>Sapphire</span>
                  </button>
                  <button
                    type="button"
                    className={`filter-pill text-2xs flex items-center justify-center gap-1.5 ${studioTheme === 'gold' ? 'active' : ''}`}
                    onClick={() => setStudioTheme('gold')}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-warning inline-block" />
                    <span>Titanium Gold</span>
                  </button>
                </div>
              </div>

              {/* Verified Competencies Chips */}
              <div className="form-group">
                <label className="text-2xs font-mono uppercase tracking-wider text-muted block mb-1">
                  Verified Skills Tags
                </label>
                <form onSubmit={handleAddCustomSkill} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 bg-elevated border border-border rounded px-3 py-1.5 text-xs text-white"
                    placeholder="Add skill (press Enter)..."
                    value={studioSkillInput}
                    onChange={(e) => setStudioSkillInput(e.target.value)}
                  />
                  <button type="submit" className="btn-secondary text-xs px-3">
                    <Plus size={13} />
                  </button>
                </form>
                <div className="flex flex-wrap gap-1.5">
                  {studioSkills.map(skill => (
                    <span key={skill} className="skill-chip text-2xs flex items-center gap-1">
                      {skill}
                      <X size={11} className="cursor-pointer hover:text-danger" onClick={() => handleRemoveCustomSkill(skill)} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-border flex gap-2">
                <button
                  type="button"
                  className="btn-primary flex-1 py-2 text-xs flex items-center justify-center gap-2"
                  onClick={handleCreateCustomCertificate}
                >
                  <Award size={15} />
                  <span>{customCreatedSuccess ? '✓ Certificate Issued!' : 'Claim & Save Credential'}</span>
                </button>
                <button
                  type="button"
                  className="btn-secondary py-2 px-3 text-xs flex items-center justify-center gap-1.5"
                  onClick={() => exportCertificateAsPNG({
                    id: 'TV-CERT-PREVIEW',
                    title: studioTrack,
                    skills: studioSkills,
                    grade: studioGrade,
                    issuedDate: 'October 2026'
                  }, studioName, studioTheme)}
                  title="Direct Download"
                >
                  <Download size={14} className="text-emerald" />
                  <span>PNG</span>
                </button>
              </div>
            </div>

            {/* Right Live Preview Canvas (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs text-muted">
                <span className="font-mono text-2xs flex items-center gap-1 text-emerald">
                  <CheckCircle2 size={13} /> Real-Time Certificate Preview
                </span>
                <span className="text-3xs font-mono">1920x1080 High-Res Verified Canvas</span>
              </div>

              {/* Scaled Preview Frame */}
              <div className={`studio-preview-card theme-${studioTheme} surface-card p-6 border-2`}>
                <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <TechVerseSymbol size={24} />
                    <span className="font-mono text-xs font-bold text-white tracking-widest">TECHVERSE ACADEMY</span>
                  </div>
                  <span className="text-3xs font-mono text-muted uppercase">ACCREDITED CREDENTIAL</span>
                </div>

                <div className="text-center py-4">
                  <span className="text-3xs font-serif italic text-muted block mb-1">THIS CERTIFIES THAT</span>
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">{studioName || 'Alex Rivera'}</h2>
                  <p className="text-2xs text-muted max-w-md mx-auto mb-3">
                    has successfully satisfied all rigorous curriculum requirements and programming laboratories for
                  </p>
                  <h3 className={`text-base md:text-lg font-bold mb-3 ${studioTheme === 'sapphire' ? 'text-primary' : studioTheme === 'gold' ? 'text-warning' : 'text-emerald'}`}>
                    {studioTrack}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {studioSkills.map(s => (
                      <span key={s} className="skill-chip text-3xs font-mono">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-end pt-3 border-t border-border text-2xs text-muted">
                  <div>
                    <span className="font-serif italic block text-white text-xs">Dr. Elena Vance</span>
                    <span className="text-3xs">Dean of Software Engineering</span>
                  </div>
                  <div className="text-center">
                    <div className="inline-block p-1.5 rounded-full border border-emerald text-emerald mb-1">
                      <Award size={18} />
                    </div>
                    <span className="block text-3xs font-mono font-bold text-emerald">VERIFIED</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono block text-white text-xs">{studioGrade}</span>
                    <span className="text-3xs font-mono">Honors Grade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 3: VERIFIER AUTHENTICITY PORTAL */}
      {/* ========================================================= */}
      {activeMainTab === 'verify' && (
        <div className="verifier-portal-container fade-in max-w-3xl mx-auto">
          <div className="surface-card p-6 border-border mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded bg-emerald-subtle text-emerald">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Public Credential Verification Gateway</h2>
                <p className="text-2xs text-muted">Inspect cryptographic signatures and verify tamper-evident TechVerse accreditation records</p>
              </div>
            </div>

            {/* Input Row */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                className="flex-1 bg-elevated border border-border rounded px-3 py-2 text-xs font-mono text-white"
                placeholder="Enter Credential ID (e.g. TV-CERT-2026-PY8491)"
                value={verifyInput}
                onChange={(e) => setVerifyInput(e.target.value)}
              />
              <button
                type="button"
                className="btn-primary text-xs px-4 flex items-center gap-2"
                onClick={() => handleRunVerify()}
                disabled={isVerifying}
              >
                {isVerifying ? <RefreshCw size={13} className="animate-spin" /> : <Search size={13} />}
                <span>Verify</span>
              </button>
            </div>

            {/* Quick-test IDs */}
            <div className="flex items-center gap-2 flex-wrap text-2xs text-muted">
              <span>Quick verify:</span>
              {certificates.filter(c => c.status === 'Earned').slice(0, 3).map(c => (
                <button
                  key={c.id}
                  type="button"
                  className="filter-pill text-3xs font-mono"
                  onClick={() => { setVerifyInput(c.id); handleRunVerify(c.id); }}
                >
                  {c.id}
                </button>
              ))}
            </div>
          </div>

          {/* Verification Results Panel */}
          {verifiedResult && (
            <div className="fade-in">
              {verifiedResult.status === 'VALID' ? (
                <div className="surface-card p-6 border-emerald-500-20">
                  <div className="flex justify-between items-center pb-3 border-b border-border mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald animate-pulse" />
                      <span className="font-mono text-xs font-bold text-emerald uppercase tracking-wider">
                        Official Verified Credential
                      </span>
                    </div>
                    <span className="badge emerald text-2xs font-mono">STATUS: ACTIVE & ACCREDITED</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
                    <div>
                      <span className="text-3xs font-mono uppercase text-muted block">Recipient Name</span>
                      <span className="text-sm font-bold text-white">{studentName}</span>
                    </div>
                    <div>
                      <span className="text-3xs font-mono uppercase text-muted block">Conferred Specialization</span>
                      <span className="text-sm font-bold text-primary-accent">{verifiedResult.cert.title}</span>
                    </div>
                    <div>
                      <span className="text-3xs font-mono uppercase text-muted block">Date of Conferment</span>
                      <span className="font-mono text-white">{verifiedResult.cert.issuedDate}</span>
                    </div>
                    <div>
                      <span className="text-3xs font-mono uppercase text-muted block">Academic Grade</span>
                      <span className="font-mono text-emerald font-semibold">{verifiedResult.cert.grade}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-elevated border border-border text-2xs font-mono mb-4">
                    <span className="text-muted block text-3xs mb-1">CRYPTOGRAPHIC CHECKSUM RECORD:</span>
                    <span className="text-emerald text-3xs break-all">{verifiedResult.hash}</span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-border flex-wrap gap-2">
                    <span className="text-3xs text-muted font-mono">Audited by TechVerse Verification Node</span>
                    <button
                      type="button"
                      className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
                      onClick={() => setSelectedCert(verifiedResult.cert)}
                    >
                      <Award size={13} /> View Full Certificate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="surface-card p-6 border-danger text-center">
                  <span className="text-danger font-bold text-sm block mb-1">Credential Not Found</span>
                  <p className="text-2xs text-muted mb-3">No record matching "{verifiedResult.searchedId}" was found in the official registry.</p>
                  <button
                    type="button"
                    className="btn-secondary text-xs px-3 py-1"
                    onClick={() => { setVerifyInput('TV-CERT-2026-PY8491'); handleRunVerify('TV-CERT-2026-PY8491'); }}
                  >
                    Load Sample Verified ID
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* HIGH-RES OFFICIAL CERTIFICATE MODAL */}
      {/* ========================================================= */}
      {selectedCert && (
        <div className="cert-modal-overlay">
          <div className="cert-modal-wrapper fade-in">
            {/* Modal Actions Header */}
            <div className="flex justify-between items-center mb-4 text-white flex-wrap gap-2">
              <span className="text-xs font-mono text-emerald flex items-center gap-1.5 font-bold">
                <ShieldCheck size={16} /> Official Verified Credential
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {/* 1. Download High-Res PNG */}
                <button
                  type="button"
                  className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
                  onClick={() => exportCertificateAsPNG(selectedCert, studentName, selectedCert.theme || 'emerald')}
                  title="Download 1080p Full HD Certificate PNG"
                >
                  <Download size={13} /> Download PNG
                </button>

                {/* 2. Print / Save PDF */}
                <button
                  type="button"
                  className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                  onClick={handlePrint}
                  title="Print or Save as PDF"
                >
                  <Printer size={13} /> Print / PDF
                </button>

                {/* 3. Add to LinkedIn Profile */}
                <button
                  type="button"
                  className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 text-[#0A66C2] hover:text-white"
                  onClick={() => handleAddToLinkedIn(selectedCert)}
                  title="Add this credential directly to your LinkedIn Profile"
                >
                  <ExternalLink size={13} /> Add to LinkedIn
                </button>

                {/* 4. Share Link */}
                <button
                  type="button"
                  className="btn-secondary text-xs py-1.5 px-2.5 flex items-center gap-1"
                  onClick={() => handleCopyCredential(selectedCert.credentialUrl || `https://techverse.dev/verify/${selectedCert.id}`)}
                  title="Copy Verification Link"
                >
                  {copiedId === (selectedCert.credentialUrl || `https://techverse.dev/verify/${selectedCert.id}`) ? <Check size={13} className="text-emerald" /> : <Share2 size={13} />}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  className="btn-secondary text-xs p-1.5"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Official Printable Certificate Canvas */}
            <div className={`printable-certificate-sheet theme-${selectedCert.theme || 'emerald'}`} id="techverse-printable-certificate">
              <div className="certificate-ornate-border">
                <div className="certificate-inner-frame">
                  {/* Brand Header */}
                  <div className="cert-brand-row">
                    <div className="flex items-center gap-2.5">
                      <TechVerseSymbol size={32} />
                      <div>
                        <h2 className="cert-org-title">TECHVERSE</h2>
                        <span className="cert-org-sub">ACADEMY OF ENGINEERING & TECHNOLOGY</span>
                      </div>
                    </div>
                    <div className="cert-stamp-badge">
                      <span className="font-mono text-2xs font-bold text-emerald">OFFICIAL CREDENTIAL</span>
                      <span className="font-mono text-3xs text-muted">{selectedCert.id}</span>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="cert-main-body text-center">
                    <span className="cert-pre-text">THIS CERTIFIES THAT</span>
                    <h1 className="cert-recipient-name">{studentName}</h1>
                    <p className="cert-statement">
                      has successfully satisfied all rigorous curriculum requirements, practical programming laboratories, and algorithmic evaluations for
                    </p>
                    <h2 className="cert-degree-title">{selectedCert.title}</h2>
                    <p className="cert-sub-statement">
                      demonstrating validated technical competency, software engineering proficiency, and high academic performance.
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="cert-skills-summary">
                    <span className="cert-skills-label">VERIFIED COMPETENCIES:</span>
                    <span className="cert-skills-list">{(selectedCert.skills || []).join(' • ')}</span>
                  </div>

                  {/* Footer & Signatures */}
                  <div className="cert-footer-row">
                    <div className="cert-sig-block">
                      <div className="cert-sig-line">Dr. Elena Vance</div>
                      <span className="cert-sig-title">Dean of Software Engineering</span>
                      <span className="cert-sig-meta">TechVerse Academic Council</span>
                    </div>

                    {/* Official Foil Seal */}
                    <div className="cert-official-seal">
                      <div className="seal-ring">
                        <Award size={32} className="text-emerald" />
                        <span className="seal-text">VERIFIED</span>
                      </div>
                    </div>

                    <div className="cert-sig-block text-right">
                      <div className="cert-sig-line">{selectedCert.issuedDate}</div>
                      <span className="cert-sig-title">Date of Conferment</span>
                      <span className="cert-sig-meta">Score: {selectedCert.grade}</span>
                    </div>
                  </div>

                  {/* Verification Cryptographic Hash Footer */}
                  <div className="cert-crypto-footer">
                    <span>Verification Hash: SHA256:{selectedCert.id.replace(/-/g, '').toLowerCase()}8f9b2026e</span>
                    <span>Verify at: techverse.dev/verify</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;

