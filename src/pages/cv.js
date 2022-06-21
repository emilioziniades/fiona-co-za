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
    </Layout>
  );
}
