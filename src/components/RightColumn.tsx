import SalesItem from "./SalesItem";
import WebAnalytics from "./WebAnalytics";
import ScoreList from "./ScoreList";
import { getCurrentMonth } from "../utils/utils";

export default function RightColumn() {
	return (
		<div className="w-full p-2">
			<SalesItem month={getCurrentMonth()} expenses={[]} />
			{/* <WebAnalytics /> */}
			{/* <ScoreList /> */}
		</div>
	);
}
