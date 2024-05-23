"use client";

import { Flex, Label, Input, SelectField } from "@aws-amplify/ui-react";
import { createSavingStrategy } from "@/src/app/_actions/actions";
import { Button } from "@aws-amplify/ui-react";
import { updateUserAttributes, fetchUserAttributes } from "aws-amplify/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import "@aws-amplify/ui-react/styles.css";
import { useFormStatus } from "react-dom";

function Submit() {
	const { pending } = useFormStatus();

	async function updateUser() {
		await updateUserAttributes({
			userAttributes: {
				"custom:isSetup": "1",
			},
		});
	}

	return (
		<Button type="submit" disabled={pending} onClick={updateUser}>
			{pending ? "Submitting..." : "Submit"}
		</Button>
	);
}

function Form({ action }: { action: (formData: FormData) => void }) {
	const ref = useRef<HTMLFormElement>(null);

	return (
		<form
			ref={ref}
			action={async (formData) => {
				await action(formData);
				ref.current?.reset();
			}}
		>
			<Flex direction="column" gap="2rem">
				<Flex direction="column" gap="small">
					<Label htmlFor="monthlyIncome">
						What is your monthly income after taxes?
					</Label>
					<Input
						required
						id="monthlyIncome"
						type="number"
						name="monthlyIncome"
					/>
				</Flex>
				<Flex direction="column" gap="small">
					<SelectField
						id="savingsModel"
						name="savingsModel"
						label="How much of your monthly income do you want to save?"
						options={[
							"50% - Aggressive",
							"30% - Moderate",
							"20% - Conservative",
							"10% - Essential",
						]}
					></SelectField>
				</Flex>
				<Submit />
			</Flex>
		</form>
	);
}

export default function Setup() {
	const router = useRouter();

	useEffect(() => {
		async function getUserAttributes() {
			try {
				const userAttributes = await fetchUserAttributes();
				if (userAttributes && userAttributes["custom:isSetup"] === "1") {
					router.replace("/dashboard");
				}
			} catch (error) {
				console.error("Error fetching user attributes", error);
			}
		}
		getUserAttributes();
	}, [router]);

	return (
		<div className="flex flex-col justify-center h-screen w-screen items-center">
			<div className="bg-white p-16 rounded-md">
				<h1 className="text-xl font-bold">Hi, let's setup your account!</h1>
				<Form action={createSavingStrategy} />
			</div>
		</div>
	);
}
