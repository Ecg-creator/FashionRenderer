import { create } from 'zustand';
import { Manufacturer, OrderRequest, Quote, Order, SmartContract, OrderStatus, ManufacturerStatus } from '../../types/marketplace';
import { manufacturerData } from '../../data/manufacturerData';
import { Garment } from '../../types/garment';

interface MarketplaceState {
  // Data
  manufacturers: Manufacturer[];
  filteredManufacturers: Manufacturer[];
  orderRequests: OrderRequest[];
  quotes: Quote[];
  orders: Order[];
  contracts: SmartContract[];
  
  // UI State
  selectedManufacturer: Manufacturer | null;
  selectedOrderRequest: OrderRequest | null;
  selectedOrder: Order | null;
  
  // Filters
  manufacturerFilters: {
    specialties: string[];
    minRating: number;
    location: string;
    status: ManufacturerStatus | null;
  };
  
  // Actions - Manufacturers
  loadManufacturers: () => void;
  filterManufacturers: (filters: Partial<MarketplaceState['manufacturerFilters']>) => void;
  selectManufacturer: (id: string) => void;
  
  // Actions - Order Requests
  createOrderRequest: (garment: Garment, customizations: OrderRequest['customizations'], quantity: number, targetPrice: number, deadline: Date) => OrderRequest;
  updateOrderRequest: (id: string, updates: Partial<Omit<OrderRequest, 'id' | 'createdAt'>>) => void;
  deleteOrderRequest: (id: string) => void;
  selectOrderRequest: (id: string) => void;
  
  // Actions - Quotes
  createQuote: (manufacturerId: string, orderRequestId: string, price: number, estimatedDeliveryDate: Date, notes: string, expiresAt: Date) => Quote;
  
