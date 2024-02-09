import { Client, Account, Databases, ID } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

export const account = new Account(client);
export const db = new Databases(client);
export { ID } from "appwrite";
