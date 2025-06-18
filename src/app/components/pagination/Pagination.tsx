'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function Pagination({
  totalPages,
  currentPage,
  currentSort,
}: {
  totalPages: number;
  currentPage: number;
  currentSort?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    if (currentSort) {
      params.set('sort', currentSort);
    }
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-center mt-6 gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 border rounded cursor-pointer ${
            page === currentPage ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
