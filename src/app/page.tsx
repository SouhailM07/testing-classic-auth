//
import Link from "next/link";
export default function Home() {
  let links: string[] = ["login", "signIn"];
  return (
    <main className="flex min-h-screen items-center justify-center">
      <article className=" space-y-[3rem]">
        <h1 className="text-[2rem] font-bold">Welcome to the shadows</h1>
        <section className="text-center space-x-[4rem] text-white">
          {links.map((e, i) => {
            return (
              <Link
                href={e}
                key={i}
                className="bg-slate-900 p-3 inline-block rounded-sm hover:bg-slate-700 duration-300 transition-all"
              >
                {e}
              </Link>
            );
          })}
        </section>
      </article>
    </main>
  );
}
