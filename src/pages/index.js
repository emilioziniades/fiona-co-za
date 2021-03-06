import Script from "next/script";
import Layout from "../components/layout";
import Banner from "../components/banner";

import { getMarkdownData } from "../lib/markdown";

const actionButtons = [
  { name: "my cv", path: "/cv" },
  { name: "design portfolio", path: "/projects" },
];

export async function getStaticProps() {
  const mdData = await getMarkdownData("index", "pages");
  const data = { ...mdData };
  return {
    props: { data },
  };
}
export default function HomePage({ data }) {
  return (
    <Layout background="bg-stone-700">
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>
      <Banner
        data={data}
        buttons={actionButtons}
        background="bg-gray-200"
        textColour="text-gray-800"
      />
    </Layout>
  );
}
