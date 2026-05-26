import { useEffect } from "react";
import Hide from "./hide";
import QrCommands from "./qrCommands";

function App() {
  useEffect(() => {
    const theme = "system";
    const body = document.documentElement;

    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    body.classList.toggle("dark", isDark);
  }, []);

  return (
    <>
      <QrCommands />
      <Hide />
    </>
  );
}

export default App;
