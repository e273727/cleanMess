# Phase 2.6: Contact Us Section

## Objective
Provide an easy, trustworthy way for prospects, investors, and collaborators to reach out. Build a functional contact form with client-side validation, backend form submission, and success/error feedback.

## Requirements Addressed
- CONTACT-01: Contact section exists with form
- CONTACT-02: Form includes required fields (name, email, message)
- CONTACT-03: Client-side validation (required fields, email format)
- CONTACT-04: Form submission via API route
- CONTACT-05: Success/error feedback to user

## Component Structure
```
src/app/page.tsx
  └─ ContactSection component
     ├─ Heading ("Get in Touch")
     ├─ Subheading (e.g., "Have questions? We'd love to hear from you.")
     ├─ ContactForm component
     │  ├─ Input: Name (required)
     │  ├─ Input: Email (required, email format)
     │  ├─ Textarea: Message (required, min 10 chars)
     │  ├─ Optional: Subject dropdown
     │  ├─ Checkbox: Privacy/terms (optional)
     │  ├─ Submit button
     │  └─ Feedback (success or error message)
     └─ Optional: Contact info (email, phone, social links)
```

## Content Guidelines
- **Heading**: "Get in Touch" or "Let's Talk"
- **Subheading**: "Have questions about CLEANMess? Want to partner? Let's chat."
- **Form Labels**: Clear, concise ("Your Name", "Your Email", "How can we help?")
- **Placeholder Text**: Helpful hints ("john@example.com", "Tell us about your use case...")
- **Button Text**: "Send Message" or "Get in Touch"
- **Success Message**: "Thanks for reaching out! We'll respond within 24 hours."
- **Error Message**: "Oops, something went wrong. Please try again."

## Technical Details

### Frontend (ContactForm.tsx)
- Use React `useState` for form state
- Client-side validation:
  - Name: non-empty, min 2 chars
  - Email: valid email format (regex or library)
  - Message: non-empty, min 10 chars
- Show inline error messages below each field
- Disable submit button during submission (loading state)
- Display success/error toast or alert after submission

### Backend (API Route: `src/app/api/contact/route.ts`)
- POST endpoint: `/api/contact`
- Accept JSON: `{ name, email, message }`
- Validate again server-side (defense in depth)
- Mock implementation: Log to console or save to in-memory array
- Optional: Send email via Nodemailer (requires setup) or use mailto fallback
- Return JSON response: `{ success: true/false, message: "..." }`

### Error Handling
- Network errors: "Network error. Please try again."
- Validation errors: Per-field inline messages
- Server errors: "Something went wrong on our end. Please try again later."

## Success Criteria
1. Form displays with all required fields (name, email, message)
2. Client-side validation triggers before submission:
   - Empty fields show "This field is required"
   - Invalid email format shows "Please enter a valid email"
   - Message less than 10 chars shows "Message must be at least 10 characters"
3. Submit button shows loading state (spinner or disabled) during submission
4. Successful submission shows success message and clears form
5. Failed submission shows error message; form remains filled
6. Form works on mobile (375px) and desktop (1440px)
7. No console errors

## Files to Create/Edit
- [ ] Create `src/components/sections/ContactSection.tsx`
- [ ] Create `src/components/sections/ContactSection.module.css`
- [ ] Create `src/components/ContactForm.tsx`
- [ ] Create `src/app/api/contact/route.ts` (POST handler)
- [ ] Create `src/hooks/useContactForm.ts` (form logic, optional)
- [ ] Update `src/app/page.tsx` to include `<ContactSection />`
- [ ] Add section ID anchor: `id="contact"`

## Status
- [ ] Not started
- [ ] In progress
- [ ] Complete
