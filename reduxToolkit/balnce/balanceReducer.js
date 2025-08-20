import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

// Create Zustand store
const useBalanceStore = create(
  persist(
    (set, get) => ({
      balanceAmount: '0.00', // Default balance
      // Action to set the balance
      setBalance: balance => set({balanceAmount: balance}),
      reset: () => {
        set({
          balanceAmount: '0.00',
        });
      },
    }),
    {
      name: 'balance_storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useBalanceStore;
