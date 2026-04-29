import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const CHARACTERS = {
  DEFAULT: { id: 'DEFAULT', name: 'Original', price: 0, color: '#3b82f6', emissive: '#60a5fa', scale: 0.9, effect: 'none' },
  SPIDERMAN: { id: 'SPIDERMAN', name: 'Spider-Man', price: 500, color: '#ef4444', emissive: '#dc2626', scale: 0.9, effect: 'trail' },
  IRONMAN: { id: 'IRONMAN', name: 'Iron Man', price: 1000, color: '#eab308', emissive: '#f59e0b', scale: 0.95, effect: 'glow' },
  THOR: { id: 'THOR', name: 'Thor', price: 1200, color: '#64748b', emissive: '#94a3b8', scale: 1.0, effect: 'lightning' },
  HULK: { id: 'HULK', name: 'Hulk', price: 1500, color: '#22c55e', emissive: '#16a34a', scale: 1.3, effect: 'heavy' },
  BLACKWIDOW: { id: 'BLACKWIDOW', name: 'Black Widow', price: 800, color: '#1e293b', emissive: '#0f172a', scale: 0.85, effect: 'stealth' },
  BLACKPANTHER: { id: 'BLACKPANTHER', name: 'Black Panther', price: 1100, color: '#7e22ce', emissive: '#9333ea', scale: 0.95, effect: 'energy' }
};

export const useEconomy = create(
  persist(
    (set, get) => ({
      coins: 0,
      ownedCharacters: ['DEFAULT'],
      selectedCharacter: 'DEFAULT',
      lastLoginDate: null,
      quizStreak: 0,
      playTimeSeconds: 0,
      profile: null,

      login: (name, phone) => set({ profile: { name, phone } }),
      logout: () => set({ profile: null }),

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      
      purchaseCharacter: (charId) => {
        const state = get();
        const char = CHARACTERS[charId];
        if (state.coins >= char.price && !state.ownedCharacters.includes(charId)) {
          set({ 
            coins: state.coins - char.price, 
            ownedCharacters: [...state.ownedCharacters, charId],
            selectedCharacter: charId
          });
          return true;
        }
        return false;
      },

      selectCharacter: (charId) => {
        const state = get();
        if (state.ownedCharacters.includes(charId)) {
          set({ selectedCharacter: charId });
        }
      },

      claimDailyLogin: () => {
        const state = get();
        const today = new Date().toDateString();
        if (state.lastLoginDate !== today) {
          set({ coins: state.coins + 100, lastLoginDate: today });
          return true; // Successfully claimed
        }
        return false; // Already claimed
      },

      addTime: (seconds) => {
        const state = get();
        const newTime = state.playTimeSeconds + seconds;
        // Award 200 coins every hour (3600 seconds)
        // Check how many hours they have reached
        const currentHours = Math.floor(state.playTimeSeconds / 3600);
        const newHours = Math.floor(newTime / 3600);
        
        if (newHours > currentHours) {
          set({ playTimeSeconds: newTime, coins: state.coins + 50 });
        } else {
          set({ playTimeSeconds: newTime });
        }
      }
    }),
    {
      name: 'ayush-economy-storage', 
    }
  )
);
