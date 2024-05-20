// app/layout.tsx
import "@aws-amplify/ui-react/styles.css";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
