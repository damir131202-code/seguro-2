import { z } from 'zod';

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Введите имя'),
  phone: z.string().min(8, 'Введите телефон'),
  email: z.string().email('Некорректный email').optional().or(z.literal('')),
  comment: z.string().max(500).optional(),
  contactMethod: z.enum(['PHONE', 'WHATSAPP', 'EMAIL'])
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
