import SalesItem from "./SalesItem";
import WebAnalytics from "./WebAnalytics";
import ScoreList from "./ScoreList";
import { getCurrentMonth } from "../utils/utils";
import type { Schema } from "@/amplify/data/resource";

type Expenses = Schema["Expenses"]["type"];

export default function RightColumn({ expenses }: { expenses: Expenses[] }) {
	return (
		<div className="w-full p-2">
			<SalesItem expenses={expenses} month={getCurrentMonth()} />
			{/* <WebAnalytics /> */}
			{/* <ScoreList /> */}
		</div>
	);
}
