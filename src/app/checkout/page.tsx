import { CheckoutForm } from '@/components/forms/checkout-form';

export default function CheckoutPage() {
  return (
    <div className="container-page max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Оформление заказа</h1>
      <CheckoutForm />
    </div>
  );
}
