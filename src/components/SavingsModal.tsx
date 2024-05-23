"use client";

import { Flex, Label, Input, SelectField, Button } from "@aws-amplify/ui-react";
import { createAmountSaved } from "@/src/app/_actions/actions";
import { useRef } from "react";
import "@aws-amplify/ui-react/styles.css";
import { useFormStatus } from "react-dom";
import { XMarkIcon } from "@heroicons/react/16/solid";

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

export default function SavingsModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
			<div className="bg-white p-16 rounded-md">
				<div className="flex items-center justify-between gap-12 mb-4">
					<h1 className="text-xl font-bold">
						Let's add how much you've saved!
					</h1>
					<XMarkIcon
						width={30}
						className="text-gray-500 cursor-pointer"
						onClick={onClose}
					>
						Close
					</XMarkIcon>
				</div>
				<Form action={createAmountSaved} />
			</div>
		</div>
	);
}
