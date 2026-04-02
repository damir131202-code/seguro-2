'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { checkoutSchema, type CheckoutInput } from '@/lib/validators/order';

export function CheckoutForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { contactMethod: 'PHONE' }
  });

  const onSubmit = async (data: CheckoutInput) => {
    await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    reset();
    alert('Спасибо! Заказ принят.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border bg-white p-5">
      <input {...register('customerName')} placeholder="Имя" className="w-full rounded-md border p-2" />
      {errors.customerName && <p className="text-xs text-red-500">{errors.customerName.message}</p>}
      <input {...register('phone')} placeholder="Телефон" className="w-full rounded-md border p-2" />
      <input {...register('email')} placeholder="Email (необязательно)" className="w-full rounded-md border p-2" />
      <textarea {...register('comment')} placeholder="Комментарий" className="w-full rounded-md border p-2" />
      <select {...register('contactMethod')} className="w-full rounded-md border p-2">
        <option value="PHONE">Телефон</option>
        <option value="WHATSAPP">WhatsApp</option>
        <option value="EMAIL">Email</option>
      </select>
      <button disabled={isSubmitting} className="rounded-md bg-brand-500 px-4 py-2 text-white">Оформить заказ</button>
    </form>
  );
}
