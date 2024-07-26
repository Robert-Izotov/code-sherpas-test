import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import MainLayout from "./components/Layout/MainLayout";
import AccountStatement from "./pages/AccountStatement";
import DepositForm from "./pages/DepositForm";
import TransferForm from "./pages/TransferForm";
import WithdrawForm from "./pages/WithdrawForm";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<AccountStatement />} />
            <Route path="/deposit" element={<DepositForm />} />
            <Route path="/transfer" element={<TransferForm />} />
            <Route path="/withdraw" element={<WithdrawForm />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
