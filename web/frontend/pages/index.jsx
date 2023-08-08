import {
  DataTable,
  Page,
  Text
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { useAppQuery } from "../hooks";
import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  const { t } = useTranslation();

  const {
    data,
    loading
  } = useAppQuery({
    url: "/api/get-data",
  })

  if (loading) return <div>Loading...</div>;

  console.log(data);
  const outputData = data?.map(item => [item.name, item.email, item.description])


  console.log(outputData)

  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Text variant="heading3xl" as="h1">
        Submissions
      </Text>
      {
        data &&
        <DataTable
          columnContentTypes={[
            'text',
            'text',
            'text'
          ]}
          headings={[
            'name',
            'email',
            'description',
          ]}
          rows={outputData}
        />
      }
    </Page>
  );
}
