import { ModeToggle } from "./components/mode-toggle";
import Meetings from "./routes/meetings";
import Payments from "./routes/payments";

function App() {
  return (
    <>
      <ModeToggle />
      <Payments />
    </>
  );
}

export default App;
