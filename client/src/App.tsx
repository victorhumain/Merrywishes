import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CardView from "@/pages/CardView";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/card/:id" component={CardView} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        {/* Ad Placeholder */}
        <div className="w-full h-24 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground text-sm">
          Espace Publicitaire (Sponsorisé par Adsense)
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
