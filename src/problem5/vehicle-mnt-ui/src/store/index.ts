import { SearchSlice, searchSlice } from "./search-slice";
import { VehiclesSlice, vehiclesSlice } from "./vehicles-slice";

import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = create<SearchSlice & VehiclesSlice>()(
  devtools((...set) => ({
    ...searchSlice(...set),
    ...vehiclesSlice(...set),
  }))
);

export default store;

export const useStore = createSelectorHooks(store);
