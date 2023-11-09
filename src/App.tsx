import { Router } from "@Features/Routing";
import "./assets/styles/global.scss";
import { useEffect } from "react";
import { useAppSelector } from "./store/store";

function App() {
  const isDark = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
