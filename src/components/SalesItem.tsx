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

const stocks = [
	{
		name: "Off Running AG",
		value: 10456,
		performance: "6.1%",
		deltaType: "increase",
	},
	{
		name: "Not Normal Inc.",
		value: 5789,
		performance: "1.2%",
		deltaType: "moderateDecrease",
	},
	{
		name: "Logibling Inc.",
		value: 4367,
		performance: "2.3%",
		deltaType: "moderateIncrease",
	},
	{
		name: "Raindrop Inc.",
		value: 3421,
		performance: "0.5%",
		deltaType: "moderateDecrease",
	},
	{
		name: "Mwatch Group",
		value: 1432,
		performance: "3.4%",
		deltaType: "decrease",
	},
];

export default function SalesItem({
	expenses,
	month,
}: {
	expenses: Schema["Expenses"][];
	month: string;
}) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const expenseTotal = expenses.reduce(
		(acc, expense) => acc + expense.type.expenseAmount,
		0
	);
	const categories = expenses.map((expense) => expense.type.expenseCategory);

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
			<Text className="mt-8">Expenses Value</Text>
			<Metric>$ {expenseTotal}</Metric>
			<Divider />
			<Text className="mt-8">
				<Bold>Expense Allocation</Bold>
			</Text>
			<Text>{categories.length} Categories</Text>
			{selectedIndex === 0 ? (
				<DonutChart
					data={expenses}
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
							<ListItem key={expense.type.expenseName}>
								<Text>{expense.type.expenseName}</Text>
								<Flex className="space-x-2" justifyContent="end">
									<Text>
										{/* $ {Intl.NumberFormat("us").format(stock.value).toString()} */}
										{expense.type.expenseAmount}
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
