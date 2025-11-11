"use client";
import { useTreeStore } from "./store/treeStore";
import TreeNode from "./components/TreeNode";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const { tree } = useTreeStore();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        ساختار درختی
      </Typography>

      {tree.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </Box>
  );
}
