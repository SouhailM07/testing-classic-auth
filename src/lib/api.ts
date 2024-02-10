//
import { account, db } from "@/appwrite";

import { Query, ID } from "appwrite";

export const getUserInformation = async () => {
  try {
    const response = await account.get();
    console.log(response); // This will log the user's information
    return response;
  } catch (error) {
    console.error(error); // Handle error if the request fails
  }
};

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
        user.password,
        user.name
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
    console.log(userExist);
    if (userExist.total < 1) {
      console.log("it sending");
      return 0;
    }
    // login
    else {
      let logedUser: any = await account
        .createEmailSession(user.email, user.password)
        .then(() => {
          // let router = useRouter();
          // router.push("/home");
          return "access";
        });
      return logedUser;
      // logedUser.then(
      //   function (response) {
      //     console.log(response); // Success
      //   },
      //   function (error) {
      //     console.log(error); // Failure
      //   }
      // );
    }
    // check this later
    // await account.deleteSession("current");
  } catch (error) {
    console.log(error);
  }
}
