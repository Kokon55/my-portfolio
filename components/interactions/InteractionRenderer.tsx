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

export default function InteractionRenderer({
  interaction,
  onCorrect,
}: {
  interaction: InteractionConfig;
  onCorrect?: () => void;
}) {
  switch (interaction.kind) {
    case 'sns_profile':
      return <SnsProfile profile={interaction.profile} />;
    case 'gacha_screen':
      return <GachaScreen results={interaction.results} />;
    case 'engagement_calc':
      return <EngagementCalc influencers={interaction.influencers} />;
    case 'distribution_compare':
      return <DistributionCompare datasets={interaction.datasets} />;
    case 'follower_growth':
      return <FollowerGrowth series={interaction.series} />;
    case 'gacha_simulator':
      return <GachaSimulator rate={interaction.rate} defaultPulls={interaction.defaultPulls} />;
    case 'binomial_explorer':
      return <BinomialExplorer defaultN={interaction.defaultN} defaultP={interaction.defaultP} />;
    case 'choice':
      return <ChoiceQuestion question={interaction.question} options={interaction.options} onCorrect={onCorrect} />;
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
      return <TrueScoreReveal influencers={interaction.influencers} />;
    default:
      return null;
  }
}
