export interface stock {
  id: number;
  name: string;
  price: number;
  symbol: string;
}

export interface portfolioStock {
  id: number;
  stockId: number;
  userId: number;
  name: string;
  price: number;
  quantity: number;
  symbol: string;
}

export interface user {
  id: number;
  name: string;
  password: string;
  username: string;
}
