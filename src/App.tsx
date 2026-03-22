import { useState } from "react";
import { RootLayout } from "./components/layout/RootLayout";
import { Simulator } from "./pages/Simulator";
import { Investments } from "./pages/Investments";
import { Finance } from "./pages/Finance";
import { Economy } from "./pages/Economy";
import { Tech } from "./pages/Tech";
import { Career } from "./pages/Career";
import { About } from "./pages/About";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Contact } from "./pages/Contact";

const PAGES: Record<string, React.ReactNode> = {
  "Simuladores": <Simulator />,
  "Investimentos": <Investments />,
  "Finanças": <Finance />,
  "Economia": <Economy />,
  "Tecnologia": <Tech />,
  "Carreira": <Career />,
  "Sobre nós": <About />,
  "Privacidade": <Privacy />,
  "Termos de uso": <Terms />,
  "Contato": <Contact />,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("Simuladores");

  return (
    <RootLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {PAGES[currentPage] || <Simulator />}
    </RootLayout>
  );
}
