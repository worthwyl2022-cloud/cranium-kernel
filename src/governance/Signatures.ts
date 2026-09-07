export type TrustedSubject = 'CORE' | 'SYNAPSE_RUNTIME' | 'HUMAN_APPROVER' | 'GATEWAY';

export interface TrustedKey {
  keyId: string;
  subject: TrustedSubject;
  publicKey: string;
  validFrom: string;
  validUntil?: string;
  revokedAt?: string;
}

export interface SignedPayload {
  keyId: string;
  subject: TrustedSubject;
  algorithm: 'Ed25519';
  payload: string;
  signature: string;
}

function bytes(value: string): ArrayBuffer {
  return new TextEncoder().encode(value).buffer as ArrayBuffer;
}

function base64(value: ArrayBuffer): string {
  const data = new Uint8Array(value);
  let output = '';
  for (const byte of data) output += String.fromCharCode(byte);
  return btoa(output);
}

function fromBase64(value: string): ArrayBuffer {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0)).buffer as ArrayBuffer;
}

export async function generateEd25519KeyPair(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']) as Promise<CryptoKeyPair>;
}

export async function exportPublicKey(key: CryptoKey): Promise<string> {
  return base64(await crypto.subtle.exportKey('raw', key));
}

export async function signPayload(
  payload: string,
  keyId: string,
  subject: TrustedSubject,
  privateKey: CryptoKey
): Promise<SignedPayload> {
  const signature = await crypto.subtle.sign('Ed25519', privateKey, bytes(payload));
  return { keyId, subject, algorithm: 'Ed25519', payload, signature: base64(signature) };
}

export class TrustedKeyRegistry {
  private readonly keys = new Map<string, TrustedKey>();

  register(key: TrustedKey): void { this.keys.set(key.keyId, key); }

  async verify(signed: SignedPayload, now: string): Promise<{ valid: boolean; reason: string }> {
    const trusted = this.keys.get(signed.keyId);
    if (!trusted) return { valid: false, reason: 'UNKNOWN_KEY_ID' };
    if (trusted.subject !== signed.subject) return { valid: false, reason: 'KEY_ROLE_MISMATCH' };
    if (trusted.revokedAt && trusted.revokedAt <= now) return { valid: false, reason: 'KEY_REVOKED' };
    if (trusted.validFrom > now || (trusted.validUntil && trusted.validUntil <= now)) return { valid: false, reason: 'KEY_OUTSIDE_VALIDITY_WINDOW' };
    if (signed.algorithm !== 'Ed25519') return { valid: false, reason: 'UNSUPPORTED_SIGNATURE_ALGORITHM' };

    try {
      const publicKey = await crypto.subtle.importKey('raw', fromBase64(trusted.publicKey), { name: 'Ed25519' }, false, ['verify']);
      const valid = await crypto.subtle.verify('Ed25519', publicKey, fromBase64(signed.signature), bytes(signed.payload));
      return valid ? { valid: true, reason: 'SIGNATURE_VALID' } : { valid: false, reason: 'SIGNATURE_INVALID' };
    } catch {
      return { valid: false, reason: 'SIGNATURE_MALFORMED' };
    }
  }
}
