import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import BusinessSummaryPage from "./BusinessSummaryPage";
import MyRecommendations from "./MyRecommendations";
import ProductRecommendationsPage from "./ProductRecommendationsPage";
import InputProductSales from "./InputProductSales";

export default function MainRecommendationPage() {
  return (
    <>
      <Tabs align="center" isLazy>
        <TabList>
          <Tab>Recommendation</Tab>
          <Tab>Input Data</Tab>
          <Tab>Summary</Tab>
          <Tab>Product Recommendation</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MyRecommendations />
          </TabPanel>
          <TabPanel>
            <InputProductSales />
          </TabPanel>
          <TabPanel>
            <BusinessSummaryPage />
          </TabPanel>
          <TabPanel>
            <ProductRecommendationsPage />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
