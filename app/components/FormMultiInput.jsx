import React, { useEffect, useState } from "react";

import { Label } from "./ui/Label";
import { Button } from "./ui/Button";
import { useFieldArray } from "react-hook-form";

import SubtaskDraggable from "./SubtaskDraggable";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const FormMultiInput = ({ label, name, register, errors, control, from }) => {
  let { fields, append, remove, replace } = useFieldArray({
    control,
    name,
  });

  const [activeId, setActiveId] = useState(null);

  const [items, setItems] = useState(fields);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = active?.data.current.sortable.index;
      const newIndex = over?.data.current.sortable.index;
      // setItems((items) => {
      //   return arrayMove(items, oldIndex, newIndex);
      // });
      const newFields = arrayMove(fields, oldIndex, newIndex);
      console.log({ newFields });
      replace(newFields);
    }

    setActiveId(null);
  }
  const handleAddInput = (e) => {
    append(); // Append a new empty subtask
  };
  const handleRemoveInput = (index) => {
    console.log({ index });
    remove(index); // Remove the subtask at given index
  };

  return (
    <div className="space-y-2">
      <Label name={label} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((item, index) => {
            return (
              <SubtaskDraggable
                key={item.id}
                item={item}
                index={index}
                register={register}
                errors={errors}
                from={from}
                handleRemoveInput={handleRemoveInput}
                control={control}
                name={name}
              />
            );
          })}
        </SortableContext>
        <DragOverlay>
          {activeId ? <div id={activeId}>{activeId}</div> : null}
        </DragOverlay>
      </DndContext>
      <Button
        className="text-main-purple w-full rounded-full dark:bg-white bg-[#635FC7] bg-opacity-10 hover:bg-opacity-25 cursor-pointer"
        type="button"
        onClick={handleAddInput}>
        {`+ Add New ${label.includes("Task") ? "Task" : "Column"}`}
      </Button>
    </div>
  );
};

export default FormMultiInput;
