import { SortSelect } from '@/app/components/carCard/sortSelect/SortSelect';
import type { Car } from '@/app/types/type';
import { CarCard } from '@/app/components/carCard/CarCard';
import { Pagination } from '@/app/components/pagination/Pagination';

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const dynamic = 'force-dynamic';

export default async function CarsPage({ searchParams }: PageProps) {
  const pageRaw = searchParams?.page;
  const sortRaw = searchParams?.sort;

  const page = Array.isArray(pageRaw) ? pageRaw[0] : pageRaw ?? '1';
  const sort = Array.isArray(sortRaw) ? sortRaw[0] : sortRaw ?? '';

  const url = new URL(`http://localhost:3000/api/cars`);
  url.searchParams.set('_limit', '12');
  url.searchParams.set('_page', page);
  if (sort) {
    url.searchParams.set('_sort', 'price');
    url.searchParams.set('_order', sort);
  }

  const res = await fetch(url.toString(), { cache: 'no-store' });
  const { data } = await res.json();

  return (
    <main className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Автомобили</h1>
      <SortSelect currentSort={sort} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 w-full">
        {data.map((car: Car) => (
          <CarCard key={car.unique_id} car={car} />
        ))}
      </div>
      <Pagination totalPages={data.length} currentPage={+page} currentSort={sort} />
    </main>
  );
}
