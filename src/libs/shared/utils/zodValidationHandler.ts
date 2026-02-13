import { ZodError } from 'zod';

export class ValidationError extends Error {
  constructor(message: string, public errors: ZodError) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function zodValidationHandler<T>(
  validation: { success: boolean; data?: T; error?: ZodError }
): asserts validation is { success: true; data: T } {
  if (!validation.success) {
    const errorMessages = validation.error?.issues
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    throw new ValidationError(
      `Validation failed: ${errorMessages}`,
      validation.error!
    );
  }
}
