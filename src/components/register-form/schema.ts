import z from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .refine(
      (val) =>
        /[a-z]/.test(val) && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^a-zA-Z0-9]/.test(val),
      'Password must include uppercase, lowercase, number, and special character'
    ),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;
