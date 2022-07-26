import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainFinancePage() {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (tabIndex === 0) {
      navigate("my-finance"); 
    } else if (tabIndex === 1) {
      navigate("input");
    } else if (tabIndex === 2) {
      navigate("sales");
    } else if (tabIndex === 3) {
      navigate("recommendation");
    }
  }, [tabIndex]);

  return (
    <>
      <Tabs align="center" onChange={(index) => setTabIndex(index)}>
        <TabList>
          <Tab tabIndex="tracking">Finance Tracking</Tab>
          <Tab tabIndex="input">Input Finance Data</Tab>
          <Tab tabIndex="sales">Input Sales Data</Tab>
          <Tab tabIndex="recommendation">Recommendation</Tab>
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
