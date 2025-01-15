export interface Stock {
  id: number;
  name: string;
  price: number;
  symbol: string;
}

export interface PortfolioStock {
  id: number;
  stockId: number;
  userId: number;
  name: string;
  price: number;
  quantity: number;
  symbol: string;
}

export interface User {
  id: number;
  name: string;
  password: string;
  username: string;
}
