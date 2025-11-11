"use client";
import { Menu, MenuItem, Dialog, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { useTreeStore } from "../store/treeStore";

export default function ContextMenu({ node, context, onClose }) {
  const { deleteNode, copyNode, cutNode, pasteNode, addNode } = useTreeStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [label, setLabel] = useState("");

  const handleAddChild = () => {
    setOpenDialog(true);
    onClose();
  };

  const handleSubmit = () => {
    addNode(node.id, label);
    setLabel("");
    setOpenDialog(false);
  };

  return (
    <>
      <Menu
        open={!!context}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={
          context ? { top: context.mouseY, left: context.mouseX } : undefined
        }
      >
        <MenuItem
          onClick={() => {
            copyNode(node.id);
            onClose();
          }}
        >
          کپی کردن
        </MenuItem>
        <MenuItem
          onClick={() => {
            cutNode(node.id);
            onClose();
          }}
        >
          برش دادن
        </MenuItem>
        <MenuItem
          onClick={() => {
            pasteNode(node.id);
            onClose();
          }}
        >
          پیست کردن
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteNode(node.id);
            onClose();
          }}
        >
          حذف
        </MenuItem>
        <MenuItem onClick={handleAddChild}>افزودن زیرشاخه</MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            label="نام زیرشاخه"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            افزودن
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
