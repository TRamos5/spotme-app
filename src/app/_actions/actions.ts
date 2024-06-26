"use server";

import { cookiesClient } from "@/src/utils/amplify-utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createExpense(formData: FormData) {
	try {
		const { data } = await cookiesClient.models.Expenses.create({
			expenseName: formData.get("expenseName") as string,
			expenseAmount: parseFloat(formData.get("expenseAmount") as string),
			expenseCategory: formData.get("expenseCategory") as string,
			month: formData.get("month") as string,
			year: "2024",
		});
		console.log("Created expense", data);
		revalidatePath("/dashboard");
	} catch (error) {
		console.error("Error creating expense", error);
		redirect("/login");
	}
}

export async function createAmountSaved(formData: FormData) {
	try {
		const { data } = await cookiesClient.models.AmountSaved.create({
			amountSaved: parseFloat(formData.get("amountSaved") as string),
			month: formData.get("month") as string,
			year: "2024",
		});
		console.log("Created amount saved", data);
		revalidatePath("/dashboard");
	} catch (error) {
		console.error("Error creating amount saved", error);
		redirect("/login");
	}
}

export async function createSavingStrategy(formData: FormData) {
	try {
		let savingPercentage;
		const savingModel = formData.get("savingsModel") as string;
		const monthlyIncome = parseFloat(formData.get("monthlyIncome") as string);

		switch (savingModel) {
			case "50% - Aggressive":
				savingPercentage = 0.5;
				break;
			case "30% - Moderate":
				savingPercentage = 0.3;
				break;
			case "20% - Conservative":
				savingPercentage = 0.2;
				break;
			case "10% - Essential":
				savingPercentage = 0.1;
				break;
			default:
				throw "Invalid saving model";
		}

		const { data } = await cookiesClient.models.SavingStrategy.create({
			savingsModel: savingModel,
			monthlyIncome: parseFloat(formData.get("monthlyIncome") as string),
			amountToSave: monthlyIncome * savingPercentage,
			yearlyIncome: monthlyIncome * 12,
		});

		console.log("Created saving strategy", data);
		revalidatePath("/dashboard");
		redirect("/dashboard");
	} catch (error) {
		console.error("Error creating saving strategy", error);
		redirect("/login");
	}
}
