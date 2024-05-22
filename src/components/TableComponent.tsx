"use client";

import { CreditCardIcon } from "@heroicons/react/16/solid";
import {
	Card,
	Table,
	TableHead,
	TableRow,
	TableHeaderCell,
	TableBody,
	TableCell,
	Text,
	Title,
	Badge,
} from "@tremor/react";
import type { Schema } from "@/amplify/data/resource";
import { dataFormatter } from "../utils/utils";

type Expenses = Schema["Expenses"]["type"];

const TableComponent = ({
	expenses,
	month,
}: {
	expenses: Expenses[];
	month: string;
}) => {
	return (
		<Card className="mt-4">
			<Title>List of Expenses for {month}</Title>
			<Table className="mt-5">
				<TableHead>
					<TableRow>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Amount</TableHeaderCell>
						<TableHeaderCell>Category</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{expenses.map((expense) => (
						<TableRow key={expense.expenseName}>
							<TableCell>{expense.expenseName}</TableCell>
							<TableCell>
								<Text>{dataFormatter(expense.expenseAmount)}</Text>
							</TableCell>
							<TableCell>
								<Badge color="red" icon={CreditCardIcon}>
									{expense.expenseCategory}
								</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};

export default TableComponent;
