'use client';

import { useState, useMemo } from 'react';
import styles from './ManageUsersModal.module.css';

interface ManageUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_USERS = [
  { id: 'u1', name: 'Dr. Jane Smith', email: 'jane.smith@university.edu', role: 'admin', status: 'active', lastLogin: '10 mins ago' },
  { id: 'u2', name: 'Rahul Sharma', email: 'r.sharma23@student.edu', role: 'student', status: 'active', lastLogin: '2 hours ago' },
  { id: 'u3', name: 'Priya Patel', email: 'p.patel.staff@university.edu', role: 'staff', status: 'active', lastLogin: 'Yesterday' },
  { id: 'u4', name: 'Amit Kumar', email: 'amit.k99@student.edu', role: 'student', status: 'suspended', lastLogin: '2 weeks ago' },
  { id: 'u5', name: 'Sarah Connor', email: 's.connor@university.edu', role: 'admin', status: 'inactive', lastLogin: '1 month ago' },
  { id: 'u6', name: 'Vikram Singh', email: 'v.singh@university.edu', role: 'staff', status: 'active', lastLogin: '5 mins ago' },
];

export default function ManageUsersModal({ isOpen, onClose }: ManageUsersModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [searchTerm, roleFilter]);

  if (!isOpen) return null;

  const handleAction = (actionName: string, userName: string) => {
    alert(`${actionName} triggered for ${userName}. (Demo functionality)`);
  };

  const renderRoleBadge = (role: string) => {
    return <span className={`${styles.roleBadge} ${styles[role]}`}>{role.toUpperCase()}</span>;
  };

  const renderStatus = (status: string) => {
    return (
      <div className={styles.statusIndicator}>
        <span className={`${styles.statusDot} ${styles[status]}`}></span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>👥 Manage User Directory</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.toolbar}>
            <div className={styles.searchGroup}>
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className={styles.filterSelect}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">System Admins</option>
                <option value="staff">Canteen Staff</option>
                <option value="student">Students</option>
              </select>
            </div>
            
            <button className={styles.addUserButton} onClick={() => alert('Add User wizard coming soon!')}>
              <span style={{ fontSize: '18px' }}>+</span> 
              Add New User
            </button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.userTable}>
              <thead>
                <tr>
                  <th>User Details</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                      <p style={{ color: 'var(--color-text-muted)' }}>No users found matching your filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className={styles.userInfo}>
                          <div className={styles.avatar}>
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className={styles.userName}>{user.name}</p>
                            <p className={styles.userEmail}>{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>{renderRoleBadge(user.role)}</td>
                      <td>{renderStatus(user.status)}</td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <div className={styles.actionButtons} style={{ justifyContent: 'flex-end' }}>
                          <button className={styles.iconButton} title="Edit User" onClick={() => handleAction('Edit User', user.name)}>✏️</button>
                          <button className={styles.iconButton} title="Reset Password" onClick={() => handleAction('Password Reset', user.name)}>🔑</button>
                          <button className={`${styles.iconButton} ${styles.danger}`} title={user.status === 'suspended' ? 'Reactivate' : 'Suspend User'} onClick={() => handleAction(user.status === 'suspended' ? 'Reactivate' : 'Suspend', user.name)}>
                            {user.status === 'suspended' ? '🟢' : '🛑'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
