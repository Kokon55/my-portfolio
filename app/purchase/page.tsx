'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDetectiveStore } from '@/lib/store';
import { IS_FREE_MODE } from '@/lib/config';

function PurchaseInner() {
  const params = useSearchParams();
  const router = useRouter();
  const success = params.get('success') === '1';
  const canceled = params.get('canceled') === '1';
  const successEmail = params.get('email');

  const isPurchased = useDetectiveStore((s) => s.isPurchased);
  const setPurchased = useDetectiveStore((s) => s.setPurchased);
  const clearPurchase = useDetectiveStore((s) => s.clearPurchase);

  const [email, setEmail] = useState('');
  const [isEarlyBird, setIsEarlyBird] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLink, setMagicLink] = useState<string | null>(null);

  // 無料公開モードでは購入ページを表示せず、トップへ
  useEffect(() => {
    if (IS_FREE_MODE) router.replace('/');
  }, [router]);

  useEffect(() => {
    if (success && successEmail) setPurchased(successEmail);
  }, [success, successEmail, setPurchased]);

  if (IS_FREE_MODE) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <p className="text-slate-300 mb-3">本作品は現在、無料で公開中です。</p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-xl bg-amber-accent text-slate-900 font-bold"
          >
            事件簿へ
          </Link>
        </div>
      </main>
    );
  }

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, isEarlyBird }),
      });
      const data = await res.json();
      if (!res.ok) {
        // 開発環境用のフォールバック:Stripe が設定されていなければマジックリンク発行のみ
        if (data.error?.includes('Stripe')) {
          setError('Stripe未設定の開発環境では、下部の「マジックリンク発行」で購入を完了させてください。');
        } else {
          setError(data.error ?? 'エラーが発生しました');
        }
      } else if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const issueMagicLink = async () => {
    setError(null);
    const res = await fetch('/api/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'エラー');
    } else {
      setMagicLink(data.link);
    }
  };

  if (isPurchased) {
    return (
      <main className="min-h-screen bg-paper">
        <div className="max-w-xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-amber-accent/40 bg-gradient-to-br from-amber-950/30 to-slate-950 p-6 text-center"
          >
            <div className="text-amber-accent text-4xl mb-2">✦</div>
            <h1 className="font-detective text-2xl text-slate-100">事件簿が解放されました</h1>
            <p className="text-sm text-slate-400 mt-2">
              全ケースに永久アクセス可能。修了証は全6ケース解決後に発行されます。
            </p>
            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 rounded-xl bg-amber-accent text-slate-900 font-bold active:scale-95"
            >
              事件簿へ
            </Link>
            <button
              onClick={() => { clearPurchase(); }}
              className="block mx-auto mt-4 text-xs text-slate-500 hover:text-slate-300"
            >
              購入状態をリセット(テスト用)
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper">
      <div className="max-w-xl mx-auto px-4 py-12">
        <Link href="/" className="text-xs text-slate-500 hover:text-amber-accent">← 事件簿に戻る</Link>

        <h1 className="font-detective text-3xl text-slate-100 mt-3">
          全ての事件を、解放する
        </h1>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
          <div>
            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-bold text-amber-accent">¥{(isEarlyBird ? 1980 : 2480).toLocaleString()}</div>
              {isEarlyBird && (
                <div className="text-sm text-slate-400 line-through">¥2,480</div>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">買い切り / 永久アクセス / 税込</p>
            <label className="flex items-center gap-2 mt-3 text-sm text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={isEarlyBird}
                onChange={(e) => setIsEarlyBird(e.target.checked)}
                className="w-4 h-4 accent-amber-accent"
              />
              早期割引を適用(先着100名・¥500 OFF)
            </label>
          </div>

          <ul className="space-y-1.5 text-sm text-slate-200 border-t border-slate-800 pt-4">
            <li>✓ 全6ケース永久アクセス</li>
            <li>✓ ケース1・2 すぐにプレイ可能</li>
            <li>✓ ケース3〜6 順次追加(追加料金なし)</li>
            <li>✓ 全推理パート + 修了証PDF</li>
            <li>✓ 高校数学I・A・B 統計分野完全網羅</li>
          </ul>

          <div className="space-y-2 border-t border-slate-800 pt-4">
            <label className="text-xs text-slate-400" htmlFor="email">メールアドレス(永久アクセス用)</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-accent"
            />
          </div>

          <button
            onClick={checkout}
            disabled={loading || !email.includes('@')}
            className="w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold disabled:opacity-50 active:scale-95 transition shadow-lg shadow-amber-500/20"
          >
            {loading ? '処理中…' : 'Stripeで決済して解放'}
          </button>

          {canceled && (
            <p className="text-xs text-rose-300">決済がキャンセルされました。もう一度お試しください。</p>
          )}
          {error && (
            <p className="text-xs text-rose-300 bg-rose-950/30 border border-rose-900/50 rounded p-2">{error}</p>
          )}

          <details className="border-t border-slate-800 pt-3">
            <summary className="text-xs text-slate-500 cursor-pointer hover:text-amber-accent">
              開発・テスト用: マジックリンクで購入状態を有効化
            </summary>
            <div className="mt-2 space-y-2">
              <p className="text-[11px] text-slate-500">
                Stripe を経由せず、マジックリンクのみで購入状態を有効化します。本番では使用しません。
              </p>
              <button
                onClick={issueMagicLink}
                disabled={!email.includes('@')}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm disabled:opacity-50"
              >
                マジックリンクを発行
              </button>
              {magicLink && (
                <div className="text-xs text-slate-300 space-y-2">
                  <div className="break-all bg-slate-950 p-2 rounded border border-slate-800">{magicLink}</div>
                  <a
                    href={magicLink}
                    className="block text-center px-3 py-2 rounded-lg bg-amber-accent/80 text-slate-900 font-semibold"
                  >
                    このリンクで認証
                  </a>
                </div>
              )}
            </div>
          </details>
        </div>

        <p className="text-[11px] text-slate-600 mt-6 text-center">
          ※ 本作品に登場するSNS・企業・ゲームは全て架空のものです。実在のサービス・商品とは関係ありません。
        </p>
      </div>
    </main>
  );
}

export default function PurchasePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <PurchaseInner />
    </Suspense>
  );
}
