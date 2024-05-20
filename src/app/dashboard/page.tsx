import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import Logout from "@/src/components/Logout";

const client = generateClient<Schema>();

export default async function App() {
	return (
		<main>
			<h1>Hello</h1>
			<div>Welcome to the dashboard</div>
			<Logout />
		</main>
	);
}
