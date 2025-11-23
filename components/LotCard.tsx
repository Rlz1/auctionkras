import React from 'react';
import { Link } from 'react-router-dom';
import type { Lot } from '../types';

interface LotCardProps {
  lot: Lot;
}

const LotCard: React.FC<LotCardProps> = ({ lot }) => {
  const isExpired = new Date(lot.endTime) < new Date();

  return (
    <Link to={`/lot/${lot.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden h-full flex flex-col group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
        <div className="relative">
            <img src={lot.imageUrl} alt={lot.title} className="w-full h-48 object-cover" />
             {isExpired && <span className="absolute top-2 right-2 text-xs font-bold bg-red-600 text-white py-1 px-2 rounded-full z-10">ЗАВЕРШЕН</span>}
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="p-6 flex-grow">
            <h3 className="text-xl font-bold text-black mb-2">{lot.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{lot.description}</p>
        </div>
        <div className="bg-gray-50 p-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Текущая ставка:</span>
                <span className="text-2xl font-bold text-black">{lot.currentPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="text-right text-xs text-gray-500 mt-2">
                Завершение: {new Date(lot.endTime).toLocaleString('ru-RU')}
            </div>
        </div>
      </div>
    </Link>
  );
};

export default LotCard;