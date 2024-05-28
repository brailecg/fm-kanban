"use server";
import { supabaseServer } from "../utils/supabase/server";
import Dashboard from "../components/Dashboard";

import { redirect } from "next/navigation";
import { getAllData } from "../utils/supabase/db_actions";
const DashboardPage = async () => {
  const supabase = await supabaseServer();
  const { error, data: user } = await supabase.auth.getUser();
  if (!user?.user && !error) {
    redirect("/auth");
  }

  const returnData = await getAllData();

  return <Dashboard returnData={returnData} />;
};

export default DashboardPage;
