import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// 簡易的なマジックリンク発行 API。
// 本番ではメール送信(Resend/SendGrid 等)をここに統合する。
// MVPでは「リンクを発行 → URLを画面に表示」する形にして、メール送信なしで
// 購入者が永久アクセスできるようにする。

const SECRET = process.env.MAGIC_LINK_SECRET ?? 'dev-only-secret-replace-in-production';

const sign = (email: string): string => {
  return crypto.createHmac('sha256', SECRET).update(email).digest('hex').slice(0, 32);
};

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: '有効なメールアドレスを入力してください' }, { status: 400 });
  }
  const token = sign(email);
  const origin = req.headers.get('origin') ?? '';
  const link = `${origin}/auth?email=${encodeURIComponent(email)}&token=${token}`;
  return NextResponse.json({ link, token });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');
  if (!email || !token) return NextResponse.json({ valid: false });
  return NextResponse.json({ valid: sign(email) === token });
}
