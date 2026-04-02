'use client';

import { useState } from 'react';

export function ImportForm() {
  const [result, setResult] = useState<string>('');

  const onUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/import', { method: 'POST', body: formData });
    const json = await response.json();
    setResult(JSON.stringify(json, null, 2));
  };

  return (
    <form onSubmit={onUpload} className="space-y-4 rounded-xl border bg-white p-4">
      <input type="file" name="file" accept=".csv,.xlsx" required />
      <button className="rounded-md bg-brand-500 px-4 py-2 text-white">Запустить импорт</button>
      {result ? <pre className="overflow-x-auto rounded-md bg-slate-900 p-3 text-xs text-white">{result}</pre> : null}
    </form>
  );
}
