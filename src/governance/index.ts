export {
  GovernedKernelPort,
  type GovernanceContext,
  type GovernanceEvaluation,
} from './GovernanceBoundary';
export {
  SynapseRuntimeAdapter,
  createSynapseAttestation,
  isProtectedDisposition,
  makeTracePayload,
  validateSynapseAttestation,
  type SynapseAdmission,
  type SynapseAssessmentInput,
  type SynapsePolicyEnvelope,
} from './SynapseRuntimeAdapter';
export {
  CraniumCoreTransactionGate,
  hashTransactionValue,
  type ActionExecutionResult,
  type CoreAuthorityEnvelope,
  type CoreDecision,
  type CoreIssuedSynapseEnvelope,
  type GovernanceReceipt,
  type GovernedTool,
  type ProposedAction,
  type SynapseDisposition,
  type SynapseEnvelopeConfig,
  type SynapseTransactionAttestation,
  type TransactionJson,
  type TransactionRiskTier,
} from './SynapseCoreTransaction';
