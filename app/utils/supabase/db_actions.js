"use server";
import { supabaseServer } from "./server";

const supabase = supabaseServer();

const getCurrentUser = async () => {
  const { data: user } = await supabase.auth.getUser();
  return user;
};
export async function actionBoard({ action, boardIn, name, columns }) {
  const user = await getCurrentUser();
  const oldColumnIds = boardIn?.columns?.map((col) => col.columnId);
  if (user) {
    //delete
    if (action && action === "delete") {
      console.log({ action, boardIn });
      await supabase.from("board").delete().eq("board_id", boardIn?.boardId);
    } else {
      if (boardIn && boardIn?.boardId) {
        // upsert
        if (boardIn.boardName.trim() !== name.trim()) {
          console.log({ newName: name.trim() });
          await supabase
            .from("board")
            .upsert([{ board_id: boardIn?.boardId, board_name: name }]);
        }
        if (columns.length > 0 || oldColumnIds.length > 0) {
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
                column_name: col?.title.trim(),
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
          if (toUpsertArray.length > 0) {
            console.log({ upsert: toUpsertArray });
            await supabase.from("board_column").upsert(toUpsertArray);
          }
          if (toInsertArray.length > 0) {
            console.log({ insert: toInsertArray });
            await supabase.from("board_column").insert(toInsertArray);
          }
          // check if there's something to delete
          console.log({ newColumnIds });
          const columnIdsToDelete = oldColumnIds.filter(
            (old) => !newColumnIds.includes(old)
          );
          if (columnIdsToDelete.length > 0) {
            await supabase
              .from("board_column")
              .delete()
              .in("column_id", columnIdsToDelete);
            console.log({ toDelete: columnIdsToDelete });
          }
        } else {
        }
      } else {
        //insert
        const { data, error } = await supabase
          .from("board")
          .insert({ board_name: name, profile_id: user?.user.id })
          .select();
        if (columns.length > 0 && !error) {
          const colsToInsertArray = columns.map((col) => ({
            board_id: data[0]?.board_id,
            column_name: col.title.trim(),
          }));
          if (colsToInsertArray.length > 0) {
            console.log({ colsToInsertArray });
            const { data, error } = await supabase
              .from("board_column")
              .insert(colsToInsertArray)
              .select();
            console.log({ data });
          }
        }
      }
    }
  }
}

export async function actionTaskMove(cardToMove, toColumn) {
  const user = await getCurrentUser();
  if (!user)
    return { error: true, errorMessage: "User not Found. Session Expired" };

  if (!cardToMove) return { error: true, errorMessage: "No Task Selected" };

  if (!toColumn)
    return { error: true, errorMessage: "No column to Transfer to" };

  const { data, error } = await supabase
    .from("card")
    .update({ column_id: toColumn?.columnId })
    .eq("card_id", cardToMove?.cardId)
    .select();

  if (!error) return data;
}
