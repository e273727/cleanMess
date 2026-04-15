'use client';

import { useState } from 'react';
import styles from './ContactSection.module.css';

interface FormState {
  name: string;
  email: string;
  message: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    status: 'idle',
    errorMessage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      setForm((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Please enter your name',
      }));
      return false;
    }

    if (!form.email.trim()) {
      setForm((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Please enter your email',
      }));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setForm((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Please enter a valid email address',
      }));
      return false;
    }

    if (!form.message.trim()) {
      setForm((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Please enter your message',
      }));
      return false;
    }

    if (form.message.trim().length < 10) {
      setForm((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Message must be at least 10 characters',
      }));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setForm((prev) => ({
      ...prev,
      status: 'loading',
      errorMessage: '',
    }));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setForm({
        name: '',
        email: '',
        message: '',
        status: 'success',
        errorMessage: '',
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setForm((prev) => ({
          ...prev,
          status: 'idle',
        }));
      }, 3000);
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      }));
    }
  };

  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Contact Us</h2>
          <p className={styles.subtitle}>
            Have questions about CLEANMess? Want to discuss integration with your institution? We'd love to hear from you.
          </p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={styles.input}
              disabled={form.status === 'loading'}
            />
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={styles.input}
              disabled={form.status === 'loading'}
            />
          </div>

          {/* Message Field */}
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your institution and how CLEANMess can help..."
              className={styles.textarea}
              rows={6}
              disabled={form.status === 'loading'}
            />
          </div>

          {/* Error Message */}
          {form.status === 'error' && (
            <div className={styles.errorMessage} role="alert">
              {form.errorMessage}
            </div>
          )}

          {/* Success Message */}
          {form.status === 'success' && (
            <div className={styles.successMessage} role="status">
              ✓ Thanks for reaching out! We'll respond within 24 hours.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={form.status === 'loading' || form.status === 'success'}
          >
            {form.status === 'loading' ? 'Sending...' : 'Send Message'}
            {form.status !== 'loading' && <span className={styles.arrow}>→</span>}
          </button>
        </form>

        {/* Additional Info */}
        <div className={styles.info}>
          <p className={styles.infoText}>
            We typically respond to inquiries within 24 hours during business days.
          </p>
        </div>
      </div>
    </section>
  );
}
