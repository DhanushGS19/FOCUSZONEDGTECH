import React from 'react';
import { useUser } from '../context/UserContext';
import { Shield, Mail, Edit3, Camera } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="profile-container fade-in">
      <header className="mb-6">
        <h1>Profile</h1>
        <p className="text-muted">Manage your student identity</p>
      </header>

      <div className="profile-grid">
        <div className="profile-sidebar">
          <div className="glass-panel text-center mb-6">
            <div className="profile-avatar-lg mx-auto mb-4 relative">
              {user.name.charAt(0)}
              <button className="avatar-edit-btn"><Camera size={16} /></button>
            </div>
            <h2 className="text-2xl mb-1">{user.name}</h2>
            <p className="text-muted mb-4">{user.course} • {user.year}</p>
            <div className="level-badge inline-block mx-auto">
              Level {Math.floor(user.xp/1000) + 1}
            </div>
          </div>
          
          <div className="glass-panel">
            <h3 className="mb-4">Recent Badges</h3>
            <div className="badges-list flex flex-wrap gap-2">
              {user.badges.map((badge, i) => (
                <div key={i} className="badge-item">{badge}</div>
              ))}
              <div className="badge-item locked">🔒 Focus Warrior</div>
            </div>
          </div>
        </div>

        <div className="profile-main">
          <div className="glass-panel mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl">Personal Information</h2>
              <button className="icon-btn"><Edit3 size={18} /></button>
            </div>
            
            <div className="info-grid">
              <div className="info-group">
                <label>Full Name</label>
                <div className="info-value">{user.name}</div>
              </div>
              <div className="info-group">
                <label>Email</label>
                <div className="info-value">alex@student.edu</div>
              </div>
              <div className="info-group">
                <label>University</label>
                <div className="info-value">{user.university}</div>
              </div>
              <div className="info-group">
                <label>Course/Branch</label>
                <div className="info-value">{user.course}</div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel">
            <h2 className="text-xl mb-6">Learning Goals & Subjects</h2>
            
            <div className="mb-6">
              <h4 className="text-sm text-muted uppercase tracking-wider mb-3">Target Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {user.subjects.map((sub, i) => (
                  <span key={i} className="subject-tag">{sub}</span>
                ))}
                <button className="subject-tag add-new">+ Add</button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-muted uppercase tracking-wider mb-3">Account Settings</h4>
              <button className="flex items-center gap-2 text-muted hover-white mb-3 bg-transparent p-0">
                <Shield size={18} /> Privacy & Security
              </button>
              <button className="flex items-center gap-2 text-muted hover-white bg-transparent p-0">
                <Mail size={18} /> Email Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
