"use client";

import "./../app/app.css";
import { useRouter } from "next/navigation";

export default function App() {
	const router = useRouter();

	const handleLoginClick = () => {
		router.push("/dashboard");
	};

	return (
		<main>
			<h1 className="text-3xl font-bold">Welcome</h1>
			<button onClick={handleLoginClick}>Login</button>
		</main>
	);
}
