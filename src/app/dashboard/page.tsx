import "@aws-amplify/ui-react/styles.css";
import Sidebar from "@/src/components/Sidebar";
import Navbar from "@/src/components/Navbar";
import LeftColumn from "@/src/components/LeftColumn";
import RightColumn from "@/src/components/RightColumn";
import {
	AuthGetCurrentUserAttributesServer,
	cookiesClient,
} from "@/src/utils/amplify-utils";

export default async function App() {
	const user = await AuthGetCurrentUserAttributesServer();
	// const expenses = await cookiesClient.models.Expenses.list();
	// const savingStrategy = await cookiesClient.models.SavingStrategy.list();
	// const amountSaved = await cookiesClient.models.AmountSaved.list();

	// console.log(expenses);

	return (
		<main className="flex">
			<Sidebar />
			<div className="flex flex-col flex-1 relative">
				<Navbar username={user?.preferred_username || ""} />
				<div className="grid md:grid-cols-3 grid-cols-1 w-full">
					<div className="col-span-2">
						<LeftColumn />
					</div>
					<div className="w-full">
						<RightColumn />
					</div>
				</div>
			</div>
		</main>
	);
}
