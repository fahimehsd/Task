"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Typography, Collapse, IconButton } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import ContextMenu from "./ContextMenu";

const levelColors = [
  "#FFFAE3",
  "#E0F7FA",
  "#E8F5E9",
  "#FFF3E0",
  "#F3E5F5",
  "#FBE9E7",
];

export default function TreeNode({ node, level = 0 }) {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState(null);
  const nodeRef = useRef(null);
  const [midHeight, setMidHeight] = useState(20);

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

  useEffect(() => {
    if (node.children.length > 0) {
      setTimeout(() => setOpen(true), 0);
    }
  }, [node.children]);

  return (
    <Box
      sx={{
        position: "relative",
        pl: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
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
          transition: "0.3s",
          position: "relative",
          zIndex: 1,
          width: "200px",
          height: "fit-content",
        }}
      >
        {node.children.length > 0 &&
          (open ? (
            <KeyboardArrowUp fontSize="small" />
          ) : (
            <KeyboardArrowDown fontSize="small" />
          ))}
        <Typography sx={{ ml: 1, wordBreak: "break-all" }}>
          {node.label}
        </Typography>
      </Box>

      <ContextMenu node={node} context={context} onClose={handleClose} />

      <Collapse in={open}>
        {node.children.map((child, index) => {
          const isOnly = node.children.length === 1;
          const isLast = index === node.children.length - 1;
          const verticalGap = 24;

          return (
            <Box
              key={child.id}
              sx={{
                position: "relative",
                pl: 1,
                ml: 2,
                mt: `${verticalGap}px`,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -verticalGap,
                  left: 12,
                  width: 2,
                  height: isOnly
                    ? midHeight + verticalGap
                    : isLast
                    ? midHeight + verticalGap
                    : `calc(100% + ${verticalGap}px)`,
                  bgcolor: "grey.400",
                  zIndex: 0,
                  transition: "height 0.3s ease",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: midHeight,
                  left: 12,
                  width: 16,
                  height: 2,
                  bgcolor: "grey.400",
                  zIndex: 1,
                  transform: "translateY(-50%)",
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
