/**
 * Base interface for tree items with id and parent id
 */
export interface TreeItem {
  id: number | string;
  pid: number | string;
}

/**
 * TreeNode type with children array
 */
export type TreeNode<T extends TreeItem> = T & { children: TreeNode<T>[] };

/**
 * Convert a flat array to a tree structure
 * @param items - Array of items with id and pid properties
 * @param rootId - Root parent id (default: 0)
 * @returns Tree structure with nested children
 */
export function arrayToTree<T extends TreeItem>(
  items: T[],
  rootId?: number | string
): TreeNode<T>[] {
  const result: TreeNode<T>[] = [];
  const itemMap: Record<number | string, TreeNode<T>> = {};

  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    itemMap[id] = {
      ...item,
      children: !itemMap[id] ? [] : itemMap[id].children,
    };

    const treeItem = itemMap[id];

    if (pid === rootId) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        } as unknown as TreeNode<T>;
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}
