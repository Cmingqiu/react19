import { create } from 'zustand';

export const useMenuStore = create(set => ({
  menus: [],
  setMenus: async data => {
    set({ menus: data });
  }
}));
