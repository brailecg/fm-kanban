import { useDroppable } from "@dnd-kit/core";

const SubtaskDropArea = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: Math.floor(Math.random() * 999),
  });
  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver
          ? "border border-main-purple flex min-h-[88px] p-4 mb-4 transition-all ease-in-out"
          : "  border"
      }  min-w-[280px]  bg-white dark:bg-main-dark-grey rounded-md 
               `}>
      dropArea
    </div>
  );
};

export default SubtaskDropArea;
