"use server";
import { supabaseServer } from "./server";

const supabase = supabaseServer();

const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export async function actionBoard({ action, boardIn, name, columns }) {
  const user = await getUser();

  if (user) {
    //delete
    if (action && action === "delete") {
      console.log({ action, boardIn });
      // await supabase.from("board").delete().eq("board_id", boardIn?.boardId);
    } else {
      if (boardIn && boardIn?.boardId) {
        // upsert
        if (boardIn.boardName.trim() !== name.trim()) {
          console.log({ newName: name.trim() });
          // await supabase
          //   .from("board")
          //   .upsert([{ board_id: boardIn?.boardId, board_name: name }]);
        }
        if (columns) {
          let toUpsertArray = [];
          let toInsertArray = [];
          let newColumnIds = [];
          columns.forEach((col) => {
            if (
              col?.title &&
              col?.columnName &&
              col?.columnName.trim() !== col?.title.trim()
            ) {
              toUpsertArray.push({
                column_id: col?.columnId,
                colum_name: col?.title.trim(),
              });
            }

            if (col?.title.trim() && !col?.columnId) {
              toInsertArray.push({
                board_id: boardIn?.boardId,
                column_name: col?.title.trim(),
              });
            }
            newColumnIds.push(col?.columnId);
          });
          if (toUpsertArray) {
            console.log({ upsert: toUpsertArray });
            //   await supabase.from("board_column").upsert(toUpsertArray);
          }
          if (toInsertArray) {
            console.log({ insert: toInsertArray });
            //   await supabase.from("board_column").insert(toInsertArray);
          }
          // check if there's something to delete
          const oldColumnIds = boardIn?.columns.map((col) => col.columnId);
          const columnIdsToDelete = oldColumnIds.filter(
            (old) => !newColumnIds.includes(old)
          );
          if (columnIdsToDelete) {
            //   await supabase
            //     .from("board_column")
            //     .delete()
            //     .in("board_id", columnIdsToDelete);
            console.log({ toDelete: columnIdsToDelete });
          }
        }
      } else {
        //insert
        const { data, error } = await supabase
          .from("board")
          .insert({ board_name: name })
          .select();
        if (columns && !error) {
          const colsToInsertArray = columns.map((col) => ({
            board_id: data?.board_id,
            column_name: col.columName,
          }));
          if (colsToInsertArray) {
            console.log({ colsToInsertArray });
            //   await supabase.from("board_column").insert(colsToInsertArray);
          }
        }
      }
    }
  }
}
