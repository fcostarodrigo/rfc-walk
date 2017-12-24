export = walk;

declare function walk(options?: {
  root?: string;
  includeFolders?: boolean;
  onPath?: (path: string) => Promise<void> | undefined;
}): Promise<string[]>;
