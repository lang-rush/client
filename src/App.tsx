import { Router } from "@Features/Routing";
import "./assets/styles/global.scss";
import { useEffect } from "react";
import { useAppSelector } from "./store/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "@lib/apolloClient";

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
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;
