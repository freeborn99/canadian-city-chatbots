import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = (await req.json()) as { password?: string };

    const adminToken = process.env.ADMIN_API_TOKEN || 'can-admin-2026-secure-token';

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password is required.' }, { status: 400 });
    }

    // Constant-time-ish comparison to mitigate timing attacks
    if (password.length !== adminToken.length) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    let match = true;
    for (let i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) !== adminToken.charCodeAt(i)) {
        match = false;
      }
    }

    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    // Return the token so the client can use it for subsequent API calls
    return NextResponse.json({
      status: 'SUCCESS',
      token: adminToken,
    });
  } catch {
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 });
  }
}
