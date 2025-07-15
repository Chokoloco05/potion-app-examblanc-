import { BrowserRouter, Routes, Route } from "react-router-dom";
import PotionList from "./pages/PotionList";
import PotionForm from "./pages/PotionForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PotionList />} />
        <Route path="/edit/:id?" element={<PotionForm />} />
      </Routes>
    </BrowserRouter>
  );
}