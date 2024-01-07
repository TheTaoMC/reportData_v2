import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import { useStore } from "../zustand/Store";

const AddData = ({ VisibleIn, VisibleOut, SaveOut, child, title }) => {
  const { zu_Form_AddEdit, zu_DataID, zu_Title_Form_AddEdit } = useStore();
  const { zuAddData, zuEditData, zuToggleResetState } = useStore();

  const toast = useRef(null);
  const save = async () => {
    if (zu_Title_Form_AddEdit === "add") {
      console.log("add");
      const data = await zuAddData();
      if (!data) {
        toast.current.show({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "ข้อมูลไม่ถูกต้อง",
          life: 3000,
        });
        return;
      }
      zuToggleResetState();
    } else {
      console.log("edit");
      const data = await zuEditData();
      console.log("edit:data: ", data);
      if (!data) {
        toast.current.show({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "ข้อมูลไม่ถูกต้อง",
          life: 3000,
        });
        return;
      }
      zuToggleResetState();
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={title}
        visible={VisibleIn}
        style={{ width: "70vw" }}
        onHide={() => {
          VisibleOut();
        }}
      >
        {/* child */}

        {zu_Form_AddEdit}

        <div className="flex gap-2 mt-2">
          <Button
            onClick={() => {
              //SaveOut();
              //zuAddData();
              save();
            }}
            className="w-20"
            label="บันทึก"
          />

          <Button
            className="w-20"
            onClick={() => {
              VisibleOut();
            }}
            label="ยกเลิก"
          />
        </div>
      </Dialog>
    </>
  );
};

export default AddData;
