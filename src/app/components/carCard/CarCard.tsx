'use client';

import * as React from 'react';
import type { Car } from '@/app/types/type';
import Image from 'next/image';
import { FaCarAlt, FaShoppingCart } from 'react-icons/fa';
import { IoIosSpeedometer } from 'react-icons/io';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { MdOutlineElectricBolt } from 'react-icons/md';
import { PiEngineBold } from 'react-icons/pi';
import { GiRoad } from 'react-icons/gi';
import { BsFillCalendar2DateFill } from 'react-icons/bs';
import { FiHeart, FiShuffle } from 'react-icons/fi';

type Props = {
  car: Car;
};

export function CarCard({ car }: Props) {
  const monthlyPrice = Math.ceil(car.price / 5 / 12).toLocaleString('ru-RU');
  const formattedPrice = car.price.toLocaleString('ru-RU');

  return (
    <div className="border rounded-2xl overflow-hidden border-white shadow flex flex-col min-w-[260px] h-full">
      <Image
        src={car.images.image[0]}
        width={324}
        height={243}
        alt={car.folder_id}
        loading="lazy"
        quality={75}
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/png;base64,..."
        className="w-full h-auto object-cover"
      />

      <div className="p-4 flex flex-col gap-2 text-sm h-full">
        <h2 className="text-base font-bold">
          {car.folder_id + ' '} {car.mark_id}
        </h2>

        <p className="">
          {car.year} год • {car.body_type}
        </p>

        <div className="flex justify-between gap-2 text-sm font-medium">
          <p className="">{formattedPrice} ₽</p>
          <p className="text-sm ">от {monthlyPrice} ₽/мес</p>
        </div>

        <div className="flex items-center gap-2 ">
          <FaCarAlt />
          <span>{car.modification_id}</span>
        </div>

        <div className="flex items-center gap-2 ">
          <TbManualGearboxFilled />
          <span>{car.gearbox}</span>
        </div>

        <div className="flex items-center gap-2 ">
          <IoIosSpeedometer />
          <span>{car.run.toLocaleString('ru-RU')} км</span>
        </div>

        <div className="flex items-center gap-2 ">
          <PiEngineBold />
          <span>
            {car.engine_volume} см³ ({car.engine_power})
          </span>
        </div>

        <div className="flex items-center gap-2 ">
          <MdOutlineElectricBolt />
          <span>{car.engine_type}</span>
        </div>

        <div className="flex items-center gap-2 ">
          <GiRoad />
          <span>{car.drive || 'Тип привода'}</span>
        </div>

        <div className="flex items-center gap-2 ">
          <BsFillCalendar2DateFill />
          <span>{car.owners_number}</span>
        </div>
        {/* КНОПКИ */}
        <div className="flex items-center justify-between gap-2 p-3 border-t mt-auto">
          <button
            title="В избранное"
            className="p-2 rounded group
            cursor-pointer transition"
            onClick={() => console.log('Добавить в избранное')}
          >
            <FiHeart
              className="text-xl   group-hover:fill-white
             group-hover:text-white transition"
            />
          </button>

          <button
            title="Сравнить"
            className="p-2 rounded hover:text-black hover:bg-gray-100 cursor-pointer transition"
            onClick={() => console.log('Добавить в сравнение')}
          >
            <FiShuffle className="text-xl" />
          </button>

          <button
            title="Купить"
            className="flex items-center ml-auto border-1 gap-2 px-4 py-2 rounded
            bg-white text-black hover:bg-black hover:text-white  transition cursor-pointer text-sm font-medium"
            onClick={() => console.log('Купить')}
          >
            <FaShoppingCart />
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
