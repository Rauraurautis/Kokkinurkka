import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import { router } from "./routes";

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
    </div>

  );
}

export default App;
