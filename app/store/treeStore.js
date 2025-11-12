import { create } from "zustand";
import { nanoid } from "nanoid";

export const useTreeStore = create((set, get) => ({
  tree: [
    {
      id: 1,
      label: "حساب اصلی",
      children: [
        { id: 2, label: "دارایی های جاری", children: [] },
        { id: 3, label: "دارایی های غیر جاری", children: [] }
      ]
    }
  ],
  clipboard: null,

  addNode: (ID, label) => {
    const add = (nodes) =>
      nodes.map((node) => {
        if (node.id === ID) {
          const newNode = {
            id: nanoid(),
            label,
            children: []
          };
          return { ...node, children: [...node.children, newNode] };
        }
        return { ...node, children: add(node.children) };
      });
    set({ tree: add(get().tree) });
  },

  deleteNode: (id) => {
    const del = (nodes) =>
      nodes
        .filter((n) => n.id !== id)
        .map((n) => ({ ...n, children: del(n.children) }));
    set({ tree: del(get().tree) });
  },

  copyNode: (id) => {
    const find = (nodes) => {
      for (let node of nodes) {
        if (node.id === id) return JSON.parse(JSON.stringify(node));
        const found = find(node.children);
        if (found) return found;
      }
      return null;
    };
    set({ clipboard: { data: find(get().tree), type: "copy" } });
  },

  cutNode: (id) => {
    const find = (nodes) => {
      for (let node of nodes) {
        if (node.id === id) return node;
        const found = find(node.children);
        if (found) return found;
      }
      return null;
    };
    const node = find(get().tree);
    get().deleteNode(id);
    set({ clipboard: { data: node, type: "cut" } });
  },

  pasteNode: (ID) => {
    const { clipboard } = get();
    if (!clipboard) return;
    const newData =
      clipboard.type === "copy"
        ? { ...clipboard.data, id: nanoid() }
        : clipboard.data;

    get().addNode(ID, newData.label);
    if (clipboard.type === "cut") set({ clipboard: null });
  }
}));
