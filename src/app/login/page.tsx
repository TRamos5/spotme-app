"use client";

import {
	Authenticator,
	Text,
	View,
	useAuthenticator,
} from "@aws-amplify/ui-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { signUp, SignUpInput } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";

function CustomAuthenticator() {
	const { user } = useAuthenticator((context) => [context.user]);

	const services = {
		async handleSignUp(input: SignUpInput) {
			const { username, password } = input;
			return signUp({
				username,
				password,
				options: {
					...input.options,
					userAttributes: {
						...input.options?.userAttributes,
						"custom:isSetup": "0",
					},
				},
			});
		},
	};

	useEffect(() => {
		if (user) {
			redirect("/dashboard");
		}
	}, [user]);

	return (
		<div className="h-screen w-screen flex justify-center">
			<Authenticator
				services={services}
				signUpAttributes={["preferred_username"]}
			/>
		</div>
	);
}

export default function LoginPage() {
	return (
		<Authenticator.Provider>
			<CustomAuthenticator />
		</Authenticator.Provider>
	);
}
