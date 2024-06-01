"use server";
import { supabaseServer } from "../utils/supabase/server";
import Dashboard from "../components/Dashboard";

import { redirect } from "next/navigation";
import { getAllData, getTheme } from "../utils/supabase/db_actions";
const DashboardPage = async () => {
  const supabase = await supabaseServer();
  const { error, data: user } = await supabase.auth.getUser();
  redirect("/");
  if (!user?.user || error) {
    redirect("/auth");
  }

  const returnData = await getAllData();
  const returnTheme = await getTheme();

  return <Dashboard returnData={returnData} returnTheme={returnTheme} />;
};

export default DashboardPage;
