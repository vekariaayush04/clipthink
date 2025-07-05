import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./components/auth";
import LayOut from "./Outlet/LayOut";
import GeneratedVideoPage from "./pages/GenerationPage";
import { useSession } from "./lib/auth-client";
import MainLoader from "./components/Loader";

function App() {
  const { isPending } = useSession();

  if (isPending) {
    return <MainLoader />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<HomePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="generate/:id" element={<GeneratedVideoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;