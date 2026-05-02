import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'データ探偵 SNS編 - 数字の嘘を見抜く統計ゲーム | 高校数学で読み解くSNS時代のリテラシー',
  description:
    'バズの真実、フォロワー操作、ガチャ確率、レビュー詐欺、世論調査の罠 - SNSとインターネットで日常的に出会う数字の謎を、高校数学(データの分析・確率・統計)で解明していく探偵ゲーム。',
  keywords: [
    'データ探偵',
    '統計',
    '高校数学',
    'SNS',
    'リテラシー',
    'ガチャ',
    '確率',
    'データの分析',
    '統計検定',
  ],
  openGraph: {
    title: 'データ探偵 SNS編 - 数字の嘘を見抜く',
    description: 'SNSの数字に、嘘がある。高校数学で読み解くSNS時代のリテラシー探偵ゲーム。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="dark">
      <body>{children}</body>
    </html>
  );
}
