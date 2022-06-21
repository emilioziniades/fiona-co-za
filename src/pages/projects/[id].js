import Image from "next/image";
import Link from "next/link";
import {
  IoCloseOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

import {
  getMarkdownData,
  getAllProjectsIds,
  getSortedProjectsData,
} from "../../lib/markdown";

export async function getStaticProps({ params }) {
  const projectData = await getMarkdownData(params.id, "projects");
  const sortedData = await getSortedProjectsData();
  const projectIndex = sortedData.findIndex((element) => {
    return element["id"] == projectData["id"];
  });
  const prevProjectIndex = projectIndex > 0 ? projectIndex - 1 : null;
  const nextProjectIndex =
    projectIndex < sortedData.length - 1 ? projectIndex + 1 : null;
  console.log(prevProjectIndex, projectIndex, nextProjectIndex);
  return {
    props: {
      projectData,
      prevProjectId:
        prevProjectIndex != null ? sortedData[prevProjectIndex].id : null,
      nextProjectId:
        nextProjectIndex != null ? sortedData[nextProjectIndex].id : null,
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

export default function Project({ projectData, prevProjectId, nextProjectId }) {
  return (
    <div className="bg-[#d2cac6] min-h-scren h-screen w-screen">
      <div className="flex justify-end">
        <Link href="/projects">
          <a className="text-6xl">
            <IoCloseOutline />
          </a>
        </Link>
      </div>
      <div className="flex md:flex-row flex-col max-w-6xl mx-auto">
        <div
          className={`text-6xl self-center ${
            prevProjectId == null ? "pointer-events-none opacity-0" : ""
          }`}
        >
          <Link href={`/projects/${prevProjectId}`}>
            <a>
              <IoChevronBackOutline />
            </a>
          </Link>
        </div>
        <ProjectImage projectData={projectData} />
        <ProjectCard projectData={projectData} />
        <div
          className={`text-6xl self-center ${
            nextProjectId == null ? "pointer-events-none opacity-0" : ""
          }`}
        >
          <Link href={`/projects/${nextProjectId}`}>
            <a>
              <IoChevronForwardOutline />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ projectData }) {
  return (
    <div className="basis-1/3 md:p-10 p-5">
      <div className="md:p-6 p-1" />
      <h1 className="font-bold text-4xl">{projectData.title}</h1>
      <div className="md:p-6 p-1" />
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: projectData.contentHtml }}
      />
      <div className="md:p-6 p-1" />
      <Link href={projectData.link}>
        <a className="underline">
          {projectData.link_name ? projectData.link_name : projectData.link}
        </a>
      </Link>
    </div>
  );
}

function ProjectImage({ projectData }) {
  return (
    <div className="basis-2/3 md:p-10 p-5">
      <Image
        src={projectData.image}
        height={imgSize}
        width={imgSize}
        alt={projectData.title + " image"}
        placeholder="blur"
        blurDataURL={projectData.imagePlaceholder}
        priority
      />
    </div>
  );
}
