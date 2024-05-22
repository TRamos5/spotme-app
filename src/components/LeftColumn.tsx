import CardItem from "./CardItem";
import AreaChartComponent from "./AreaChartComponent";
import TableComponent from "./TableComponent";
import { dataFormatter, getCurrentMonth } from "../utils/utils";

export default function LeftColumn() {
	return (
		<div className="w-full flex flex-col justify-between p-2">
			<div className="flex flex-col lg:flex-row gap-2 w-full">
				<CardItem name={"Yearly Income"} amount={dataFormatter(100000)} />
				<CardItem name={"Monthly Income"} amount={dataFormatter(5000)} />
				<CardItem name={"Amount To Save"} amount={dataFormatter(2000)} />
			</div>
			<div className="flex-auto w-full">
				<AreaChartComponent />
				<TableComponent month={getCurrentMonth()} expenses={[]} />
			</div>
		</div>
	);
}
