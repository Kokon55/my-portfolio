'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDetectiveStore } from '@/lib/store';

function AuthInner() {
  const params = useSearchParams();
  const router = useRouter();
  const setPurchased = useDetectiveStore((s) => s.setPurchased);
  const [status, setStatus] = useState<'verifying' | 'ok' | 'fail'>('verifying');

  useEffect(() => {
    const email = params.get('email');
    const token = params.get('token');
    if (!email || !token) {
      setStatus('fail');
      return;
    }
    fetch(`/api/magic-link?email=${encodeURIComponent(email)}&token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setPurchased(email);
          setStatus('ok');
          setTimeout(() => router.push('/'), 1200);
        } else {
          setStatus('fail');
        }
      })
      .catch(() => setStatus('fail'));
  }, [params, setPurchased, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-paper p-4">
      <div className="max-w-sm w-full text-center">
        {status === 'verifying' && (
          <>
            <div className="text-amber-accent text-4xl mb-3 animate-pulse-slow">✦</div>
            <p className="text-slate-200">認証中…</p>
          </>
        )}
        {status === 'ok' && (
          <>
            <div className="text-emerald-400 text-4xl mb-3">✓</div>
            <p className="text-slate-100 font-detective text-xl">認証完了</p>
            <p className="text-xs text-slate-400 mt-1">事件簿に転送します</p>
          </>
        )}
        {status === 'fail' && (
          <>
            <div className="text-rose-400 text-4xl mb-3">✕</div>
            <p className="text-slate-100">リンクが無効か、期限切れです</p>
            <Link href="/purchase" className="inline-block mt-4 text-sm text-amber-accent">購入ページへ</Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <AuthInner />
    </Suspense>
  );
}
