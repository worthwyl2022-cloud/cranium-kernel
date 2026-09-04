import { CanonEntry } from './types';

export interface ContradictionResult {
  hasClash: boolean;
  severity: 'NONE' | 'PROVISIONAL_FLAG' | 'DEFINITE_CONTRADICTION';
  conflictingCanonTopic?: string;
  clashExplanation?: string;
  matchedRule?: string;
  confidenceScore: number;
}

export class CanonLane {
  static evaluateContradiction(
    candidateText: string,
    canonEntries: CanonEntry[]
  ): ContradictionResult {
    const lower = candidateText.toLowerCase();

    for (const canon of canonEntries) {
      const topicLower = canon.topic.toLowerCase();

      // Rule 1: Overclaiming RAG superiority
      if (
        (lower.includes('rag') &&
          (lower.includes('proven better') ||
            lower.includes('superiority') ||
            lower.includes('outperforms') ||
            lower.includes('beat naive rag') ||
            lower.includes('beats naive rag') ||
            lower.includes('beat rag') ||
            lower.includes('superior recall'))) &&
        topicLower.includes('rag')
      ) {
        return {
          hasClash: true,
          severity: 'DEFINITE_CONTRADICTION',
          conflictingCanonTopic: canon.topic,
          clashExplanation:
            'Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred.',
          matchedRule: 'CANON_RAG_SUPERIORITY_BAR',
          confidenceScore: 0.99,
        };
      }

      // Rule 2: Identity dilution into chat history
      if (
        (lower.includes('identity') || lower.includes('human intent') || lower.includes('intent')) &&
        (lower.includes('chat history') ||
          lower.includes('discard') ||
          lower.includes('ephemeral') ||
          lower.includes('dilute') ||
          lower.includes('ignore')) &&
        topicLower.includes('identity')
      ) {
        return {
          hasClash: true,
          severity: 'DEFINITE_CONTRADICTION',
          conflictingCanonTopic: canon.topic,
          clashExplanation:
            'Violates sovereign Canon: Human identity and intent are first-class sovereign constraints, not transient context to be diluted.',
          matchedRule: 'CANON_IDENTITY_SOVEREIGNTY',
          confidenceScore: 0.96,
        };
      }

      // Rule 3: NLI CrossEncoder claims
      if (
        (lower.includes('crossencoder') || lower.includes('cross-encoder')) &&
        (lower.includes('production') ||
          lower.includes('trained') ||
          lower.includes('android') ||
          lower.includes('native') ||
          lower.includes('on-device')) &&
        (topicLower.includes('nli') || topicLower.includes('contradiction'))
      ) {
        return {
          hasClash: true,
          severity: 'DEFINITE_CONTRADICTION',
          conflictingCanonTopic: canon.topic,
          clashExplanation:
            'Contradicts honesty disclosure: Substrate uses NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder.',
          matchedRule: 'CANON_NLI_HONESTY_DISCLOSURE',
          confidenceScore: 0.94,
        };
      }

      // Rule 4: Multi-tenant battle tested claim
      if (
        (lower.includes('multi-tenant') ||
          lower.includes('battle-tested') ||
          lower.includes('trillion token')) &&
        (topicLower.includes('architecture') || topicLower.includes('scale'))
      ) {
        return {
          hasClash: true,
          severity: 'DEFINITE_CONTRADICTION',
          conflictingCanonTopic: canon.topic,
          clashExplanation:
            'Contradicts architecture canon: Single-process / in-memory substrate field; project isolation is designed, not battle-tested at scale.',
          matchedRule: 'CANON_SCALE_ACCURACY',
          confidenceScore: 0.92,
        };
      }
    }

    return {
      hasClash: false,
      severity: 'NONE',
      confidenceScore: 0.05,
    };
  }
}
