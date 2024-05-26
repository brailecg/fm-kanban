"use server";
import { supabaseServer } from "./server";

const getCurrentUser = async () => {
  const supabase = await supabaseServer();
  const { data: user } = await supabase.auth.getUser();
  return user;
};

export async function getAllData() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("board")
    .select(
      `boardId:board_id, boardName:board_name, boardDescription:board_description,
    columns:board_column (columnId:column_id, columnName:column_name, columnColor:column_color, columnOrder:column_order,
    cards:card(cardId:card_id, cardName:card_name, cardDescription:card_description, columnId:column_id,
    subtasks:subtask(id:subtask_id, subTaskDescription:subtask_description, status:subtask_status)))`
    )
    .order("column_order", {
      referencedTable: "board_column",
      ascending: true,
    }); // no need to filter by user since there is an RLS in the database that covers it

  if (data) return { boardObjectList: data };
}

export async function actionBoard({ action, boardIn, name, columns }) {
  const supabase = await supabaseServer();
  const user = await getCurrentUser();
  const oldColumnIds = boardIn?.columns?.map((col) => col.columnId);

  if (!user)
    return { error: true, errorMessage: "User not Found. Session Expired" };

  //delete
  if (action && action === "delete") {
    await supabase.from("board").delete().eq("board_id", boardIn?.boardId);
  } else {
    if (boardIn && boardIn.boardId) {
      // upsert
      if (boardIn.boardName.trim() !== name.trim()) {
        await supabase
          .from("board")
          .update({ board_name: name.trim() })
          .eq("board_id", boardIn.boardId);
      }
      if (columns.length > 0 || oldColumnIds.length > 0) {
        let toUpsertArray = [];
        let toInsertArray = [];
        let newColumnIds = [];
        columns.forEach((col, index) => {
          if (
            (col.columnId &&
              col.title &&
              col.columnName &&
              col.columnName.trim() !== col.title.trim()) ||
            col.columnOrder !== index
          ) {
            toUpsertArray.push({
              board_id: boardIn?.boardId,
              column_id: col?.columnId,
              column_name: col?.title.trim(),
              column_order: index,
            });
          }

          if (col?.title.trim() && !col?.columnId) {
            toInsertArray.push({
              board_id: boardIn?.boardId,
              column_name: col?.title.trim(),
              column_order: index,
            });
          }
          newColumnIds.push(col?.columnId);
        });
        if (toUpsertArray.length > 0) {
          await supabase.from("board_column").upsert(toUpsertArray);
        }
        if (toInsertArray.length > 0) {
          await supabase.from("board_column").insert(toInsertArray);
        }
        // check if there's something to delete

        const columnIdsToDelete = oldColumnIds.filter(
          (old) => !newColumnIds.includes(old)
        );
        if (columnIdsToDelete.length > 0) {
          await supabase
            .from("board_column")
            .delete()
            .in("column_id", columnIdsToDelete);
        }
      }
    } else {
      //insert
      const { data, error } = await supabase
        .from("board")
        .insert({ board_name: name, profile_id: user?.user.id })
        .select();
      if (columns.length > 0 && !error) {
        const colsToInsertArray = columns.map((col, index) => ({
          board_id: data[0]?.board_id,
          column_name: col.title.trim(),
          column_order: index,
        }));
        if (colsToInsertArray.length > 0) {
          const { data, error } = await supabase
            .from("board_column")
            .insert(colsToInsertArray)
            .select();
        }
      }
    }
  }
}

export async function actionTaskMove(cardToMove, toColumn) {
  const supabase = await supabaseServer();
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

export async function actionSubTaskStatusChange(taskToUpdate) {
  const supabase = await supabaseServer();
  const user = await getCurrentUser();
  if (!user)
    return { error: true, errorMessage: "User not Found. Session Expired" };
  if (!taskToUpdate) return { error: true, errorMessage: "No Task to Update" };

  const { data, error } = await supabase
    .from("subtask")
    .update({ subtask_status: taskToUpdate.status })
    .eq("subtask_id", taskToUpdate.id)
    .select();

  if (!error) return data;
}

export async function actionTask({ action, item, data }) {
  const supabase = await supabaseServer();
  const user = await getCurrentUser();
  if (!user)
    return { error: true, errorMessage: "User not Found. Session Expired" };

  if (item !== undefined) {
    //delete
    if (action && action === "delete") {
      await supabase.from("card").delete().eq("card_id", item?.cardId);
    } else {
      const itemUpdateObject = {};
      if (item?.cardName.trim() !== data?.title.trim()) {
        itemUpdateObject.card_name = data?.title.trim();
      }
      if (item?.cardDescription.trim() !== data?.description.trim()) {
        itemUpdateObject.card_description = data?.description.trim();
      }
      if (item?.columnId !== data?.status?.columnId) {
        itemUpdateObject.column_id = data?.status?.columnId;
      }

      if (Object.keys(itemUpdateObject).length > 0) {
        const { data, error } = await supabase
          .from("card")
          .update(itemUpdateObject)
          .eq("card_id", item?.cardId)
          .select();
      }

      if (item?.subtasks.length > 0 || data?.subtasks.length > 0) {
        let toUpsertArray = [];
        let toInsertArray = [];
        let newSubtasksIds = [];

        data?.subtasks?.forEach((sub) => {
          // upsert/update
          if (
            sub.id &&
            sub?.subTaskDescription &&
            sub.subTaskDescription.trim() !== sub.title.trim()
          ) {
            toUpsertArray.push({
              card_id: item?.cardId,
              subtask_id: sub?.id,
              subtask_description: sub?.title.trim(),
            });
          }
          // insert
          if (sub?.title.trim() && !sub.id) {
            toInsertArray.push({
              card_id: item?.cardId,
              subtask_description: sub?.title.trim(),
            });
          }

          // collect id for delete checking later
          newSubtasksIds.push(sub.id);
        });

        if (toUpsertArray.length > 0) {
          const { error } = await supabase
            .from("subtask")
            .upsert(toUpsertArray);
        }
        if (toInsertArray.length > 0) {
          await supabase.from("subtask").insert(toInsertArray);
        }
        // check if there's something to delete
        const oldSubtaskIdList = item?.subtasks.map((sub) => sub.id);
        const subtaskIdsToDelete = oldSubtaskIdList.filter(
          (old) => !newSubtasksIds.includes(old)
        );
        if (subtaskIdsToDelete.length > 0) {
          await supabase
            .from("subtask")
            .delete()
            .in("subtask_id", subtaskIdsToDelete);
        }
      }
    }
  } else {
    //insert only

    const { data: card, error } = await supabase
      .from("card")
      .insert([
        {
          card_name: data?.title,
          card_description: data?.description,
          column_id: data?.status?.columnId,
        },
      ])
      .select();

    if (data?.subtasks.length > 0 && !error) {
      const subToInsertArray = data?.subtasks.map((sub) => ({
        card_id: card[0]?.card_id,
        subtask_description: sub.title.trim(),
      }));
      if (subToInsertArray.length > 0) {
        const { data, error } = await supabase
          .from("subtask")
          .insert(subToInsertArray)
          .select();
      }
    }
  }
}
