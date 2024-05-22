"use client";

import { Flex, Label, Input } from "@aws-amplify/ui-react";
import { createExpense } from "@/src/app/_actions/actions";
import { Button } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import "../../app.css";

export default function Setup() {
	const router = useRouter();

	return (
		<div>
			<h1>Let's add your expenses!</h1>
			<form action={createExpense}>
				<Flex direction="column">
					<Flex direction="column" gap="small">
						<Label htmlFor="expenseName">What was the expense?</Label>
						<Input id="expenseName" type="string" name="expenseName" />
					</Flex>
					<Flex direction="column" gap="small">
						<Label htmlFor="expenseAmount">How much was it?</Label>
						<Input id="expenseAmount" type="number" name="expenseAmount" />
					</Flex>
					<Flex direction="column" gap="small">
						<Label htmlFor="expenseCategory">
							What category does it fall under?
						</Label>
						<Input id="expenseCategory" type="string" name="expenseCategory" />
					</Flex>
					<Flex direction="column" gap="small">
						<Label htmlFor="month">What month did it occur?</Label>
						<Input id="month" type="string" name="month" />
					</Flex>
				</Flex>
				<Button type="submit">Submit</Button>
			</form>
			<Button onClick={() => router.replace("/dashboard")}>
				Back to dashboard
			</Button>
		</div>
	);
}
