import CardItem from "./CardItem";
import BarChartComponent from "./BarChartComponent";
import TableComponent from "./TableComponent";
import { dataFormatter, getCurrentMonth } from "../utils/utils";
import type { Schema } from "@/amplify/data/resource";

type SavingStrategy = Schema["SavingStrategy"]["type"];
type Expenses = Schema["Expenses"]["type"];
type AmountSaved = Schema["AmountSaved"]["type"];

export default function LeftColumn({
	savingStrategy,
	expenses,
	amountSaved,
}: {
	savingStrategy: SavingStrategy[];
	expenses: Expenses[];
	amountSaved: AmountSaved[];
}) {
	const strategy = savingStrategy[0];
	return (
		<div className="w-full flex flex-col justify-between p-2">
			<div className="flex flex-col lg:flex-row gap-2 w-full">
				<CardItem
					name={"Yearly Income"}
					amount={dataFormatter(strategy.yearlyIncome)}
				/>
				<CardItem
					name={"Monthly Income"}
					amount={dataFormatter(strategy.monthlyIncome)}
				/>
				<CardItem
					name={"Amount To Save"}
					amount={dataFormatter(strategy.amountToSave)}
				/>
			</div>
			<div className="flex-auto w-full">
				<BarChartComponent
					amountToSave={strategy.amountToSave}
					amountSaved={amountSaved}
				/>
				<TableComponent month={getCurrentMonth()} expenses={expenses} />
			</div>
		</div>
	);
}
