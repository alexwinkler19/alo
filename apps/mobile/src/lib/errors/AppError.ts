/**
 * Custom application error classes
 *
 * These error classes provide structured error handling with user-friendly messages
 * and proper categorization for logging and debugging.
 */

/**
 * Base application error class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
    public userMessage?: string
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  /**
   * Get user-facing error message
   */
  getUserMessage(): string {
    return this.userMessage || 'An unexpected error occurred. Please try again.';
  }
}

/**
 * Authentication-related errors
 */
export class AuthError extends AppError {
  constructor(message: string, code: string = 'AUTH_ERROR', userMessage?: string) {
    super(message, code, 401, userMessage);
    this.name = 'AuthError';
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

/**
 * Network-related errors
 */
export class NetworkError extends AppError {
  constructor(message: string, code: string = 'NETWORK_ERROR', userMessage?: string) {
    super(
      message,
      code,
      0,
      userMessage || 'Network error. Please check your connection and try again.'
    );
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * Validation errors (form input, API validation)
 */
export class ValidationError extends AppError {
  constructor(
    message: string,
    public fields?: Record<string, string>,
    userMessage?: string
  ) {
    super(message, 'VALIDATION_ERROR', 400, userMessage || 'Please check your input and try again.');
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Not found errors (resources, routes)
 */
export class NotFoundError extends AppError {
  constructor(resource: string, userMessage?: string) {
    super(
      `${resource} not found`,
      'NOT_FOUND',
      404,
      userMessage || `The ${resource} you're looking for could not be found.`
    );
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Permission/authorization errors
 */
export class PermissionError extends AppError {
  constructor(action: string, userMessage?: string) {
    super(
      `Permission denied: ${action}`,
      'PERMISSION_DENIED',
      403,
      userMessage || "You don't have permission to perform this action."
    );
    this.name = 'PermissionError';
    Object.setPrototypeOf(this, PermissionError.prototype);
  }
}

/**
 * Server errors
 */
export class ServerError extends AppError {
  constructor(message: string, code: string = 'SERVER_ERROR', userMessage?: string) {
    super(
      message,
      code,
      500,
      userMessage || 'A server error occurred. Our team has been notified.'
    );
    this.name = 'ServerError';
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
