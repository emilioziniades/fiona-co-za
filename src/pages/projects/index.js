import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/layout";
import { getSortedProjectsData } from "../../utils/markdown";

export async function getStaticProps() {
  const allProjectsData = getSortedProjectsData();
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
          <h1 className="text-white bg-stone-800 text-5xl uppercase p-5 mx-1 my-3">
            {category}
          </h1>
          <div className="grid grid-cols-3 justify-items-center">
            {allProjectsData[category].map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <a>
                  <div className="p-1 relative">
                    <Image
                      src={project.image}
                      height={imgSize}
                      width={imgSize}
                      alt={project.title}
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
