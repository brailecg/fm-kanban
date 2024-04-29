import React from "react";

import Nav from "../components/Nav";

import Dashboard from "../components/Dashboard";
import { promises as fs } from "fs";

const DashboardPage = async () => {
  // const toggleDarkClassToPage = () => {
  //   document.querySelector(".Page").classList.toggle("dark");
  // };
  const file = await fs.readFile(process.cwd() + "/app/sample.json", "utf8");
  const data = JSON.parse(file);
  return (
    <div className="flex flex-col h-screen">
      <Nav data={data} />
      <Dashboard data={data} />
    </div>
  );
};

export default DashboardPage;
