"use server";

import { cookiesClient } from "@/src/utils/amplify-utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createExpense(formData: FormData) {
	const { data } = await cookiesClient.models.Expenses.create({
		expenseName: formData.get("expenseName") as string,
		expenseAmount: parseFloat(formData.get("expenseAmount") as string),
		expenseCategory: formData.get("expenseCategory") as string,
		month: formData.get("month") as string,
		year: formData.get("year") as string,
	});
	console.log("Created expense", data);
	revalidatePath("/dashboard");
}

export async function createSavingStrategy(formData: FormData) {
	try {
		let savingPercentage;
		const savingModel = formData.get("savingsModel") as string;
		const monthlyIncome = parseFloat(formData.get("monthlyIncome") as string);

		switch (savingModel) {
			case "FIRE":
				savingPercentage = 0.25;
				break;
			case "30/60":
				savingPercentage = 0.3;
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
