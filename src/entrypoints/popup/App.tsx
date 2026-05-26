import { useEffect } from "react";
import Hide from "./hide";
import QrCommands from "./qrCommands";
import Printing from "./printing";

function App() {
  useEffect(() => {
    const body = document.documentElement;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
