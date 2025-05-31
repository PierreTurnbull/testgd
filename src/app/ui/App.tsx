import { EditorBar } from "./components/EditorBar/EditorBar";
import { ClosingProvider } from "./contexts/closing/closing.provider";

export const App = () => {
	return (
		<ClosingProvider>
			<EditorBar />
		</ClosingProvider>
	);
};