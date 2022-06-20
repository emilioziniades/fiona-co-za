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

export default function ProjectsPage({ allProjectsData }) {
  return (
    <Layout>
      <div className="flex ">
        {allProjectsData.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <a>
              <div className="basis-1/3 m-1 relative ">
                <Image
                  src={project.image}
                  height={300}
                  width={300}
                  alt={project.title}
                />
                <div className="transition-all hover:bg-stone-600 h-full w-full opacity-50 absolute top-0 left-0" />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
