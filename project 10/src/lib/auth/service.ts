import hash from 'hash.js';
import type { AuthConfig, AuthState } from './types';

const AUTH_CONFIG_KEY = 'heal_auth_config';
const AUTH_STATE_KEY = 'heal_auth_state';

class AuthService {
  private config: AuthConfig | null = null;
  private state: AuthState = {
    isAuthenticated: false,
    isInitialized: false
  };

  constructor() {
    this.loadConfig();
    this.loadState();
  }

  private loadConfig() {
    const stored = localStorage.getItem(AUTH_CONFIG_KEY);
    if (stored) {
      this.config = JSON.parse(stored);
    }
  }

  private loadState() {
    const stored = localStorage.getItem(AUTH_STATE_KEY);
    if (stored) {
      this.state = JSON.parse(stored);
    }
  }

  private saveConfig() {
    if (this.config) {
      localStorage.setItem(AUTH_CONFIG_KEY, JSON.stringify(this.config));
    }
  }

  private saveState() {
    localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(this.state));
  }

  private hashPassword(password: string, salt: string): string {
    return hash.sha512().update(`${password}${salt}`).digest('hex');
  }

  isInitialized(): boolean {
    return this.state.isInitialized;
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  initialize(password: string, recoveryQuestion: string, recoveryAnswer: string): void {
    const salt = Math.random().toString(36).substring(2);
    const passwordHash = this.hashPassword(password, salt);
    const recoveryAnswerHash = this.hashPassword(recoveryAnswer.toLowerCase(), salt);

    this.config = {
      passwordHash,
      recoveryQuestion,
      recoveryAnswerHash,
      salt
    };

    this.state = {
      isAuthenticated: true,
      isInitialized: true
    };

    this.saveConfig();
    this.saveState();
  }

  login(password: string): boolean {
    if (!this.config) return false;

    const hash = this.hashPassword(password, this.config.salt);
    const isValid = hash === this.config.passwordHash;

    if (isValid) {
      this.state.isAuthenticated = true;
      this.saveState();
    }

    return isValid;
  }

  verifyRecoveryAnswer(answer: string): boolean {
    if (!this.config) return false;

    const hash = this.hashPassword(answer.toLowerCase(), this.config.salt);
    return hash === this.config.recoveryAnswerHash;
  }

  resetPassword(newPassword: string): void {
    if (!this.config) return;

    const passwordHash = this.hashPassword(newPassword, this.config.salt);
    this.config.passwordHash = passwordHash;
    this.state.isAuthenticated = true;
    
    this.saveConfig();
    this.saveState();
  }

  logout(): void {
    this.state.isAuthenticated = false;
    this.saveState();
  }

  getRecoveryQuestion(): string | null {
    return this.config?.recoveryQuestion || null;
  }
}

export const authService = new AuthService();