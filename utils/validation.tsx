export const UserValidationUtils = {
    isNotEmpty(value: string): boolean {
      return value.trim().length > 0;
    },
  
    matchesPattern(value: string, pattern: RegExp): boolean {
      return pattern.test(value);
    },
  
    validateAccount(account: string): boolean {
      const accountPattern = /^[a-zA-Z0-9._-]{5,}$/;
      return this.isNotEmpty(account) && this.matchesPattern(account, accountPattern);
    },
  
    validatePassword(password: string): boolean {
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      return this.isNotEmpty(password) && this.matchesPattern(password, passwordPattern);
    }
  };
  