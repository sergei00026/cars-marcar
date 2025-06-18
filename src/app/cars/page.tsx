import { SortSelect } from '@/app/components/carCard/sortSelect/SortSelect';
import type { Car } from '@/app/types/type';
import { CarCard } from '@/app/components/carCard/CarCard';
import { Pagination } from '@/app/components/pagination/Pagination';

export const dynamic = 'force-dynamic';

export default async function CarsPage({
                                         searchParams
                                       }: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  // Ожидаем searchParams если это Promise
  const resolvedSearchParams = searchParams instanceof Promise
    ? await searchParams
    : searchParams || {};

  const page = Array.isArray(resolvedSearchParams?.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams?.page ?? '1';

  const sort = Array.isArray(resolvedSearchParams?.sort)
    ? resolvedSearchParams.sort[0]
    : resolvedSearchParams?.sort ?? '';

  try {
    const apiUrl = new URL('https://plex-parser.ru-rating.ru/cars');
    apiUrl.searchParams.set('_limit', '12');
    apiUrl.searchParams.set('_page', page);

    if (sort) {
      apiUrl.searchParams.set('_sort', 'price');
      apiUrl.searchParams.set('_order', sort);
    }

    const res = await fetch(apiUrl.toString(), {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    // Убедимся, что data - массив
    const responseData = await res.json();
    const data = Array.isArray(responseData) ? responseData :
      (responseData.data ? responseData.data : []);

    return (
      <main className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Автомобили</h1>
        <SortSelect currentSort={sort} />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 w-full">
          {data.map((car: Car) => (
            <CarCard key={car.unique_id} car={car} />
          ))}
        </div>
        <Pagination
          totalPages={Math.ceil(data.length / 12)}
          currentPage={+page}
          currentSort={sort}
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching cars:', error);
    return (
      <main className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Ошибка</h1>
        <p className="text-red-500">
          Не удалось загрузить данные. Пожалуйста, попробуйте позже.
        </p>
        {error instanceof Error && (
          <p className="text-sm text-gray-500 mt-2">
            {error.message}
          </p>
        )}
      </main>
    );
  }
}