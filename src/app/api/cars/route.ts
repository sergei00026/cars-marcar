import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get('_page') ?? '1';
  const sort = searchParams.get('_sort');
  const order = searchParams.get('_order');

  let url = `https://plex-parser.ru-rating.ru/cars?_limit=12&_page=${page}`;
  if (sort && order) {
    url += `&_sort=${sort}&_order=${order}`;
  }

  const res = await fetch(url);
  const json = await res.json();

  return NextResponse.json(json);
}
