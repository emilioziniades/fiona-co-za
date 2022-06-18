import Link from "next/link";
export default function Welcome({ path }) {
  return (
    <div>
      <main className="float text-center m-8 p-8 mw-sm">
        <h1 className="text-6xl">
          Welcome to{" "}
          <Link href={path}>
            <a className="text-blue-600 hover:underline underline-offset-2">
              {"fiona.co.za" + path}
            </a>
          </Link>
          {"!"}
        </h1>
      </main>
    </div>
  );
}
