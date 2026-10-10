/** Validation shared by the form (client) and the API route (server), so
 *  both enforce exactly the same rules. Kept free of content imports so it
 *  stays tiny in the client bundle. */

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = { name: 100, email: 254, company: 120, message: 4000, messageMin: 20 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Removes control characters (except newlines/tabs) and trims. */
export function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

export function normalise(raw: Record<string, unknown>): ContactInput {
  return {
    name: clean(raw.name, LIMITS.name),
    email: clean(raw.email, LIMITS.email).toLowerCase(),
    company: clean(raw.company, LIMITS.company),
    interest: clean(raw.interest, 60),
    message: clean(raw.message, LIMITS.message),
  };
}

export function validate(input: ContactInput, allowedInterests?: Set<string>): ContactErrors {
  const errors: ContactErrors = {};
  if (input.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(input.email)) errors.email = "Please enter a valid work email, like name@company.com.";
  if (input.interest && allowedInterests && !allowedInterests.has(input.interest)) errors.interest = "Please choose an option from the list.";
  if (input.message.length < LIMITS.messageMin)
    errors.message = `A little more detail helps us route this. At least ${LIMITS.messageMin} characters.`;
  return errors;
}
