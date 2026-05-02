'use client';

import type { InteractionConfig } from '@/content/cases/types';
import SnsProfile from '../sns/SnsProfile';
import GachaScreen from '../sns/GachaScreen';
import EngagementCalc from './EngagementCalc';
import DistributionCompare from './DistributionCompare';
import FollowerGrowth from './FollowerGrowth';
import GachaSimulator from './GachaSimulator';
import BinomialExplorer from './BinomialExplorer';
import ChoiceQuestion from './ChoiceQuestion';
import SliderEstimate from './SliderEstimate';
import TrueScoreReveal from './TrueScoreReveal';
import OutlierSpotter from './OutlierSpotter';
import FormulaBuilder from './FormulaBuilder';
import EvidenceMatcher from './EvidenceMatcher';
import MathSandbox from './MathSandbox';
import TimeSeriesAnomaly from './TimeSeriesAnomaly';
import ConfirmDisplay from './ConfirmDisplay';

// onCorrect は「このステップを完了したと見なせる」シグナル。
// 全13種すべてに接続し、CaseRunner の「次へ」ボタンの解錠条件として使う。
export default function InteractionRenderer({
  interaction,
  onCorrect,
}: {
  interaction: InteractionConfig;
  onCorrect?: () => void;
}) {
  switch (interaction.kind) {
    case 'sns_profile':
      return (
        <ConfirmDisplay onCorrect={onCorrect} confirmLabel="プロフィールを確認した">
          <SnsProfile profile={interaction.profile} />
        </ConfirmDisplay>
      );
    case 'gacha_screen':
      return (
        <ConfirmDisplay onCorrect={onCorrect} confirmLabel="結果を確認した">
          <GachaScreen results={interaction.results} />
        </ConfirmDisplay>
      );
    case 'engagement_calc':
      return <EngagementCalc influencers={interaction.influencers} onCorrect={onCorrect} />;
    case 'distribution_compare':
      return (
        <ConfirmDisplay onCorrect={onCorrect} confirmLabel="分布の違いを確認した">
          <DistributionCompare datasets={interaction.datasets} />
        </ConfirmDisplay>
      );
    case 'follower_growth':
      return (
        <ConfirmDisplay onCorrect={onCorrect} confirmLabel="成長カーブを確認した">
          <FollowerGrowth series={interaction.series} />
        </ConfirmDisplay>
      );
    case 'gacha_simulator':
      return (
        <GachaSimulator
          rate={interaction.rate}
          defaultPulls={interaction.defaultPulls}
          onCorrect={onCorrect}
        />
      );
    case 'binomial_explorer':
      return (
        <BinomialExplorer
          defaultN={interaction.defaultN}
          defaultP={interaction.defaultP}
          onCorrect={onCorrect}
        />
      );
    case 'choice':
      return (
        <ChoiceQuestion
          question={interaction.question}
          options={interaction.options}
          onCorrect={onCorrect}
        />
      );
    case 'slider_estimate':
      return (
        <SliderEstimate
          question={interaction.question}
          min={interaction.min}
          max={interaction.max}
          step={interaction.step}
          correctAnswer={interaction.correctAnswer}
          tolerance={interaction.tolerance}
          unit={interaction.unit}
          correctFeedback={interaction.correctFeedback}
          wrongFeedback={interaction.wrongFeedback}
          onCorrect={onCorrect}
        />
      );
    case 'true_score':
      return <TrueScoreReveal influencers={interaction.influencers} onCorrect={onCorrect} />;
    case 'outlier_spotter':
      return (
        <OutlierSpotter
          posts={interaction.posts}
          threshold={interaction.threshold}
          question={interaction.question}
          successFeedback={interaction.successFeedback}
          partialFeedback={interaction.partialFeedback}
          onCorrect={onCorrect}
        />
      );
    case 'formula_builder':
      return (
        <FormulaBuilder
          question={interaction.question}
          segments={interaction.segments}
          chips={interaction.chips}
          successFeedback={interaction.successFeedback}
          failFeedback={interaction.failFeedback}
          onCorrect={onCorrect}
        />
      );
    case 'evidence_matcher':
      return (
        <EvidenceMatcher
          question={interaction.question}
          scenarios={interaction.scenarios}
          probabilities={interaction.probabilities}
          successFeedback={interaction.successFeedback}
          onCorrect={onCorrect}
        />
      );
    case 'math_sandbox':
      return (
        <MathSandbox
          scenario={interaction.scenario}
          task={interaction.task}
          onCorrect={onCorrect}
        />
      );
    case 'timeseries_anomaly':
      return (
        <TimeSeriesAnomaly
          question={interaction.question}
          weeklyDeltas={interaction.weeklyDeltas}
          trueAnomalyIndices={interaction.trueAnomalyIndices}
          successFeedback={interaction.successFeedback}
          partialFeedback={interaction.partialFeedback}
          onCorrect={onCorrect}
        />
      );
    default:
      return null;
  }
}
