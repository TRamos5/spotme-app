"use client";

import { Flex, Label, Input } from "@aws-amplify/ui-react";
import { createSavingStrategy } from "@/src/app/_actions/actions";
import { Button } from "@aws-amplify/ui-react";
import { updateUserAttributes, fetchUserAttributes } from "aws-amplify/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../app.css";

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

	async function updateUser() {
		await updateUserAttributes({
			userAttributes: {
				"custom:isSetup": "1",
			},
		});
	}

	return (
		<div>
			<h1>Hi, let's setup your account!</h1>
			<form action={createSavingStrategy}>
				<Flex direction="column">
					<Flex direction="column" gap="small">
						<Label htmlFor="savingsModel">
							What saving strategy would you like?
						</Label>
						<Input id="savingsModel" type="string" name="savingsModel" />
					</Flex>
					<Flex direction="column" gap="small">
						<Label htmlFor="monthlyIncome">
							What is your monthly income after taxes?
						</Label>
						<Input id="monthlyIncome" type="number" name="monthlyIncome" />
					</Flex>
				</Flex>
				<Button type="submit" onClick={updateUser}>
					Submit
				</Button>
			</form>
		</div>
	);
}
