import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {persist} from 'zustand/middleware';

const useToastStore = create(
  devtools(
    persist(
      set => ({
        toast: null,
        showMessage: options => {
          set({toast: options});
          setTimeout(() => {
            set({toast: null}); // Hide the toast after a certain duration
          }, options.duration || 2000);
        },
      }),
      {name: 'toast-storage'}, // Name of the storage (localStorage, etc.)
    ),
  ),
);

export default useToastStore;
