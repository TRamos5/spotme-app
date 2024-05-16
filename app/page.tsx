"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
	const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

	function listTodos() {
		client.models.Todo.observeQuery().subscribe({
			next: (data) => setTodos([...data.items]),
		});
	}

	function deleteTodo(id: string) {
		client.models.Todo.delete({ id });
	}

	useEffect(() => {
		listTodos();
	}, []);

	function createTodo() {
		client.models.Todo.create({
			content: window.prompt("Todo content"),
		});
	}

	return (
		<Authenticator>
			{({ signOut, user }) => (
				<main>
					<h1>{user?.signInDetails?.loginId}'s todos</h1>
					<h1>My todos</h1>
					<button onClick={createTodo}>+ new</button>
					<ul>
						{todos.map((todo) => (
							<li key={todo.id} onClick={() => deleteTodo(todo.id)}>
								{todo.content}
							</li>
						))}
					</ul>
					<div>
						🥳 App successfully hosted. Try creating a new todo.
						<br />
						<a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
							Review next steps of this tutorial.
						</a>
					</div>
					<button onClick={signOut}>Sign out</button>
				</main>
			)}
		</Authenticator>
	);
}
