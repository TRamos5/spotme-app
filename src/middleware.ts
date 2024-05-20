// middleware.ts
import { NextRequest, NextResponse } from "next/server";

import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth/server";

import { runWithAmplifyServerContext } from "@/src/utils/amplify-utils";
import { a } from "@aws-amplify/backend";

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();

	const authenticated = await runWithAmplifyServerContext({
		nextServerContext: { request, response },
		operation: async (contextSpec) => {
			try {
				const session = await fetchAuthSession(contextSpec, {});
				return session.tokens !== undefined;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	});

	const isSetup = await runWithAmplifyServerContext({
		nextServerContext: { request, response },
		operation: async (contextSpec) => {
			try {
				const attributes = await fetchUserAttributes(contextSpec);
				console.log(attributes);
				return attributes["custom:isSetup"] === "1";
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	});

	const { pathname } = request.nextUrl;

	if (pathname === "/") {
		return response;
	}

	if (authenticated) {
		if (!isSetup && pathname !== "/dashboard/setup") {
			const newUrl = new URL("/dashboard/setup", request.url);
			return NextResponse.redirect(newUrl);
		}
		return response;
	}

	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - login
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|login|dashboard/setup).*)",
	],
};
