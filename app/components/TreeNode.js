"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import { ExpandMore, ChevronLeft } from "@mui/icons-material";
import { useTreeStore } from "../store/treeStore";
import ContextMenu from "./ContextMenu";

const levelColors = [
  "#FFFAE3",
  "#E0F7FA",
  "#E8F5E9",
  "#FFF3E0",
  "#F3E5F5",
  "#FBE9E7"
];

export default function TreeNode({ node, level = 0 }) {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState(null);
  const { deleteNode } = useTreeStore();
  const nodeRef = useRef(null);
  const [midHeight, setMidHeight] = useState(20); // مقدار پیش‌فرض

  useEffect(() => {
    if (nodeRef.current) {
      setMidHeight(nodeRef.current.offsetHeight / 2);
    }
  }, [node.label, open]);

  const handleRightClick = (e) => {
    e.preventDefault();
    setContext({ mouseX: e.clientX - 2, mouseY: e.clientY - 4 });
  };

  const handleClose = () => setContext(null);

  return (
    <Box sx={{ position: "relative", pl: 4, display: "flex" }}>
      <Box
        ref={nodeRef}
        onClick={() => setOpen(!open)}
        onContextMenu={handleRightClick}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          p: 1.5,
          borderRadius: 2,
          bgcolor: levelColors[level % levelColors.length],
          boxShadow: 2,
          "&:hover": { bgcolor: "grey.100" },
          transition: "0.3s",
          position: "relative",
          zIndex: 1,
          width: "200px",
          height: "fit-content"
        }}
      >
        {node.children.length > 0 &&
          (open ? (
            <ExpandMore fontSize="small" />
          ) : (
            <ChevronLeft fontSize="small" />
          ))}
        <Typography sx={{ ml: 1, wordBreak: "break-all" }}>
          {node.label}
        </Typography>
      </Box>

      <ContextMenu node={node} context={context} onClose={handleClose} />

      <Collapse orientation="horizontal" in={open}>
        {node.children.map((child, index) => {
          const isFirst = index === 0;
          const isOnly = node.children.length === 1;
          const isLast = index === node.children.length - 1;

          return (
            <Box key={child.id} sx={{ position: "relative", pl: 1, pb: 2 }}>
              {/* خط عمودی */}
              <Box
                sx={{
                  position: "absolute",
                  top: isOnly ? midHeight : isFirst ? midHeight : 0,
                  left: 12,
                  width: 2,
                  height: isOnly ? 0 : isLast ? "38%" : "100%",
                  bgcolor: "grey.400",
                  zIndex: 0
                }}
              />
              {/* خط افقی - دقیقا وسط ارتفاع کارت پدر */}
              <Box
                sx={{
                  position: "absolute",
                  top: midHeight,
                  left: 12,
                  width: 16,
                  height: 2,
                  bgcolor: "grey.400",
                  zIndex: 1,
                  transform: "translateY(-50%)"
                }}
              />

              <TreeNode node={child} level={level + 1} />
            </Box>
          );
        })}
      </Collapse>
    </Box>
  );
}
