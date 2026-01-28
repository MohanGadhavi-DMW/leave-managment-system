import React, { useState } from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

function CustomTabs({ tabList = [], activeTab, setActiveTab }) {
  return (
    <Tabs
      value={activeTab}
      className="h-full flex flex-col [&>nav]:w-full overflow-visible"
    >
      <TabsHeader
        className="p-0 w-full h-[3em] rounded-none bg-opacity-100 bg-white px-5"
        indicatorProps={{
          className:
            "bg-transparent border-b-[0.2em] border-brand-primary rounded-none shadow-none ml-2 ",
        }}
      >
        {tabList.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`w-[10em] ${
              activeTab === value ? "text-black font-semibold" : ""
            }`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="h-full overflow-y-auto">
        {tabList.map(({ value, content }) => (
          <TabPanel
            key={value}
            value={value}
            className={`p-0 h-full ${
              activeTab === value ? "block" : "!hidden"
            }`}
          >
            {content}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

export default CustomTabs;
