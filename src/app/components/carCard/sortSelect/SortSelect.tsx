'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function SortSelect({ currentSort }: { currentSort?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (!sort) {
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="mb-4">
      <label className="mr-2 font-medium">Сортировка:</label>
      <select
        value={currentSort ?? ''}
        onChange={handleChange}
        className="border rounded px-2 py-1 cursor-pointer"
      >
        <option className="flex gap-2 items-center text-black cursor-pointer" value="">
          По умолчанию
        </option>
        <option className="flex gap-2 items-center text-black cursor-pointer" value="asc">
          Цена ↑
        </option>
        <option className="flex gap-2 items-center text-black cursor-pointer" value="desc">
          Цена ↓
        </option>
      </select>
    </div>
  );
}
