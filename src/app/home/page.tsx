"use client";
import { account } from "@/appwrite";
// hooks
import { useState } from "react";
export default function Home_page() {
  let [user, setUser]: any = useState("");
  let test: any = "";
  let userDetails = account
    .get()
    .then((userInfo) => {
      // ! this line will console log infinite amount of yellow errors
      // !setUser(userInfo);
      test = userInfo;
      // return userInfo;
    })
    .catch((err) => {
      console.log(err);
      return 0;
    });
  // console.log(userDetails);
  return (
    <>
      <main className="flex justify-center items-center min-h-screen">
        <article className="border-2 border-red-500 min-w-[22rem] h-[10rem] rounded-md">
          <h1 className="text-center text-[1.5rem]">Welcome {user.name}</h1>
          <p>{user.email}</p>
          <p>member since : {user["$createdAt"]}</p>
        </article>
      </main>
    </>
  );
}
