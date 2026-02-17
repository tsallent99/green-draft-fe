import { z } from "zod";
/**
 * Zod schema for validating and transforming date values from backend responses.
 *
 * This schema handles the following cases:
 * - Date objects: passes through unchanged
 * - String values: attempts to parse into a Date object
 * - Other types: throws an error
 *
 * @example
 * ```typescript
 * // Valid inputs
 * dateBackendSchema.parse(new Date())          // returns Date object
 * dateBackendSchema.parse('2024-03-21')        // returns Date object
 * dateBackendSchema.parse('2024-03-21T10:30:00Z') // returns Date object
 *
 * // Invalid inputs
 * dateBackendSchema.parse('invalid date')      // throws Error
 * dateBackendSchema.parse(123)                 // throws Error
 * ```
 *
 * @throws {Error} If the input string cannot be parsed into a valid date
 * @throws {Error} If the input is neither a string nor a Date object
 *
 * @returns {z.ZodType<Date>} A Zod schema that validates and returns Date objects
 */
export const dateBackendSchema = z.preprocess((val) => {
	if (val === null || val === undefined) return null;
	if (val instanceof Date) return val;
	if (typeof val === "string") {
		const date = new Date(val);
		if (isNaN(date.getTime())) throw new Error("Invalid date");
		return date;
	}
	throw new Error(`Invalid input type for date: ${val}`);
}, z.date()) as unknown as z.ZodType<Date>;
