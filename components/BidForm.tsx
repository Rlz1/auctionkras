import React, { useState } from 'react';
import MessageNotification from './MessageNotification';

interface BidFormProps {
  currentPrice: number;
  onBid: (amount: number) => void;
  isExpired: boolean;
}

const BidForm: React.FC<BidFormProps> = ({ currentPrice, onBid, isExpired }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const amount = parseFloat(bidAmount);

    if (isNaN(amount) || amount <= currentPrice) {
      setError(`Ваша ставка должна быть выше текущей цены ${currentPrice.toLocaleString('ru-RU')} ₽.`);
      return;
    }

    onBid(amount);
    setBidAmount('');
  };

  if (isExpired) {
    return (
        <div className="mt-6 p-4 text-center bg-red-100 border border-red-200 rounded-lg">
            <p className="font-bold text-red-800">Этот аукцион завершен.</p>
        </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-black mb-4">Сделать ставку</h3>
      {error && <MessageNotification message={error} type="error" />}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₽</span>
            <input
            type="number"
            step="0.01"
            min={currentPrice + 0.01}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full pl-7 pr-3 py-3 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
            placeholder={`> ${currentPrice.toLocaleString('ru-RU')} ₽`}
            required
            />
        </div>
        <button
          type="submit"
          className="bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
        >
          Сделать ставку
        </button>
      </form>
    </div>
  );
};

export default BidForm;