import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	SavingStrategy: a
		.model({
			savingsModel: a.string().required(),
			monthlyIncome: a.float().required(),
			amountToSave: a.float().required(),
			yearlyIncome: a.float().required(),
		})
		.authorization((allow) => [allow.owner()]),
	Expenses: a
		.model({
			expenseName: a.string().required(),
			expenseAmount: a.float().required(),
			expenseCategory: a.string().required(),
			month: a.string().required(),
			year: a.string().required(),
		})
		.authorization((allow) => [allow.owner()]),
	AmountSaved: a
		.model({
			amountSaved: a.float().required(),
			month: a.string().required(),
			year: a.string().required(),
		})
		.authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "userPool",
		apiKeyAuthorizationMode: {
			expiresInDays: 30,
		},
	},
});
