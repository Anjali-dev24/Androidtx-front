import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

// Create Zustand store
const useGameStore = create(
  persist(
    (set, get) => ({
      soundDisable: false,
      multiplication: 'X1', // Initial state is null or you can set a default value
      setMultiplication: value => set({multiplication: value}),
      setSoundDisable: () =>
        set(state => ({soundDisable: !state.soundDisable})),
    }),
    {
      name: 'game_storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useGameStore;
