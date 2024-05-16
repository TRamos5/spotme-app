"use client";

import { useRouter } from "next/navigation";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

export default function App() {
	const router = useRouter();

	const handleLoginClick = () => {
		router.push("/login");
	};

	return (
		<Authenticator>
			{({ signOut, user }) => (
				<main>
					<h1>Hello {user?.username}</h1>
					<div>Welcome to the dashboard</div>
					<button onClick={signOut}>Sign out</button>
				</main>
			)}
		</Authenticator>
	);
}
