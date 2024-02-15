import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface Hero {
  name: string;
  profession: string;
  adjectives: Array<{ value: string }>;
  drives: Array<{ value: string }>;
  gear: Array<{ value: string }>;
  health: {
    max: number;
    current: number;
    armor: number;
  };
  morale: {
    max: number;
    current: number;
    grit: number;
  };
  generalAbilities: Array<Ability>;
  socialAbilities: Array<Ability>;
  personalAbilities: Array<Ability>;
  allies: Array<Faction>;
  enemies: Array<Faction>;
}

interface Faction {
  max: number;
  current: number;
  name: string;
}

export interface Ability {
  max: number;
  current: number;
  name: string;
}

interface HeroesState {
  hero: Hero | undefined;
  actions: {
    addHero: (hero: Hero) => void;
    updateSkillValue: (arg: {
      type: "generalAbilities" | "socialAbilities" | "personalAbilities";
      skill: string;
      operation: "increment" | "decrement";
    }) => void;
  };
}

const useHeroesStore = create<HeroesState>()(
  persist(
    immer((set) => ({
      hero: undefined,
      actions: {
        addHero: (hero) => set(() => ({ hero })),
        updateSkillValue: ({ operation, skill, type }) => {
          set(
            produce((state: HeroesState) => {
              if (!state.hero) return;
              state.hero[type] = state.hero[type].map((ability) =>
                ability.name === skill
                  ? { ...ability, current: operation === "increment" ? ability.current + 1 : ability.current - 1 }
                  : ability
              );
            })
          );
        },
      },
    })),
    { name: "heroes", partialize: (state) => ({ hero: state.hero }) }
  )
);

export const useHero = () => useHeroesStore((state) => state.hero);
export const useHeroesActions = () => useHeroesStore((state) => state.actions);
