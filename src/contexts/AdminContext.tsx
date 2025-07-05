import React, { createContext, useContext, ReactNode } from 'react';

// This context is now deprecated in favor of backend data management
// Keeping minimal structure for backward compatibility

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

const defaultServices: Service[] = [
  {
    id: "1",
    title: "Custom Design",
    description: "Work with our designers to create custom furniture pieces tailored to your specific needs and space.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    title: "Home Delivery",
    description: "Free delivery and setup service within Nairobi and surrounding areas.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    title: "Interior Consultation",
    description: "Get expert advice on furniture placement and interior design from our experienced consultants.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
  }
];

const AdminContext = createContext<{
  services: Service[];
} | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AdminContext.Provider value={{
      services: defaultServices
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
