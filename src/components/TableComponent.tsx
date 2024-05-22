"use client";

import { ClockIcon } from "@heroicons/react/16/solid";
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

const TableComponent = ({
	expenses,
	month,
}: {
	expenses: Schema["Expenses"][];
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
						<TableRow key={expense.type.expenseName}>
							<TableCell>{expense.type.expenseName}</TableCell>
							<TableCell>
								<Text>{expense.type.expenseAmount}</Text>
							</TableCell>
							<TableCell>
								<Badge color="emerald" icon={ClockIcon}>
									{expense.type.expenseCategory}
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
