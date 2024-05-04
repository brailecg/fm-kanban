"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DndContext } from "@dnd-kit/core";
import Sidebar from "../components/Sidebar";
import Nav from "./Nav";
import ShowSidebarIcon from "./ShowSidebarIcon";
import ColumnArea from "./ColumnArea";
import ColumnName from "./ColumnName";
const Dashboard = ({ data }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isThemeToggled, setIsThemeToggled] = useState(false);
  const [selected, setSelected] = useState(null);

  const [isDropped, setIsDropped] = useState(false);
  const boardList = data?.boardObjectList;
  useEffect(() => {
    if (boardList.length > 0 && selected === null) {
      setSelected(boardList[0].boardId);
    }
  }, [boardList, selected]);

  const moveCard = (
    boardList,
    selectedBoardId,
    fromColumnId,
    toColumnId,
    cardId,
    toIndex
  ) => {
    let cardToMove = null;

    // Find the board
    const board = boardList.find((board) => board.boardId === selectedBoardId);
    if (!board) {
      console.log("Board not found.");
      return;
    }

    // Find and remove the card from the original column
    const fromColumn = board.columns.find(
      (column) => column.columnId === fromColumnId
    );
    if (fromColumn) {
      const cardIndex = fromColumn.cards.findIndex(
        (card) => card.cardId === cardId
      );
      if (cardIndex > -1) {
        cardToMove = fromColumn.cards.splice(cardIndex, 1)[0];
      } else {
        console.log("Card not found in the source column.");
        return;
      }
    } else {
      console.log("Source column not found.");
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
      console.log("Card moved successfully.");
    } else if (!toColumn) {
      console.log("Target column not found.");
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

    moveCard(
      boardList,
      selected,
      columnFromId,
      columnToId,
      cardId,
      columnToIndex
    );
    setIsDropped((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen dashboard ">
      <Nav
        data={data}
        isThemeToggled={isThemeToggled}
        setIsThemeToggled={setIsThemeToggled}
        selected={selected}
        setSelected={setSelected}
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
        <DndContext onDragEnd={handleDragend}>
          <main className="overflow-y-auto overflow-x-auto flex-grow p-4 sm:p-6 max-h-[calc(100vh-64px)]">
            {boardList.length > 0 &&
              boardList?.map((board) => {
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
                                  color={column.columnColor}
                                  count={column.cards.length}
                                />
                                <ColumnArea column={column} />
                              </div>
                            );
                          })}
                        <button className="flex items-center justify-center bg-[#E9EFFA] dark:bg-[#2B2C37] rounded-md min-w-[280px] text-2xl font-semibold text-main-medium-grey mt-9 min-h-screen">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="w-6 h-6">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                          New Column
                        </button>
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
    </div>
  );
};

export default Dashboard;
