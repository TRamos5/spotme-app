"use client";

import { Flex, Label, Input, SelectField } from "@aws-amplify/ui-react";
import { createAmountSaved } from "@/src/app/_actions/actions";
import { Button } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import "@aws-amplify/ui-react/styles.css";
import { useFormStatus } from "react-dom";

function Submit() {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending}>
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
					<Label htmlFor="amountSaved">How much did you save?</Label>
					<Input required id="amountSaved" type="string" name="amountSaved" />
				</Flex>
				<Flex direction="column" gap="small">
					<SelectField
						id="month"
						name="month"
						label="What month did you save this in?"
						options={[
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December",
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

	return (
		<div className="flex flex-col justify-center h-screen w-screen items-center">
			<div className="bg-white p-16 rounded-md">
				<div className="flex items-center justify-between gap-12 mb-4">
					<h1 className="text-xl font-bold">
						Let's add how much you've saved!
					</h1>
					<Button
						variation="link"
						colorTheme="overlay"
						onClick={() => router.replace("/dashboard")}
					>
						Back to dashboard
					</Button>
				</div>
				<Form action={createAmountSaved} />
			</div>
		</div>
	);
}
