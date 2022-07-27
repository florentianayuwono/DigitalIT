import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import InputProductSales from "../Recommendation/InputProductSales";
import FinanceRecommendations from "./FinanceRecommendations";
import FinanceTrackingInput from "./FinanceTrackingInput";
import InputExpenseForm from "./InputExpenseForm";
import MyFinance from "./MyFinance";

export default function MainFinancePage() {
  return (
    <>
      <Tabs align="center" isLazy>
        <TabList>
          <Tab tabIndex="tracking">Finance Tracking</Tab>
          <Tab tabIndex="input">Input Finance Data</Tab>
          <Tab tabIndex="sales">Input Sales Data</Tab>
          <Tab tabIndex="recommendation">Recommendation</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MyFinance />
          </TabPanel>
          <TabPanel>
            <FinanceTrackingInput />
          </TabPanel>
          <TabPanel>
            <InputProductSales />
          </TabPanel>
          <TabPanel>
            <FinanceRecommendations />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
