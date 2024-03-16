export interface ProductTabs {
  header: string;
  contentType: number; // 0 = pure text, 1 = schedule, .. ?
  contentHead: string[] | null;
  content: string[];
}
