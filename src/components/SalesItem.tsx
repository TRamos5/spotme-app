"use client";

import { useState } from "react";
import {
	BadgeDelta,
	Button,
	Card,
	DonutChart,
	Flex,
	TabGroup,
	Tab,
	TabList,
	Bold,
	Divider,
	List,
	ListItem,
	Metric,
	Text,
	Title,
} from "@tremor/react";
import {
	ArrowRightIcon,
	ChartPieIcon,
	ListBulletIcon,
} from "@heroicons/react/16/solid";
import { dataFormatter } from "../utils/utils";
import type { Schema } from "@/amplify/data/resource";

type Expenses = Schema["Expenses"]["type"];

export default function SalesItem({
	expenses,
	month,
}: {
	expenses: Expenses[];
	month: string;
}) {
	console.log(expenses);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const expenseTotal = expenses.reduce(
		(acc, expense) => acc + expense.expenseAmount,
		0
	);
	const categories = expenses.map((expense) => expense.expenseCategory);
	const uniqueCategoriesSet = new Set(categories);
	const uniqueCategories = Array.from(uniqueCategoriesSet);

	const groupedAndSummedExpenses = Object.values(
		expenses.reduce((acc, expense) => {
			const { expenseCategory, expenseAmount } = expense;
			if (!acc[expenseCategory]) {
				acc[expenseCategory] = { ...expense, expenseAmount: 0 };
			}
			acc[expenseCategory].expenseAmount += expenseAmount;
			return acc;
		}, {} as Record<string, (typeof expenses)[0]>)
	);

	console.log(groupedAndSummedExpenses);

	return (
		<Card className="max-w-full mx-auto">
			<Flex className="space-x-8 flex-col lg:flex-row">
				<Title>Overview</Title>
				<TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
					<TabList variant="solid">
						<Tab icon={ChartPieIcon}>Chart</Tab>
						<Tab icon={ListBulletIcon}>List</Tab>
					</TabList>
				</TabGroup>
			</Flex>
			<Text className="mt-8">Total Expenses Value for 2024</Text>
			<Metric>{dataFormatter(expenseTotal)}</Metric>
			<Divider />
			<Text className="mt-8">
				<Bold>Expense Allocation</Bold>
			</Text>
			<Text>{uniqueCategories.length} Categories</Text>
			{selectedIndex === 0 ? (
				<DonutChart
					data={groupedAndSummedExpenses}
					valueFormatter={dataFormatter}
					showAnimation={true}
					category="expenseAmount"
					index="expenseCategory"
					className="mt-6"
				/>
			) : (
				<>
					<Flex className="mt-8" justifyContent="between">
						<Text className="truncate">
							<Bold>Expenses</Bold>
						</Text>
						<Text>Amount</Text>
					</Flex>
					<List className="mt-4">
						{expenses.map((expense) => (
							<ListItem key={expense.expenseName}>
								<Text>{expense.expenseName}</Text>
								<Flex className="space-x-2" justifyContent="end">
									<Text>
										{/* $ {Intl.NumberFormat("us").format(stock.value).toString()} */}
										{expense.expenseAmount}
									</Text>
								</Flex>
							</ListItem>
						))}
					</List>
				</>
			)}
			{/* <Flex className="mt-6 pt-4 border-t">
				<Button
					size="xs"
					variant="light"
					icon={ArrowRightIcon}
					iconPosition="right"
				>
					View more
				</Button>
			</Flex> */}
		</Card>
	);
}
