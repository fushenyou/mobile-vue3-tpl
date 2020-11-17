import request from "@/utils/request";

export type QueryDemoListRecordsType = {
  id: number;
  name: string;
  address: string;
  status: string;
  date: string;
  stature: number;
  weight: number;
  month: number;
};

export type QueryDemoListResultType = {
  /** 总页码 */
  total: number;
  /** 页数 */
  pages: number;
  /** 列表数据 */
  records: QueryDemoListRecordsType[];
};

export type QueryDemoListParamsType = {
  page: number;
  size: number;
  [key: string]: any;
};

export async function queryDemoList(params: QueryDemoListParamsType): Promise<QueryDemoListResultType> {
  return request("/queryDemoList", { method: "POST", params, isLoading: false });
}
