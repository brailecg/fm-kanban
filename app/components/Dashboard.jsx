"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { supabaseBrowser } from "../utils/supabase/browser";
import { DndContext } from "@dnd-kit/core";
import Sidebar from "../components/Sidebar";
import Nav from "./Nav";
import ShowSidebarIcon from "./ShowSidebarIcon";
import ColumnArea from "./ColumnArea";
import ColumnName from "./ColumnName";
import FormBoard from "./FormBoard";
import { actionTaskMove, getAllData } from "../utils/supabase/db_actions";

const Dashboard = ({ returnData, returnTheme }) => {
  const boardList = returnData?.boardObjectList;
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isThemeToggled, setIsThemeToggled] = useState(false);
  const [selected, setSelected] = useState(boardList[0]?.boardId);
  const [isEditBoardOpen, setIsEditBoardOpen] = useState(false);

  const [isDropped, setIsDropped] = useState(false);
  const [boards, setBoards] = useState(boardList);
  const [data, setData] = useState(returnData);

  useEffect(() => {
    if (returnTheme[0]?.theme) {
      setIsThemeToggled(true);
      document.querySelector("body").classList.add("dark");
    }

    const channel = supabaseBrowser()
      .channel("schema-public-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        async (payload) => {
          const newData = await getAllData();
          const newBoardList = newData?.boardObjectList;

          setData(newData);
          setBoards(newBoardList);
          if (payload.eventType === "DELETE" && payload.table === "board") {
            setSelected(newBoardList[0]?.boardId);
          }
          // return setBoards([...boards, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabaseBrowser().removeChannel(channel);
    };
  }, [boards, data, returnTheme[0]?.theme]);

  const moveCard = async (
    boards,
    selectedBoardId,
    fromColumnId,
    toColumnId,
    cardId,
    toIndex
  ) => {
    let cardToMove = null;

    // Find the board
    const board = boards.find((board) => board?.boardId === selectedBoardId);
    if (!board) {
      return;
    }

    // Find and remove the card from the original column
    const fromColumn = board.columns.find(
      (column) => column?.columnId === fromColumnId
    );
    if (fromColumn) {
      const cardIndex = fromColumn.cards.findIndex(
        (card) => card?.cardId === cardId
      );
      if (cardIndex > -1) {
        cardToMove = fromColumn.cards.splice(cardIndex, 1)[0];
      } else {
        return;
      }
    } else {
      return;
    }

    // Find and insert the card into the target column at the specified index
    const toColumn = board.columns.find(
      (column) => column.columnId === toColumnId
    );
    if (toColumn && cardToMove) {
      // Ensure the index is within the bounds of the target array
      const validIndex = Math.min(toColumn.cards.length, toIndex);
      toColumn.cards.splice(validIndex, 0, cardToMove);
      const moveCard = await actionTaskMove(cardToMove, toColumn);
    }
  };

  const handleDragend = (event) => {
    const { over, active } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    if (over === null || over.data === null) return;
    const overData = over.data.current;
    const activeData = active.data.current;

    const columnToId = overData.colId;
    const columnToIndex = overData.idx;
    const columnFromId = activeData.colId;
    const cardId = active.id;

    moveCard(boards, selected, columnFromId, columnToId, cardId, columnToIndex);
    setIsDropped((prev) => !prev);
  };

  const selectedBoard = boards.find((board) => board.boardId === selected);
  const columns = selectedBoard?.columns;

  return (
    <div className="flex flex-col h-screen dashboard ">
      <Nav
        data={data}
        isThemeToggled={isThemeToggled}
        setIsThemeToggled={setIsThemeToggled}
        selected={selected}
        setSelected={setSelected}
        columns={columns}
      />
      <div className="flex flex-grow bg-main-light-lines dark:bg-main-very-dark-grey ">
        <div className="hidden sm:flex">
          <Sidebar
            data={data}
            setIsSidebarVisible={setIsSidebarVisible}
            isSidebarVisible={isSidebarVisible}
            isThemeToggled={isThemeToggled}
            setIsThemeToggled={setIsThemeToggled}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <DndContext onDragEnd={handleDragend} id="dnd-dashboard-id">
          <main className="overflow-y-auto overflow-x-auto flex-grow p-4 sm:p-6 min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-96px)]">
            {boards.length === 0 && (
              <div className="flex h-full w-full space-y-8 flex-col justify-center items-center">
                <p className="text-main-medium-grey text-[18px] font-semibold text-center">
                  No project listed. Add a new board.
                </p>
                <button
                  onClick={() => setIsEditBoardOpen(true)}
                  className={`bg-main-purple hover:bg-main-purple-hover h-12 px-6 space-x-1 rounded-full flex justify-center items-center`}>
                  <Image
                    src="/assets/icon-add-task-mobile.svg"
                    alt="add task"
                    width={12}
                    height={12}
                  />
                  <p className=" text-white text-[15px] font-semibold">
                    Add New Board
                  </p>
                </button>
              </div>
            )}
            {boards.length > 0 &&
              boards?.map((board) => {
                if (selected === board.boardId) {
                  return (
                    <React.Fragment key={board.boardId}>
                      {board?.columns.length == 0 && (
                        <div className="flex h-full w-full space-y-8 flex-col justify-center items-center">
                          <p className="text-main-medium-grey text-[18px] font-semibold text-center">
                            This board is empty. Create a new column to get
                            started.
                          </p>
                          <button
                            onClick={() => setIsEditBoardOpen(true)}
                            className={`bg-main-purple hover:bg-main-purple-hover h-12 px-6 space-x-1 rounded-full flex justify-center items-center`}>
                            <Image
                              src="/assets/icon-add-task-mobile.svg"
                              alt="add task"
                              width={12}
                              height={12}
                            />
                            <p className=" text-white text-[15px] font-semibold">
                              Add New Column
                            </p>
                          </button>
                        </div>
                      )}
                      <div className="flex space-x-3">
                        {board?.columns.length > 0 &&
                          board?.columns?.map((column) => {
                            return (
                              <div key={column.columnId}>
                                <ColumnName
                                  name={column.columnName}
                                  color={
                                    column.columnColor
                                      ? column.columnColor
                                      : "#8471F2"
                                  }
                                  count={column.cards.length}
                                />
                                <ColumnArea column={column} columns={columns} />
                              </div>
                            );
                          })}
                      </div>
                    </React.Fragment>
                  );
                }
              })}
            <ShowSidebarIcon
              isSidebarVisible={isSidebarVisible}
              setIsSidebarVisible={setIsSidebarVisible}
            />
          </main>
        </DndContext>
      </div>
      {isEditBoardOpen && (
        <FormBoard
          label={selectedBoard ? "Edit Board" : "Create Board"}
          isViewOpen={isEditBoardOpen}
          setIsViewOpen={setIsEditBoardOpen}
          allColumns={columns}
          boardIn={selectedBoard}
        />
      )}
    </div>
  );
};

export default Dashboard;
