import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/layout";
import { getSortedProjectsData } from "../../lib/markdown";

export async function getStaticProps() {
  const allProjectsData = await getSortedProjectsData();
  return {
    props: {
      allProjectsData,
    },
  };
}

const imgSize = 500; // big enough to fill container

export default function ProjectsPage({ allProjectsData }) {
  return (
    <Layout>
      {Object.keys(allProjectsData).map((category) => (
        <div key={category}>
          <h1 className="text-white bg-stone-800 md:text-5xl text-2xl font-bold uppercase md:p-5 p-2 mx-2 my-3">
            {category}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-items-center">
            {allProjectsData[category].map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <a>
                  <div className="p-1 relative">
                    <Image
                      src={project.image}
                      height={imgSize}
                      width={imgSize}
                      alt={project.title}
                      placeholder="blur"
                      blurDataURL={project.imagePlaceholder}
                    />
                    <div className="transition-all hover:bg-stone-600 h-full w-full opacity-50 absolute top-0 left-0" />
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
}
