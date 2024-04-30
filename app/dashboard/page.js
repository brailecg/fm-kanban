import Dashboard from "../components/Dashboard";
import { promises as fs } from "fs";

const DashboardPage = async () => {
  const file = await fs.readFile(process.cwd() + "/app/sample.json", "utf8");
  const data = JSON.parse(file);
  return <Dashboard data={data} />;
};

export default DashboardPage;
