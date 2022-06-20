import path from "path";
import Image from "next/image";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

import { getMarkdownData, getAllProjectsIds } from "../../utils/markdown";

export async function getStaticProps({ params }) {
  const projectPath = path.join("projects", params.id);
  const projectData = await getMarkdownData(projectPath);
  return {
    props: {
      projectData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllProjectsIds();
  return {
    paths,
    fallback: false,
  };
}

const imgSize = 800;

export default function Project({ projectData }) {
  return (
    <div className="bg-[#d2cac6] h-screen w-screen">
      <div className="flex max-w-6xl mx-auto">
        <div className="basis-2/3 p-10">
          <Image
            src={projectData.image}
            height={imgSize}
            width={imgSize}
            alt={projectData.title + " image"}
          />
        </div>
        <div className="basis-1/3 p-10">
          <div className="flex justify-end">
            <Link href="/projects">
              <a className="text-6xl">
                <IoCloseOutline />
              </a>
            </Link>
          </div>
          <div className="p-6" />
          <h1 className="font-bold text-4xl">{projectData.title}</h1>
          <div className="p-6" />
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: projectData.contentHtml }}
          />
          <div className="p-6" />
          <Link href={projectData.link}>
            <a className="underline">
              {projectData.link_name ? projectData.link_name : projectData.link}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
