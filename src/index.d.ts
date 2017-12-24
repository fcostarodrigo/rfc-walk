export = walk;

declare function walk(options?: {
  root?: string;
  includeFolders?: boolean;
  onPath?: (path: string) => void;
}): Promise<string[]>;
