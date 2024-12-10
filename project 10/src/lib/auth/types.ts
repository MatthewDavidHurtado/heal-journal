import { z } from 'zod';

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long');

export const recoveryAnswerSchema = z.string()
  .min(3, 'Answer must be at least 3 characters')
  .max(100, 'Answer is too long');

export interface AuthConfig {
  passwordHash: string;
  recoveryQuestion: string;
  recoveryAnswerHash: string;
  salt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
}