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
export type TreeNode<T> = T & { children: TreeNode<T>[] };

type Config = {
  rootId?: number | string | null;
  parentId?: string;
  childId?: string;
};

/**
 * Convert a flat array to a tree structure
 * @param items - Array of items with id and pid properties
 * @param rootId - Root parent id (default: null)
 * @returns Tree structure with nested children
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function arrayToTree<T extends Record<string, any>>(
  items: T[],
  config?: Config
): TreeNode<T>[] {
  type TreeNodeT = TreeNode<T>;

  const result: TreeNodeT[] = [];
  const itemMap: Record<number | string, TreeNodeT> = {};

  const { rootId = null, parentId = "parentId", childId = "id" } = config || {};

  for (const item of items) {
    const id = item[childId] as number | string;
    const pid = item[parentId] as number | string | null;

    const existingChildren = itemMap[id]?.children || [];
    itemMap[id] = {
      ...item,
      children: existingChildren,
    };

    const treeItem = itemMap[id];

    if (pid === rootId || pid == null) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          ...({} as T),
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}

export default arrayToTree;
