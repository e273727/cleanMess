'use client';

import { useState } from 'react';
import styles from './BroadcastAlertModal.module.css';

interface BroadcastAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BroadcastAlertModal({ isOpen, onClose }: BroadcastAlertModalProps) {
  const [target, setTarget] = useState('all');
  const [severity, setSeverity] = useState('info');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [channels, setChannels] = useState({
    dashboard: true,
    email: false,
    sms: false,
    push: false,
  });

  if (!isOpen) return null;

  const handleSend = () => {
    if (!title || !message) {
      alert('Please provide a title and a message body.');
      return;
    }

    setIsSending(true);
    // Simulate network request
    setTimeout(() => {
      setIsSending(false);
      
      // Reset form on success
      setTitle('');
      setMessage('');
      setSeverity('info');
      setTarget('all');
      setChannels({ dashboard: true, email: false, sms: false, push: false });
      
      onClose();
      // Use setTimeout to allow the modal to close before showing the alert
      setTimeout(() => alert('Broadcast Alert successfully sent!'), 100);
    }, 1200);
  };

  const handleChannelToggle = (channel: keyof typeof channels) => {
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>📢 Broadcast System Alert</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className={styles.modalBody}>
          {/* Form Section */}
          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Target Audience</label>
              <select 
                className={styles.select} 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              >
                <option value="all">All Users (Students, Staff, Admins)</option>
                <option value="students">Students Only</option>
                <option value="staff">Canteen Staff & Management</option>
                <option value="specific">Specific Canteen Node (Select...)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Alert Severity</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="severity" 
                    value="info" 
                    checked={severity === 'info'} 
                    onChange={() => setSeverity('info')}
                  />
                  Information
                </label>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="severity" 
                    value="warning" 
                    checked={severity === 'warning'} 
                    onChange={() => setSeverity('warning')}
                  />
                  Warning
                </label>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="severity" 
                    value="critical" 
                    checked={severity === 'critical'} 
                    onChange={() => setSeverity('critical')}
                  />
                  Critical Emergency
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Alert Title</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="e.g. Water Supply Maintenance"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Message Body</label>
              <textarea 
                className={styles.textarea} 
                placeholder="Type the full details of your alert here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Delivery Channels</label>
              <div className={styles.checkboxGrid}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={channels.dashboard} 
                    onChange={() => handleChannelToggle('dashboard')}
                  />
                  Dashboard Banner
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={channels.push} 
                    onChange={() => handleChannelToggle('push')}
                  />
                  Mobile Push Notification
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={channels.email} 
                    onChange={() => handleChannelToggle('email')}
                  />
                  Email Blast
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={channels.sms} 
                    onChange={() => handleChannelToggle('sms')}
                  />
                  SMS Text (Critical Only)
                </label>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className={styles.previewSection}>
            <h3 className={styles.sectionTitle}>Live Preview</h3>
            <p className={styles.label} style={{ fontWeight: 'normal', color: 'var(--color-text-muted)' }}>
              This is how the alert will appear on user dashboards:
            </p>
            
            <div className={`${styles.previewBox} ${styles[`severity-${severity}`]}`}>
              <div className={styles.previewHeader}>
                <span className={`${styles.previewTag} ${styles[`tag-${severity}`]}`}>
                  {severity.toUpperCase()}
                </span>
                <span className={styles.previewMeta}>Just now</span>
              </div>
              <h4 className={styles.previewTitle}>
                {title || 'Alert Title Appears Here'}
              </h4>
              <p className={styles.previewBody}>
                {message || 'The full message body will be displayed here. Useful for providing context to the students or staff regarding the alert.'}
              </p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-lg)' }}>
              <p className={styles.previewMeta}>
                <strong>Audience:</strong> {target === 'all' ? 'All Users' : target === 'students' ? 'Students' : target === 'staff' ? 'Staff' : 'Selected Nodes'}
                <br />
                <strong>Channels:</strong> {[
                  channels.dashboard && 'Dashboard', 
                  channels.email && 'Email', 
                  channels.push && 'Push', 
                  channels.sms && 'SMS'
                ].filter(Boolean).join(', ') || 'None selected'}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose} disabled={isSending}>
            Cancel
          </button>
          <button 
            className={`${styles.sendButton} ${isSending ? styles.loading : ''}`} 
            onClick={handleSend} 
            disabled={isSending}
          >
            {isSending ? '🚀 Broadcasting...' : '🚀 Broadcast Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
