
export interface User {
  id: string;
}

export interface Bid {
  bidderId: string;
  amount: number;
  timestamp: string;
}

export interface Lot {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startPrice: number;
  currentPrice: number;
  endTime: string;
  bids: Bid[];
  creatorId: string;
}