  // Actions - Orders
  createOrder: (quoteId: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderMilestone: (orderId: string, milestone: string, completed: boolean, notes?: string) => void;
  selectOrder: (id: string) => void;
  
  // Actions - Smart Contracts
  createSmartContract: (orderId: string) => SmartContract;
  updateSmartContractStatus: (contractId: string, status: SmartContract['status']) => void;
  verifyMilestone: (contractId: string, milestone: string) => void;
}

export const useMarketplace = create<MarketplaceState>((set, get) => ({
  // Initial State
  manufacturers: [],
  filteredManufacturers: [],
  orderRequests: [],
  quotes: [],
  orders: [],
  contracts: [],
  
  selectedManufacturer: null,
  selectedOrderRequest: null,
  selectedOrder: null,
  
  manufacturerFilters: {
    specialties: [],
    minRating: 0,
    location: '',
    status: null,
  },
  
  // Manufacturers
  loadManufacturers: () => {
    // In a real app, this would fetch from an API
    set({ 
      manufacturers: manufacturerData,
      filteredManufacturers: manufacturerData 
    });
  },
  
  filterManufacturers: (filters) => {
    set((state) => {
      const newFilters = { ...state.manufacturerFilters, ...filters };
      
      const filtered = state.manufacturers.filter(m => {
        // Apply specialty filter
        if (newFilters.specialties.length > 0 && 
            !newFilters.specialties.some(s => m.specialties.includes(s))) {
          return false;
        }
        
        // Apply rating filter
        if (m.rating < newFilters.minRating) {
          return false;
        }
        
        // Apply location filter
        if (newFilters.location && !m.location.includes(newFilters.location)) {
          return false;
        }
        
        // Apply status filter
        if (newFilters.status && m.status !== newFilters.status) {
          return false;
        }
        
        return true;
      });
      
      return { 
        manufacturerFilters: newFilters,
        filteredManufacturers: filtered
      };
    });
  },
  
  selectManufacturer: (id) => {
    set((state) => ({
      selectedManufacturer: state.manufacturers.find(m => m.id === id) || null
    }));
  },
  
  // Order Requests
  createOrderRequest: (garment, customizations, quantity, targetPrice, deadline) => {
    const newOrderRequest: OrderRequest = {
      id: `req_${Date.now()}`,
      customerId: 'current_user', // In a real app, this would be the actual user ID
      garment,
      customizations,
      quantity,
      targetPrice,
      deadline,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    set((state) => ({
      orderRequests: [...state.orderRequests, newOrderRequest]
    }));
    
    return newOrderRequest;
  },
  
  updateOrderRequest: (id, updates) => {
    set((state) => ({
      orderRequests: state.orderRequests.map(req => 
        req.id === id ? { ...req, ...updates, updatedAt: new Date() } : req
      )
    }));
  },
  
  deleteOrderRequest: (id) => {
    set((state) => ({
      orderRequests: state.orderRequests.filter(req => req.id !== id)
    }));
  },
  
  selectOrderRequest: (id) => {
    set((state) => ({
      selectedOrderRequest: state.orderRequests.find(req => req.id === id) || null
    }));
  },
  
  // Quotes
  createQuote: (manufacturerId, orderRequestId, price, estimatedDeliveryDate, notes, expiresAt) => {
    const newQuote: Quote = {
      id: `quote_${Date.now()}`,
      manufacturerId,
      orderRequestId,
      price,
      estimatedDeliveryDate,
      notes,
      expiresAt,
      createdAt: new Date()
    };
    
    set((state) => ({
      quotes: [...state.quotes, newQuote]
    }));
    
    return newQuote;
  },
  
  // Orders
  createOrder: (quoteId) => {
    const { quotes, orderRequests } = get();
    const quote = quotes.find(q => q.id === quoteId);
    
    if (!quote) {
      throw new Error('Quote not found');
    }
    
    const orderRequest = orderRequests.find(req => req.id === quote.orderRequestId);
    
    if (!orderRequest) {
      throw new Error('Order request not found');
    }
    
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      orderRequestId: quote.orderRequestId,
      quoteId,
      manufacturerId: quote.manufacturerId,
      customerId: orderRequest.customerId,
      garment: orderRequest.garment,
      quantity: orderRequest.quantity,
      totalPrice: quote.price,
      status: 'accepted',
      milestones: [
        { milestone: 'materials_sourced', completed: false },
        { milestone: 'cutting', completed: false },
        { milestone: 'sewing', completed: false },
        { milestone: 'finishing', completed: false },
        { milestone: 'quality_check', completed: false },
        { milestone: 'packaging', completed: false }
      ],
      paymentStatus: 'pending',
      transactions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    set((state) => ({
      orders: [...state.orders, newOrder],
      // Update the order request status
      orderRequests: state.orderRequests.map(req => 
        req.id === quote.orderRequestId 
          ? { ...req, status: 'accepted' as OrderStatus, updatedAt: new Date() } 
          : req
      )
    }));
    
    return newOrder;
  },
  
  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date() } 
          : order
      )
    }));
  },
  
  updateOrderMilestone: (orderId, milestoneName, completed, notes) => {
    set((state) => ({
      orders: state.orders.map(order => {
        if (order.id !== orderId) return order;
        
        return {
          ...order,
          milestones: order.milestones.map(m => 
            m.milestone === milestoneName 
              ? { 
                  ...m, 
                  completed, 
                  completedAt: completed ? new Date() : undefined,
                  notes: notes || m.notes
                } 
              : m
          ),
          updatedAt: new Date()
        };
      })
    }));
  },
  
  selectOrder: (id) => {
    set((state) => ({
      selectedOrder: state.orders.find(order => order.id === id) || null
    }));
  },
  
  // Smart Contracts
  createSmartContract: (orderId) => {
    const newContract: SmartContract = {
      id: `contract_${Date.now()}`,
      orderId,
      contractAddress: `0x${Math.random().toString(16).substring(2, 14)}`,
      network: 'ethereum', // or 'polygon', etc.
      status: 'created',
      milestones: [
        { milestone: 'materials_sourced', paymentPercentage: 10, completed: false, verified: false },
        { milestone: 'cutting', paymentPercentage: 15, completed: false, verified: false },
        { milestone: 'sewing', paymentPercentage: 25, completed: false, verified: false },
        { milestone: 'finishing', paymentPercentage: 20, completed: false, verified: false },
        { milestone: 'quality_check', paymentPercentage: 20, completed: false, verified: false },
        { milestone: 'packaging', paymentPercentage: 10, completed: false, verified: false }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    set((state) => ({
      contracts: [...state.contracts, newContract]
    }));
    
    return newContract;
  },
  
  updateSmartContractStatus: (contractId, status) => {
    set((state) => ({
      contracts: state.contracts.map(contract => 
        contract.id === contractId 
          ? { ...contract, status, updatedAt: new Date() } 
          : contract
      )
    }));
  },
  
  verifyMilestone: (contractId, milestoneName) => {
    set((state) => ({
      contracts: state.contracts.map(contract => {
        if (contract.id !== contractId) return contract;
        
        return {
          ...contract,
          milestones: contract.milestones.map(m => 
            m.milestone === milestoneName 
              ? { ...m, verified: true, releaseTransaction: `0x${Math.random().toString(16).substring(2, 14)}` } 
              : m
          ),
          updatedAt: new Date()
        };
      })
    }));
  }
}));