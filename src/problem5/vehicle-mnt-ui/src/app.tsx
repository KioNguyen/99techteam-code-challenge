import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";

import React from "react";
import Home from "./pages/home";
import VehicleDetails from "./pages/vehicle-details";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
