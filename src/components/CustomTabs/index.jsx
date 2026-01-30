import React from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

function CustomTabs({
  tabList = [],
  activeTab = {},
  setActiveTab,
  bodyClassName = "",
  wrapperClassName = "",
}) {
  return (
    <Tabs
      value={activeTab?.value}
      className={`h-full flex flex-col [&>nav]:w-full overflow-visible ${wrapperClassName}`}
    >
      <TabsHeader
        className="p-0 w-full h-[3em] rounded-none bg-opacity-100 bg-white px-5"
        indicatorProps={{
          className:
            "bg-transparent border-b-[0.2em] border-brand-primary rounded-none shadow-none ml-2 ",
        }}
      >
        {tabList.map((tab) => (
          <Tab
            key={tab?.value}
            value={tab?.value}
            onClick={() => setActiveTab(tab)}
            className={`w-[10em] ${
              activeTab?.value === tab?.value ? "text-black font-semibold" : ""
            }`}
          >
            {tab?.label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className={`h-full overflow-y-auto ${bodyClassName}`}>
        {tabList.map((tab) => (
          <TabPanel
            key={tab.value}
            value={tab.value}
            className={`p-0 h-full ${
              activeTab?.value === tab?.value ? "block" : "!hidden"
            }`}
          >
            {tab.content}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

export default CustomTabs;
