// store.js
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;

const AuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      deviceId: null,
      lastActive: null,
      popupShow: true,
      otpResult: null,
      modalVisibility: true,
      setRememberMe: () => set(state => ({rememberMe: !state.rememberMe})),
      loginInfo: null,
      setLoginInfo: loginInfo => set({loginInfo}),
      // Action to log in the user

      login: async (userData, rememberMe, deviceId) => {
        await AsyncStorage.setItem('deviceId', deviceId);
        set({
          token: userData.token,
          user: userData,
          isLoggedIn: true,
          lastActive: Date.now(),
          deviceId,
          rememberMe: rememberMe,
        });
      },

      // Action to check if the device ID matches
      checkDeviceId: async () => {
        const storedDeviceId = await AsyncStorage.getItem('deviceId');
        const currentDeviceId = get().deviceId;

        if (storedDeviceId && storedDeviceId !== currentDeviceId) {
          get().logout();
        } // Logout if device IDs don’t match
        // } else {
        //   set({isLoggedIn: true}); // Stay logged in if device ID matches
        // }
      },

      // Action to check inactivity based on last active time
      checkInactivity: () => {
        const lastActive = get().lastActive;
        const currentTime = Date.now();

        if (lastActive && currentTime - lastActive >= SIX_HOURS_IN_MS) {
          get().logout();
        }
      },

      // Update last active time
      updateLastActive: () => set({lastActive: Date.now()}),

      // Set the OTP result
      setOtpResult: result => set({otpResult: result}),

      // Set or hide the popup
      setPopupShow: value => set({popupShow: value}),

      // Logout user and clear AsyncStorage
      logout: async () => {
        set({token: null, user: null, isLoggedIn: false, deviceId: null});
        await AsyncStorage.removeItem('deviceId');
      },

      // Reset store state
      reset: () =>
        set({
          user: null,
          isLoggedIn: false,
          popupShow: true,
          modalVisibility: true,
        }),
    }),
    {
      name: 'app_storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default AuthStore;
