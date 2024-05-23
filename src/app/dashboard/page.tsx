import "@aws-amplify/ui-react/styles.css";
import Sidebar from "@/src/components/Sidebar";
import Navbar from "@/src/components/Navbar";
import LeftColumn from "@/src/components/LeftColumn";
import RightColumn from "@/src/components/RightColumn";
import {
	AuthGetCurrentUserAttributesServer,
	cookiesClient,
} from "@/src/utils/amplify-utils";
import { months } from "@/src/utils/utils";

export default async function App() {
	const user = await AuthGetCurrentUserAttributesServer();
	const { data: expenses, errors: expensesErrors } =
		await cookiesClient.models.Expenses.list();
	const { data: savingStrategy, errors: savingStrategyErrors } =
		await cookiesClient.models.SavingStrategy.list();
	const { data: amountSaved, errors: amountSavedErros } =
		await cookiesClient.models.AmountSaved.list();

	// Sort the amountSaved by month
	amountSaved.sort((a, b) => {
		const monthIndexA = months.indexOf(a.month);
		const monthIndexB = months.indexOf(b.month);
		return monthIndexA - monthIndexB;
	});

	return (
		<main className="flex">
			<Sidebar />
			<div className="flex flex-col flex-1 relative">
				<Navbar username={user?.preferred_username || ""} />
				<div className="grid md:grid-cols-3 grid-cols-1 w-full">
					<div className="col-span-2">
						<LeftColumn
							savingStrategy={savingStrategy}
							expenses={expenses}
							amountSaved={amountSaved}
						/>
					</div>
					<div className="w-full">
						<RightColumn expenses={expenses} />
					</div>
				</div>
			</div>
		</main>
	);
}
