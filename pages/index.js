import Layout from "../components/layout";
import Banner from "../components/banner";

import { getMarkdownData } from "../utils/markdown";

const actionButtons = [
  { name: "my cv", path: "/cv" },
  { name: "design portfolio", path: "/projects" },
];

export async function getStaticProps() {
  const infoData = await getMarkdownData("info");
  const mdData = await getMarkdownData("/pages/index");
  const data = { ...mdData, ...infoData };
  return {
    props: { data },
  };
}
export default function HomePage({ data }) {
  return (
    <Layout background="bg-stone-700">
      <div className="pt-10" />
      <Banner
        data={data}
        buttons={actionButtons}
        background="bg-gray-200"
        textColour="text-gray-800"
      />
    </Layout>
  );
}
