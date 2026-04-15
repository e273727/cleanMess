import { NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate inputs
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Log the contact form submission (in production, send email or save to database)
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log(`Name: ${body.name}`);
    console.log(`Email: ${body.email}`);
    console.log(`Message: ${body.message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('===================================');

    // TODO: In production, integrate with:
    // - Email service (Nodemailer, SendGrid, Resend, etc.)
    // - Database (Supabase, MongoDB, PostgreSQL, etc.)
    // - CRM (HubSpot, Salesforce, etc.)

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
