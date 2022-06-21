import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const siteTitle = "Fiona Peake";
const navItems = [
  { name: "home", path: "/" },
  { name: "design", path: "/projects" },
  { name: "cv", path: "/cv" },
  { name: "contact", path: "/contact" },
];
const linkClass =
  "ml-2 p-1 my-1 hover:bg-zinc-400 hover:text-white transition-all text-center";
const activeLinkClass = linkClass + " bg-zinc-500 text-white";

export default function Layout({ children, background, noHeader }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {noHeader ? (
        children
      ) : (
        <>
          <Header />
          <div className={`p-5 min-h-screen ${background}`}>
            <div className="md:pt-10 pt-2" />
            <div className="max-w-4xl mx-auto">{children}</div>
          </div>
        </>
      )}
    </>
  );
}

function Header() {
  const router = useRouter();
  return (
    <div className="bg-neutral-800 transition">
      <div className="max-w-4xl mx-auto">
        <header className="md:py-8 py-4 px-6">
          <Link href="/">
            <a>
              <h1 className="uppercase md:text-6xl text-3xl font-light text-right text-white tracking-wide">
                {siteTitle}
              </h1>
            </a>
          </Link>
          <ul className="flex flex-col md:flex-row justify-end text-stone-400 md:mt-5 md:text-2xl text-lg">
            {navItems.map(({ name, path }) => (
              <li
                key={name}
                className={
                  router.pathname == path ? activeLinkClass : linkClass
                }
              >
                <Link href={path}>
                  <a className="uppercase">{name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </header>
      </div>
    </div>
  );
}
