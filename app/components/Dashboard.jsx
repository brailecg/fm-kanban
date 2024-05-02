"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import Sidebar from "../components/Sidebar";
import Nav from "./Nav";
import ShowSidebarIcon from "./ShowSidebarIcon";
import ColumnArea from "./ColumnArea";
const Dashboard = ({ data }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isThemeToggled, setIsThemeToggled] = useState(false);
  const [selected, setSelected] = useState(null);
  const boardList = data?.boardObjectList;
  useEffect(() => {
    if (boardList.length > 0 && selected === null) {
      setSelected(boardList[0].boardId);
    }
  }, [boardList, selected]);

  return (
    <div className="flex flex-col h-screen dashboard">
      <Nav
        data={data}
        isThemeToggled={isThemeToggled}
        setIsThemeToggled={setIsThemeToggled}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="flex flex-grow">
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
        <main className="overflow-x-auto whitespace-no-wrap bg-main-light-lines dark:bg-main-very-dark-grey grow px-4 sm:px-0 ">
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
                    <div className="flex ">
                      {board?.columns.length > 0 &&
                        board?.columns?.map((column) => {
                          return (
                            <ColumnArea key={column.columnId} column={column} />
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
      </div>
    </div>
  );
};

export default Dashboard;
