import { account, db } from "@/appwrite";

import { Query, ID } from "appwrite";

// ! to create new user

export async function createNewUser(user: any) {
  try {
    // check if user exist
    const userExist = await db.listDocuments(
      process.env.NEXT_PUBLIC_DB_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [Query.equal("email", [user.email])]
    );
    // console.log(userExist);
    if (userExist.total > 0) {
      return userExist.total;
    } else {
      await db.createDocument(
        process.env.NEXT_PUBLIC_DB_ID!,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
        ID.unique(),
        {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );
      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.name,
        user.password
      );
      // console.log(newAccount);
    }
  } catch (error) {
    console.log(error);
  }
}

// ! to login
export async function userLogin(user) {
  try {
    //  check if user exist
    const userExist = await db.listDocuments(
      process.env.NEXT_PUBLIC_DB_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [Query.equal("email", [user.email])]
    );
    if (!userExist.total) {
      return 0;
    }
    // login
    await account.createEmailSession(user.email, user.password);
  } catch (error) {
    console.log(error);
  }
}
