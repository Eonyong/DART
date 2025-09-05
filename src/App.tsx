import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import FinancialInfo from "./pages/FinancialInfo";
import MainInfo from "./pages/MainInfo";
import DisclosureList from "./pages/DisclosureList";
import GlobalStyles from "./styles/GlobalStyles";

// React Query 클라이언트 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/financial" element={<FinancialInfo />} />
            <Route path="/main-info" element={<MainInfo />} />
            <Route path="/disclosure" element={<DisclosureList />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
