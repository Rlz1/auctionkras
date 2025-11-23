import { useState, useCallback, useEffect } from 'react';
import type { Lot, Bid, User } from '../types';

const LOTS_KEY = 'auction_lots';
const USER_KEY = 'auction_user';

const getInitialLots = (): Lot[] => {
    // Add some mock data if local storage is empty
    const savedLots = localStorage.getItem(LOTS_KEY);
    if (savedLots) {
        return JSON.parse(savedLots);
    }
    const mockLots: Lot[] = [
        {
            id: '1',
            title: 'Винтажный фотоаппарат',
            description: 'Прекрасная винтажная камера из 1960-х. В идеальном рабочем состоянии, настоящий предмет коллекционирования.',
            imageUrl: 'https://i.pinimg.com/1200x/bc/da/6b/bcda6ba02374aea3cbe2c44fe938f5e5.jpg',
            startPrice: 15000,
            currentPrice: 17500,
            endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 дня от текущего момента
            bids: [{ bidderId: 'user456', amount: 17500, timestamp: new Date(Date.now() - 60000).toISOString() }],
            creatorId: 'admin'
        },
        {
            id: '2',
            title: 'Футболка с автографами',
            description: 'Футболка, подписанная всей командой-чемпионом 2023 года. Поставляется с сертификатом подлинности.',
            imageUrl: 'https://i.pinimg.com/736x/44/48/fc/4448fc9554dbfe6146ddd4ccd4181496.jpg',
            startPrice: 50000,
            currentPrice: 50000,
            endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 дней от текущего момента
            bids: [],
            creatorId: 'admin'
        },
        {
            id: '3',
            title: 'Антикварная карта мира',
            description: 'Карта мира, нарисованная вручную в 18 веке. Есть некоторые следы износа, но в целом в отличном состоянии для своего возраста.',
            imageUrl: 'https://i.pinimg.com/1200x/97/2c/be/972cbeef44d19f5309f4aa0f2430fe49.jpg',
            startPrice: 30000,
            currentPrice: 45000,
            endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 день назад (завершен)
            bids: [
                { bidderId: 'user789', amount: 35000, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
                { bidderId: 'user123', amount: 45000, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            ],
            creatorId: 'admin'
        },
    ];
    localStorage.setItem(LOTS_KEY, JSON.stringify(mockLots));
    return mockLots;
}


export const useAuctionData = () => {
  const [lots, setLots] = useState<Lot[]>(getInitialLots);

  const saveLotsToStorage = useCallback((updatedLots: Lot[]) => {
    localStorage.setItem(LOTS_KEY, JSON.stringify(updatedLots));
    setLots(updatedLots);
  }, []);

  const getLots = useCallback(() => {
    return lots.slice().sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());
  }, [lots]);

  const getLotById = useCallback((id: string) => {
    return lots.find(lot => lot.id === id);
  }, [lots]);

  const addLot = useCallback((lotData: Omit<Lot, 'id' | 'currentPrice' | 'bids'>) => {
    const newLot: Lot = {
      ...lotData,
      id: new Date().getTime().toString(),
      currentPrice: lotData.startPrice,
      bids: [],
    };
    const updatedLots = [...lots, newLot];
    saveLotsToStorage(updatedLots);
  }, [lots, saveLotsToStorage]);

  const addBid = useCallback((lotId: string, bid: Omit<Bid, 'timestamp'>) => {
    const newBid: Bid = { ...bid, timestamp: new Date().toISOString() };
    const updatedLots = lots.map(lot => {
      if (lot.id === lotId) {
        return {
          ...lot,
          currentPrice: newBid.amount,
          bids: [...lot.bids, newBid],
        };
      }
      return lot;
    });
    saveLotsToStorage(updatedLots);
  }, [lots, saveLotsToStorage]);

  const getUser = useCallback((): User | null => {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }, []);

  const saveUser = useCallback((user: User | null) => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, []);
  
  // This effect will sync state if localStorage is changed in another tab
  useEffect(() => {
    const handleStorageChange = () => {
      setLots(getInitialLots());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  return { lots: getLots(), getLotById, addLot, addBid, getUser, saveUser };
};