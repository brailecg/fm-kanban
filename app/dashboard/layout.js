// "use client";
import React from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { promises as fs } from "fs";

const DashboardLayout = async ({ children }) => {
  // const toggleDarkClassToDashboard = () => {
  //   document.querySelector(".dashboard").classList.toggle("dark");
  // };
  const file = await fs.readFile(process.cwd() + "/app/sample.json", "utf8");
  const data = JSON.parse(file);
  return (
    <div className="flex dashboard ">
      <Sidebar data={data} />
      <div className="grow">
        <Nav />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
