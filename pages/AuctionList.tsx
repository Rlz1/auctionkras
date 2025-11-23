import React from 'react';
import LotCard from '../components/LotCard';
import { useAuctionData } from '../hooks/useAuctionData';
import type { User } from '../types';

interface AuctionListProps {
  currentUser: User | null;
}

const AuctionList: React.FC<AuctionListProps> = ({ currentUser }) => {
  const { lots } = useAuctionData();

  const activeLots = lots.filter(lot => new Date(lot.endTime) >= new Date());
  const closedLots = lots.filter(lot => new Date(lot.endTime) < new Date());

  return (
    <div className="container mx-auto">
      {!currentUser && (
        <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow-md text-center border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-2">Добро пожаловать на Аукцион!</h2>
            <p className="text-gray-600">Пожалуйста, войдите или зарегистрируйтесь, чтобы создавать аукционы и делать ставки.</p>
        </div>
      )}

      <div>
        <h2 className="text-3xl font-bold text-black border-b-2 border-gray-200 pb-2 mb-6">Активные аукционы</h2>
        {activeLots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {activeLots.map(lot => <LotCard key={lot.id} lot={lot} />)}
            </div>
        ) : (
            <p className="text-gray-600">Активных аукционов пока нет. {currentUser ? "Почему бы не создать свой?" : "Войдите, чтобы создать первый лот."}</p>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-500 border-b-2 border-gray-200 pb-2 mb-6">Завершенные аукционы</h2>
         {closedLots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-60">
                {closedLots.map(lot => <LotCard key={lot.id} lot={lot} />)}
            </div>
         ) : (
            <p className="text-gray-600">Еще ни один аукцион не завершился.</p>
         )}
      </div>
    </div>
  );
};

export default AuctionList;