import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getPlaiceholder } from "plaiceholder";

const contentDirectory = path.join(process.cwd(), "content");
const projectsDirectory = path.join(contentDirectory, "projects");

type MarkdownData = object;
interface ProjectData {
  id: string;
  order: number;
  image: string;
  category: string;
}
type IdProp = {
  params: {
    id: string;
  };
};

export async function getMarkdownData(
  id: string,
  filePath: string
): Promise<MarkdownData> {
  // read file contents
  const fullPath = path.join(contentDirectory, filePath, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // process frontmatter
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const data = { id, contentHtml, ...matterResult.data };

  if (!("image" in matterResult.data)) {
    return data;
  }

  // get base64 encoding of image, if image field in frontmatter
  const imagePlaceholder = await getPlaiceholder(matterResult.data.image).then(
    ({ base64 }) => base64
  );
  return { ...data, imagePlaceholder };
}

export function getAllProjectsIds(): IdProp[] {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName: string): IdProp => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getSortedProjectsData(): Promise<Array<ProjectData>> {
  // Get file names under /projects
  const projectIds = getAllProjectsIds();

  // fetch data for all projects
  const allProjectsData = await Promise.all(
    projectIds.map(
      async (props: IdProp): Promise<ProjectData> =>
        await getMarkdownData(props.params.id, "projects")
    )
  );

  // Sort posts by category, then order key (ascending)
  return allProjectsData.sort(
    (proj1: ProjectData, proj2: ProjectData): number => {
      const categoryComparison = proj1.category.localeCompare(proj2.category);
      if (categoryComparison != 0) {
        return categoryComparison;
      } else {
        return proj1.order - proj2.order;
      }
    }
  );
}

export async function getCategorizedProjectsData() {
  const sortedProjectsData = await getSortedProjectsData();
  /* 
  categorize data into object:
    {
      catgory: [{},{}, ... ],
      catgory: [{},{}, ... ]
    } 
  */
  let categorized = {};
  for (let project of sortedProjectsData) {
    if (project.category in categorized) {
      categorized[project.category].push(project);
    } else {
      categorized[project.category] = [project];
    }
  }
  return categorized;
}
