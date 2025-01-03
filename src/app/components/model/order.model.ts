export interface Order {
    id: number;
    user: {
      id: number;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      emailVerified: boolean;
      enabled: boolean;
      totp: boolean;
      createdTimestamp: number;
    };
    product: {
      id: number;
      name: string;
      description: string;
      price: number;
      stock: number;
    };
    quantity: number;
    totalPrice: number;
    orderStatus: string; // This will be 'PENDING', 'PROCESSING', 'OUT FOR DELIVERY', or 'DELIVERED'
    createdAt: string;
    updatedAt: string;
  }
  