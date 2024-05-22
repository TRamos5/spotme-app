"use client";

import { Card, Metric, Text, Flex, BadgeDelta } from "@tremor/react";

export default function CardItem({
	name,
	amount,
}: {
	name: string;
	amount: string;
}) {
	return (
		<Card className="w-xs" decoration="top" decorationColor="indigo">
			<Flex justifyContent="between" alignItems="center">
				<Text>{name}</Text>
				{/* <BadgeDelta deltaType="moderateIncrease">+12.5%</BadgeDelta> */}
			</Flex>
			<Metric>{amount}</Metric>
		</Card>
	);
}
