import { Toaster } from "@/components/ui/toaster";
import { HeroScreen } from "./components/hero-screen";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="w-screen h-screen bg-background">
				<HeroScreen />
				<Toaster />
			</div>
		</ThemeProvider>
	);
}

export default App;
