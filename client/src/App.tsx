import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Preview from "@/pages/preview";
import LuminaApp from "@/pages/lumina-app";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LuminaApp} />
      <Route path="/categories" component={LuminaApp} />
      <Route path="/dashboard" component={Home} />
      <Route path="/category" component={Home} />
      <Route path="/game" component={Home} />
      <Route path="/preview" component={Preview} />
      <Route path="/old" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div 
          style={{
            minHeight: '100vh',
            background: 'radial-gradient(ellipse at center, hsl(230, 35%, 15%) 0%, hsl(230, 35%, 7%) 50%, hsl(220, 40%, 5%) 100%)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1
          }}
        />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
