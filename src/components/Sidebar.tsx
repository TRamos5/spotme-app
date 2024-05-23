"use client";

import {
	BellIcon,
	ChartBarIcon,
	CreditCardIcon,
	HomeIcon,
	ClipboardDocumentListIcon,
	EnvelopeIcon,
	ArrowUpIcon,
	LinkIcon,
	BanknotesIcon,
} from "@heroicons/react/16/solid";
import ExpenseModal from "./ExpenseModal";
import SavingsModal from "./SavingsModal";
import { useState } from "react";

export default function Sidebar() {
	const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
	const [isSavingsModalOpen, setIsSavingsModalOpen] = useState<boolean>(false);

	const openExpenseModal = () => setIsExpenseModalOpen(true);
	const closeExpenseModal = () => setIsExpenseModalOpen(false);
	const openSavingsModal = () => setIsSavingsModalOpen(true);
	const closeSavingsModal = () => setIsSavingsModalOpen(false);

	return (
		<>
			<div className="bg-slate-800 flex-none w-14 sm:w-20 h-screen">
				<div className="h-20 items-center flex">
					<a href="/">
						<HomeIcon
							width={40}
							className="text-gray-300 left-3 sm:left-6 fixed"
						/>
					</a>
				</div>
				<div className="fixed left-3 sm:left-6 top-[100px]">
					<a href="/dashboard">
						<ChartBarIcon
							width={40}
							className="bg-gray-900 p-2 rounded-lg mb-4 text-gray-300"
						/>
					</a>
					<CreditCardIcon
						onClick={openExpenseModal}
						width={40}
						className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300 cursor-pointer hover:bg-gray-900"
					/>
					<BanknotesIcon
						onClick={openSavingsModal}
						width={40}
						className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300 cursor-pointer hover:bg-gray-900"
					/>
					{/*<EnvelopeIcon
					width={40}
					className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300 "
				/>
				<BellIcon
					width={40}
					className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
				/> */}
				</div>
				<div className="fixed bottom-4 left-3 sm:left-6">
					<a href="#top">
						<ArrowUpIcon
							width={40}
							className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300 cursor-pointer hover:bg-gray-900"
						/>
					</a>
					{/* <LinkIcon
					width={40}
					className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
				/> */}
				</div>
			</div>
			<ExpenseModal isOpen={isExpenseModalOpen} onClose={closeExpenseModal} />
			<SavingsModal isOpen={isSavingsModalOpen} onClose={closeSavingsModal} />
		</>
	);
}
