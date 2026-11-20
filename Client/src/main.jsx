import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import appStore from "./app/store.js";
import { Toaster } from "sonner";
import { useGetUserQuery } from "./features/api/apiAuth";
import LoadingScreen from "./components/LoadingScreen";



const Custom = ({ children }) => {
  const { isLoading } = useGetUserQuery();

  return isLoading ? <LoadingScreen /> : <>{children}</>;
};



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </StrictMode>,
);
