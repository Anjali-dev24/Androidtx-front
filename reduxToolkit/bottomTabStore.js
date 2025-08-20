import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

// Create Zustand store
const useBottomTabStore = create(
  persist(
    (set, get) => ({
      bottomTabShow: true, // Default balance
      // Action to set the balance
      setBottomTabShow: value => set({bottomTabShow: value}),
      reset: () => {
        set({
          bottomTabShow: true,
        });
      },
    }),
    {
      name: 'bottom_tab_storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useBottomTabStore;
