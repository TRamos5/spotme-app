"use client";

import { Card, Title, BarChart } from "@tremor/react";
import { dataFormatter } from "../utils/utils";
import type { Schema } from "@/amplify/data/resource";

type AmountSaved = Schema["AmountSaved"]["type"];

export default function BarChartComponent({
	amountToSave,
	amountSaved,
}: {
	amountToSave: number;
	amountSaved: AmountSaved[];
}) {
	return (
		<Card className="mt-4">
			<Title>Saved amount in 2024 (USD)</Title>
			<BarChart
				className="h-72 mt-4"
				data={amountSaved}
				index="month"
				categories={["amountSaved"]}
				colors={["indigo"]}
				valueFormatter={dataFormatter}
				maxValue={amountToSave}
			/>
		</Card>
	);
}
