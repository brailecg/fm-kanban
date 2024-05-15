import { supabaseServer } from "../utils/supabase/server";
import Dashboard from "../components/Dashboard";

import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const supabase = supabaseServer();
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) {
    redirect("/auth");
  }

  const { data, error } = await supabase
    .from("board")
    .select(
      `boardId:board_id, boardName:board_name, boardDescription:board_description,
      columns:board_column (columnId:column_id, columnName:column_name, columnColor:column_color,
      cards:card(cardId:card_id, cardName:card_name, cardDescription:card_description, 
      subtasks:subtask(id:subtask_id, subTaskDescription:subtask_description, status:subtask_status)))`
    )
    .eq("profile_id", user?.user?.id);
  const returnData = { boardObjectList: data };

  return <Dashboard data={returnData} />;
};

export default DashboardPage;
