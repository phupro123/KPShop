import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AdminRoutes } from "./routes/route";
import DefaultLayout from "./components/Layout/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <AdminRoutes />
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;
