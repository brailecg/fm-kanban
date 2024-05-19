import React, { useState } from "react";

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
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const [activeId, setActiveId] = useState(null);

  const fieldsIdsArray = fields.map((fld) => fld.id);

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
    console.log({ active, over });
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = active?.data.current.sortable.index;
        const newIndex = over?.data.current.sortable.index;
        console.log({ oldIndex, newIndex });
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
  const handleAddInput = () => {
    append({ title: "" }); // Append a new empty subtask

    console.log({ fields });
  };
  console.log({ items });
  return (
    <div className="space-y-2">
      <Label name={label} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => {
            return (
              <SubtaskDraggable
                key={item.id}
                id={item.id}
                item={item}
                index={index}
                register={register}
                errors={errors}
                from={from}
                remove={remove}
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
