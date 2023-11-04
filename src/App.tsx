import { Router } from "@Features/Routing";
import "./assets/styles/global.scss";
import { useEffect } from "react";

function App() {
  const isDark = true;

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return <Router />;
}

export default App;
