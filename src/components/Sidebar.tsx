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
} from "@heroicons/react/16/solid";

export default function Sidebar() {
	return (
		<div className="bg-slate-800 flex-none w-14 sm:w-20 h-screen">
			<div className="h-20 items-center flex">
				<HomeIcon width={40} className="text-gray-300 left-3 sm:left-6 fixed" />
			</div>
			<div className="fixed left-3 sm:left-6 top-[100px]">
				<ChartBarIcon
					width={40}
					className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300 "
				/>
				<CreditCardIcon
					width={40}
					className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300 "
				/>
				{/* <ClipboardDocumentListIcon
					width={40}
					className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300 "
				/>
				<EnvelopeIcon
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
						className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
					/>
				</a>
				{/* <LinkIcon
					width={40}
					className="bg-gray-600 p-2 rounded-lg mb-4 text-gray-300"
				/> */}
			</div>
		</div>
	);
}
