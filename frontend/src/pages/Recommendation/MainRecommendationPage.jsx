import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MainRecommendationPage() {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (tabIndex === 0) {
      navigate("my-recommendations");
    } else if (tabIndex === 1) {
      navigate("sales");
    } else if (tabIndex === 2) {
      navigate("summary");
    } else if (tabIndex === 3) {
      navigate("product-recommendations");
    }
  }, [tabIndex, navigate]);

  return (
    <>
      <Tabs align="center" isManual onChange={(index) => setTabIndex(index)}>
        <TabList>
          <Tab >Recommendation</Tab>
          <Tab >Input Data</Tab>
          <Tab >Summary</Tab>
          <Tab >Product Recommendation</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Outlet />
          </TabPanel>
          <TabPanel>
            <Outlet />
          </TabPanel>
          <TabPanel>
            <Outlet />
          </TabPanel>
          <TabPanel>
            <Outlet />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
