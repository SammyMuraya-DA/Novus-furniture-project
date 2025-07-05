
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction = 
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.product.id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };
      } else {
        const updatedItems = [...state.items, { ...action.product, quantity: 1 }];
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };
      }
    }
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.productId);
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.productId
          ? { ...item, quantity: Math.max(0, action.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
