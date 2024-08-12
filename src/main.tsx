import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "swiper"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { STORE } from "./Components/RTK/STORE/STORE.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={STORE}>
      <App />
    </Provider>
  </BrowserRouter>
);
