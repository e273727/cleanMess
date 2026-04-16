'use client';

import { useState } from 'react';
import styles from './SystemSettingsModal.module.css';

interface SystemSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemSettingsModal({ isOpen, onClose }: SystemSettingsModalProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 800);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className={styles.settingsContent}>
            <h3 className={styles.sectionTitle}>General System Configuration</h3>
            
            <div className={styles.settingGroup}>
              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingLabel}>Maintenance Mode</h4>
                  <p className={styles.settingDescription}>Suspend alerts and dashboards during scheduled maintenance.</p>
                </div>
                <div className={styles.settingAction}>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingLabel}>Data Retention Period</h4>
                  <p className={styles.settingDescription}>How long to keep historical sensor readings before archiving.</p>
                </div>
                <div className={styles.settingAction}>
                  <select className={styles.selectInput} defaultValue="30">
                    <option value="7">7 Days</option>
                    <option value="30">30 Days</option>
                    <option value="90">90 Days</option>
                    <option value="365">1 Year</option>
                  </select>
                </div>
              </div>

              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingLabel}>System Timezone</h4>
                  <p className={styles.settingDescription}>Timezone used for all timestamps and reports.</p>
                </div>
                <div className={styles.settingAction}>
                  <select className={styles.selectInput} defaultValue="UTC">
                    <option value="UTC">UTC (Universal)</option>
                    <option value="EST">EST (Eastern)</option>
                    <option value="PST">PST (Pacific)</option>
                    <option value="IST">IST (Indian Standard)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'sensors':
        return (
          <div className={styles.settingsContent}>
            <h3 className={styles.sectionTitle}>Sensor Telemetry Settings</h3>
            
            <div className={styles.settingGroup}>
              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingLabel}>Global Polling Interval</h4>
                  <p className={styles.settingDescription}>How often dashboards request new data from the edge network.</p>
                </div>
                <div className={styles.settingAction}>
                  <select className={styles.selectInput} defaultValue="5">
                    <option value="1">1 Second (High Load)</option>
                    <option value="5">5 Seconds</option>
                    <option value="10">10 Seconds</option>
                    <option value="30">30 Seconds</option>
                  </select>
                </div>
              </div>

              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingLabel}>Auto-Calibration Status</h4>
                  <p className={styles.settingDescription}>Allow IoT sensors to run self-calibration routines nightly.</p>
                </div>
                <div className={styles.settingAction}>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingLabel}>Alert Sensitivity Bias</h4>
                  <p className={styles.settingDescription}>Percentage of deviation before marking status as "Warning".</p>
                </div>
                <div className={styles.settingAction}>
                  <input type="number" className={styles.textInput} defaultValue="10" min="1" max="50" />
                  <span style={{ fontSize: 'var(--text-sm)' }}>%</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className={styles.settingsContent}>
            <h3 className={styles.sectionTitle}>Notification Rules</h3>
            
            <div className={styles.settingGroup}>
              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingLabel}>Email Alerts (Critical)</h4>
                  <p className={styles.settingDescription}>Send instant email to Admins when a Critical status is triggered.</p>
                </div>
                <div className={styles.settingAction}>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingLabel}>Daily Summary Reports</h4>
                  <p className={styles.settingDescription}>Compile a daily health score report and email to stakeholders.</p>
                </div>
                <div className={styles.settingAction}>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingLabel}>Webhook Endpoints</h4>
                  <p className={styles.settingDescription}>Forward alert JSON to external monitoring services (e.g. Slack).</p>
                </div>
                <div className={styles.settingAction}>
                  <input type="text" className={styles.textInput} style={{ width: '200px' }} placeholder="https://..." />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>🔧 System Settings</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close settings">
            ×
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.sidebar}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'general' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('general')}
            >
              ⚙️ General
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'sensors' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('sensors')}
            >
              📡 Telemetry
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'notifications' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              🔔 Notifications
            </button>
          </div>
          
          {renderContent()}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
}
