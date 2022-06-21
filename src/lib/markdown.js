import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getPlaiceholder } from "plaiceholder";

const contentDirectory = path.join(process.cwd(), "content");
const projectsDirectory = path.join(contentDirectory, "projects");

export async function getMarkdownData(id, filePath) {
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

export function getAllProjectsIds() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getSortedProjectsData() {
  // Get file names under /projects
  const projectIds = getAllProjectsIds();

  // fetch data for all projects
  const allProjectsData = await Promise.all(
    projectIds.map(
      async ({ params: { id } }) => await getMarkdownData(id, "projects")
    )
  );

  // Sort posts by specified order (ascending)
  const sortedProjectsData = allProjectsData.sort(
    ({ order: a }, { order: b }) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  const categorizedProjectsData = categorizeProjectData(sortedProjectsData);

  return categorizedProjectsData;
}

function categorizeProjectData(sortedProjectsData) {
  // categorize data into object
  // {
  // catgory: [{},{}, ... ]
  // }
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
