import cases from '../content/cases';
import buzzCase from '../content/cases/case-01-buzz';
import gachaCase from '../content/cases/case-02-gacha';
import followerCase from '../content/cases/case-03-followers';
import type { Case } from '../content/cases/types';

// ケースデータの構造的整合性 + ゲーム性(正解判定可能性)テスト

describe('全ケース構造', () => {
  test('全ケースが id を持つ', () => {
    cases.forEach((c) => {
      expect(c.id).toMatch(/^case-/);
    });
  });

  test('プレイ可能ケースは5幕構造を持つ', () => {
    cases
      .filter((c) => !c.comingSoon)
      .forEach((c) => {
        expect(c.acts.length).toBe(5);
        expect(c.acts.map((a) => a.type)).toEqual([
          'commission',
          'crime_scene',
          'investigation',
          'deduction',
          'solution',
        ]);
      });
  });

  test('全プレイ可能ケースに characterId が設定されている', () => {
    cases
      .filter((c) => !c.comingSoon)
      .forEach((c) => {
        expect(c.client.characterId).toBeDefined();
      });
  });
});

const playableCases: Case[] = [buzzCase, gachaCase, followerCase];

describe('インタラクションの正解可能性', () => {
  test('全 choice インタラクションは少なくとも1つの isCorrect: true を持つ', () => {
    playableCases.forEach((c) => {
      c.acts.forEach((act) => {
        act.steps.forEach((step) => {
          if (step.interaction?.kind === 'choice') {
            const hasCorrect = step.interaction.options.some((o) => o.isCorrect);
            expect(hasCorrect).toBe(true);
          }
        });
      });
    });
  });

  test('全 slider_estimate インタラクションは min ≤ correctAnswer ≤ max', () => {
    playableCases.forEach((c) => {
      c.acts.forEach((act) => {
        act.steps.forEach((step) => {
          if (step.interaction?.kind === 'slider_estimate') {
            const { min, max, correctAnswer } = step.interaction;
            expect(correctAnswer).toBeGreaterThanOrEqual(min);
            expect(correctAnswer).toBeLessThanOrEqual(max);
          }
        });
      });
    });
  });

  test('全 formula_builder インタラクションは全スロットに対応するチップを持つ', () => {
    playableCases.forEach((c) => {
      c.acts.forEach((act) => {
        act.steps.forEach((step) => {
          if (step.interaction?.kind === 'formula_builder') {
            const slotIds = step.interaction.segments
              .filter((s) => s.kind === 'slot')
              .map((s) => (s as { kind: 'slot'; id: string }).id);
            slotIds.forEach((slotId) => {
              const hasMatchingChip = step.interaction!.kind === 'formula_builder' &&
                (step.interaction as { kind: 'formula_builder'; chips: { correctSlot: string }[] }).chips
                  .some((chip) => chip.correctSlot === slotId);
              expect(hasMatchingChip).toBe(true);
            });
          }
        });
      });
    });
  });

  test('全 evidence_matcher の各シナリオに対応する確率が存在する', () => {
    playableCases.forEach((c) => {
      c.acts.forEach((act) => {
        act.steps.forEach((step) => {
          if (step.interaction?.kind === 'evidence_matcher') {
            const probIds = new Set(step.interaction.probabilities.map((p) => p.id));
            step.interaction.scenarios.forEach((s) => {
              expect(probIds.has(s.correctProbId)).toBe(true);
            });
          }
        });
      });
    });
  });

  test('全 outlier_spotter は閾値を超える投稿を最低1件含む', () => {
    playableCases.forEach((c) => {
      c.acts.forEach((act) => {
        act.steps.forEach((step) => {
          if (step.interaction?.kind === 'outlier_spotter') {
            const likes = step.interaction.posts.map((p) => p.likes);
            const m = likes.reduce((a, b) => a + b, 0) / likes.length;
            const sd = Math.sqrt(
              likes.reduce((s, x) => s + (x - m) ** 2, 0) / likes.length
            );
            const trueOutliers = likes.filter(
              (x) => Math.abs((x - m) / sd) > step.interaction!.kind === 'outlier_spotter' &&
                (step.interaction as { threshold: number }).threshold
            );
            // 別の方法でチェック:閾値以上の値が存在するか
            if (step.interaction.kind === 'outlier_spotter') {
              const t = step.interaction.threshold;
              const count = likes.filter((x) => Math.abs((x - m) / sd) > t).length;
              expect(count).toBeGreaterThan(0);
            }
          }
        });
      });
    });
  });

  test('全 timeseries_anomaly の trueAnomalyIndices が weeklyDeltas の範囲内', () => {
    playableCases.forEach((c) => {
      c.acts.forEach((act) => {
        act.steps.forEach((step) => {
          if (step.interaction?.kind === 'timeseries_anomaly') {
            const n = step.interaction.weeklyDeltas.length;
            step.interaction.trueAnomalyIndices.forEach((i) => {
              expect(i).toBeGreaterThanOrEqual(0);
              expect(i).toBeLessThan(n);
            });
            // 真の異常が最低1件存在
            expect(step.interaction.trueAnomalyIndices.length).toBeGreaterThan(0);
          }
        });
      });
    });
  });
});

describe('ボス問題の存在', () => {
  test('各プレイ可能ケースの第5幕に「sol-boss-」で始まる連続インタラクションが3問以上ある', () => {
    playableCases.forEach((c) => {
      const solutionAct = c.acts.find((a) => a.type === 'solution');
      expect(solutionAct).toBeDefined();
      const bossSteps = solutionAct!.steps.filter(
        (s) => s.id.startsWith('sol-boss-') && s.type === 'interactive'
      );
      expect(bossSteps.length).toBeGreaterThanOrEqual(3);
    });
  });

  test('各ボス問題には3段階ヒントが設定されている', () => {
    playableCases.forEach((c) => {
      const solutionAct = c.acts.find((a) => a.type === 'solution');
      const bossSteps = solutionAct!.steps.filter(
        (s) => s.id.startsWith('sol-boss-') && s.type === 'interactive'
      );
      bossSteps.forEach((step) => {
        expect(step.hints).toBeDefined();
        expect(step.hints!.level1).toBeTruthy();
        expect(step.hints!.level2).toBeTruthy();
        expect(step.hints!.level3).toBeTruthy();
      });
    });
  });
});

describe('「次へ」ロックの仕様', () => {
  // CaseRunner の解錠条件:type === 'interactive' のステップは onCorrect 発火必須
  // ここでは「インタラクティブステップに interaction config が必ず存在する」契約を確認
  test('全 interactive ステップに interaction フィールドが定義されている', () => {
    playableCases.forEach((c) => {
      c.acts.forEach((act) => {
        act.steps.forEach((step) => {
          if (step.type === 'interactive') {
            expect(step.interaction).toBeDefined();
            expect(step.interaction!.kind).toBeTruthy();
          }
        });
      });
    });
  });
});
