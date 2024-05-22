"use client";

import { TextInput } from "@tremor/react";
import { WifiIcon } from "@heroicons/react/20/solid";
import Logout from "./Logout";

export default function Navbar({ username }: { username: string }) {
	return (
		<div
			id="top"
			className="relative w-full sm:flex justify-between items-center p-2"
		>
			<h1 className="font-bold text-gray-300">Welcome, {username}</h1>
			<div className="py-2">
				{/* <TextInput icon={WifiIcon} placeholder="Search..." /> */}
				<Logout />
			</div>
		</div>
	);
}
