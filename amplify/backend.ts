import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { RemovalPolicy } from "aws-cdk-lib";

const backend = defineBackend({
	auth,
	data,
});

const userPool = backend.auth.resources.userPool as UserPool;
userPool.applyRemovalPolicy(RemovalPolicy.DESTROY);
