
import type { Car } from '@/app/types/type';

import { CarCard } from '@/app/components/carCard/CarCard';
import { Pagination } from '@/app/components/pagination/Pagination';

export const dynamic = 'force-dynamic'; //  отключаем статическую генерацию

export default async function CarsPage(props: {
  searchParams: { page?: string; sort?: 'asc' | 'desc' };
}) {

  // Важно деструктурировать props внутри тела функции
  const { searchParams } = props;

  // Деструктурируем параметры после объявления функции
  const page = searchParams?.page || '1';
  const sort = searchParams?.sort;

  const url = new URL(`http://localhost:3000/api/cars`);
  url.searchParams.append('_limit', '12');
  url.searchParams.append('_page', page);

  if (sort) {
    url.searchParams.append('_sort', 'price');
    url.searchParams.append('_order', sort);
  }

  const res = await fetch(url.toString(), { cache: 'no-store' });
  const { data } = await res.json();

  return (
    <main className="max-w-6xl mx-auto">
      <h1>Автомобили</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 w-full">
        {data.map((car: Car) => (
          <CarCard key={car.unique_id} car={car} />
        ))}
      </div>
      <Pagination totalPages={data.length} currentPage={sort ? Number(page) : 1} />
    </main>
  );
}
