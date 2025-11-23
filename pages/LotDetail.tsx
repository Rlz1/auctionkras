import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuctionData } from '../hooks/useAuctionData';
import BidForm from '../components/BidForm';
import MessageNotification from '../components/MessageNotification';
import type { User, Lot } from '../types';

interface LotDetailProps {
  currentUser: User | null;
}

const LotDetail: React.FC<LotDetailProps> = ({ currentUser }) => {
  const { id } = useParams<{ id: string }>();
  const { getLotById, addBid } = useAuctionData();
  
  // Local state to force re-render on bid
  const [lot, setLot] = useState<Lot | undefined>(undefined);
  const [message, setMessage] = useState<{text: string; type: 'success'|'error'} | null>(null);

  useEffect(() => {
    if (id) {
        setLot(getLotById(id));
    }
  }, [id, getLotById, addBid]); // addBid dependency to re-fetch on storage change
  
  const isExpired = useMemo(() => lot ? new Date(lot.endTime) < new Date() : false, [lot]);

  const handleBid = (amount: number) => {
    if (lot && currentUser) {
      addBid(lot.id, { bidderId: currentUser.id, amount });
      setLot(getLotById(lot.id)); // Refresh lot data from hook
      setMessage({text: 'Ставка успешно сделана!', type: 'success'});
      setTimeout(() => setMessage(null), 3000);
    }
  };
  
  if (!lot) {
    return (
        <div className="text-center mt-10">
            <h2 className="text-2xl text-red-600">Лот не найден</h2>
            <Link to="/" className="text-gray-600 hover:text-black mt-4 inline-block">&larr; Назад ко всем аукционам</Link>
        </div>
    );
  }

  const sortedBids = [...lot.bids].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="container mx-auto max-w-5xl">
       <Link to="/" className="text-gray-600 hover:text-black mb-6 inline-block">&larr; Назад ко всем аукционам</Link>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
        <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b-2 border-gray-200 pb-4 mb-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-black">{lot.title}</h1>
                    <p className="text-sm text-gray-500">Создатель: {lot.creatorId}</p>
                </div>
                <div className="mt-4 sm:mt-0 text-right shrink-0">
                    <div className="text-gray-600 text-sm">Текущая ставка</div>
                    <div className="text-4xl font-bold text-black">{lot.currentPrice.toLocaleString('ru-RU')} ₽</div>
                    <div className="text-xs text-gray-500 mt-1">
                        {isExpired ? 'Завершен' : 'Завершится'}: {new Date(lot.endTime).toLocaleString('ru-RU')}
                    </div>
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-8">
                <div>
                    <img src={lot.imageUrl} alt={lot.title} className="w-full h-auto object-contain rounded-lg shadow-lg mb-6 md:mb-0 border border-gray-200" />
                </div>
                <div>
                    <p className="text-gray-700 mb-6">{lot.description}</p>
                    
                    {currentUser ? (
                        <BidForm currentPrice={lot.currentPrice} onBid={handleBid} isExpired={isExpired} />
                    ) : (
                        <div className="mt-6 p-4 text-center bg-gray-100 border border-gray-200 rounded-lg">
                            <p className="font-medium text-gray-800">Пожалуйста, войдите, чтобы сделать ставку.</p>
                        </div>
                    )}
                    {message && <div className="mt-4"><MessageNotification message={message.text} type={message.type} /></div>}
                </div>
            </div>
        </div>

        <div className="bg-gray-50 p-6 sm:p-8 border-t-2 border-gray-200">
            <h3 className="text-lg font-bold text-black mb-4">История ставок</h3>
            {sortedBids.length > 0 ? (
                 <ul className="space-y-3">
                    {sortedBids.map((bid, index) => (
                        <li key={index} className="flex justify-between items-center bg-white p-3 rounded-md text-sm border border-gray-200">
                            <span className="font-bold text-gray-900 truncate pr-4">
                                {bid.bidderId}
                                {bid.bidderId === currentUser?.id && <span className="text-blue-600 ml-2">(Вы)</span>}
                            </span>
                            <div className="text-right shrink-0">
                                <span className="font-bold text-lg text-black">{bid.amount.toLocaleString('ru-RU')} ₽</span>
                                <div className="text-xs text-gray-500">{new Date(bid.timestamp).toLocaleString('ru-RU')}</div>
                            </div>
                        </li>
                    ))}
                 </ul>
            ) : (
                <p className="text-gray-500 text-sm">Ставок еще не было. Будьте первым!</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default LotDetail;