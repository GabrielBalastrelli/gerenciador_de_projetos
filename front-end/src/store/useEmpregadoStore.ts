import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmpregadoStoreType {
  email: string;
  nome: string;
  role: string;

  setEmail: (email: string) => void;
  setNome: (nome: string) => void;
  setRole: (role: string) => void;
}

export const useEmpregadoStore = create<EmpregadoStoreType>()(
  persist(
    (set) => ({
      email: "",
      nome: "",
      role: "",

      setEmail: (email: string) => set({ email }),
      setNome: (nome: string) => set({ nome }),
      setRole: (role: string) => set({ role }),
    }),
    {
      name: "empregado-storage",
      partialize: (state) => ({
        role: state.role,
      }),
    },
  ),
);
