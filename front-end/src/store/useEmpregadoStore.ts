import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmpregadoStoreType {
  id: string;
  email: string;
  nome: string;
  role: string;

  setId: (id: string) => void;
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
      id: "",

      setId: (id: string) => set({ id }),
      setEmail: (email: string) => set({ email }),
      setNome: (nome: string) => set({ nome }),
      setRole: (role: string) => set({ role }),
    }),
    {
      name: "empregado-storage",
      partialize: (state) => ({
        id: state.id,
        email: state.email,
        role: state.role,
      }),
    },
  ),
);
