import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const siteTitle = "Fiona Peake";
const siteDescription = "Designer, marketer, brand enabler";
const navItems = [
  { name: "home", path: "/" },
  { name: "design", path: "/projects" },
  { name: "cv", path: "/cv" },
  { name: "contact", path: "/contact" },
];
const linkClass = "ml-2 p-1 hover:bg-zinc-400 hover:text-white";
const activeLinkClass = linkClass + " bg-zinc-500 text-white";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <div className="bg-stone-800">
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteDescription} />
      </Head>
      <div className="min-w-4xl max-w-4xl mx-auto">
        <header className="py-8">
          <Link href="/">
            <a>
              <h1 className="uppercase text-6xl font-light text-right text-white tracking-wide">
                {siteTitle}
              </h1>
            </a>
          </Link>
          <ul className="flex justify-end text-stone-400 mt-5 text-xl">
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
      <div className="bg-gray-200 h-screen">{children}</div>
    </div>
  );
}
