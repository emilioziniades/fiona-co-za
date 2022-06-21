import Layout from "../components/layout";
import Banner from "../components/banner";
import { getMarkdownData } from "../lib/markdown";

const proseStyle = [
  "prose-lg",
  "prose-h1:underline",
  "prose-h1:text-4xl",
  "prose-h2:m-1",
  "prose-h2:text-2xl",
  "prose-h2:font-semibold",
  "prose-li:list-disc",
].join(" ");

export async function getStaticProps() {
  const infoData = await getMarkdownData("index", "pages");
  const mdData = await getMarkdownData("cv", "pages");
  const data = { ...infoData, ...mdData };
  return {
    props: { data },
  };
}
export default function CVPage({ data }) {
  return (
    <Layout backgroundColour="bg-gray-200">
      <Banner
        data={data}
        background="bg-stone-800"
        textColour="text-gray-200"
        contactFirst
        noBlurb
      />
      <div className="pt-10" />
      <article className={proseStyle}>
        <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
      </article>
      <div className="pt-10 " />
      <div className="flex md:flex-row flex-col text-gray-800">
        <SkillsList
          skills={data.personal_skills}
          title="Personal Skills"
          bg="bg-amber-300"
        />
        <SkillsList
          skills={data.technical_skills}
          title="Technical Skills"
          bg="bg-emerald-300"
        />
      </div>
    </Layout>
  );
}

function SkillsList({ skills, title, bg }) {
  return (
    <div className={`basis-1/2 md:p-5 p-2 m-1 ${bg}`}>
      <h2 className="text-2xl py-4 uppercase">{title}</h2>
      <ul className="list-disc list-inside">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
