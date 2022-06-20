import path from "path";
import Image from "next/image";
import Link from "next/link";

import Layout from "../../components/layout";
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

export default function Project({ projectData }) {
  return (
    <Layout>
      <h1>{projectData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
      <Link href={projectData.link}>
        <a>
          {projectData.link_name ? projectData.link_name : projectData.link}
        </a>
      </Link>

      <Image src={projectData.image} height={500} width={500} />

      <Link href="/projects">
        <a>Back to projects page</a>
      </Link>
    </Layout>
  );
}
