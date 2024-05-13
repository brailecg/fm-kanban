import { supabaseServer } from "../utils/supabase/server";
import Dashboard from "../components/Dashboard";
import { promises as fs } from "fs";

const DashboardPage = async () => {
  // const file = await fs.readFile(process.cwd() + "/app/sample.json", "utf8");
  // const data = await JSON.parse(file);
  const supabase = supabaseServer();

  const { data, error } = await supabase.from("board").select(
    `boardId:board_id, boardName:board_name, boardDescription:board_description, 
      columns:board_column (columnId:column_id, columnName:column_name, columnColor:column_color, 
      cards:card(cardId:card_id, cardName:card_name, cardDescription:card_description, subtasks:subtask(id:subtask_id, subTaskDescription:subtask_description, status:subtask_status)))`
  );
  const returnData = { boardObjectList: data };
  // return (
  //   <>
  //     <pre>{JSON.stringify(returnData, null, 2)}</pre>
  //     <pre>{JSON.stringify(error, null, 2)}</pre>
  //   </>
  // );
  return <Dashboard data={returnData} />;
};

export default DashboardPage;
