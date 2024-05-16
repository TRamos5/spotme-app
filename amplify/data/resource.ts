import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	SavingStrategy: a
		.model({
			savingsModel: a.string(),
			monthlyIncome: a.float(),
			amountToSave: a.float(),
		})
		.authorization((allow) => [allow.owner()]),
	Expenses: a
		.model({
			expenseName: a.string(),
			expenseAmount: a.float(),
			month: a.string(),
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
