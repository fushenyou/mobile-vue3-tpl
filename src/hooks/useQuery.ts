/**
 * @description 组件装载时执行加载数据，支持分页、条件查询、加载、重置
 */
import { reactive, toRefs, onMounted } from "vue";
import { awaitTo } from "@/utils";
import Aop from "@/utils/aop";

export type UseQueryResultType<R, M = any> = {
  /** 响应数据 */
  data: R;
  /** 错误信息 */
  error: any;
  /** 加载状态 */
  loading: boolean;
  /** 条件查询 */
  search: Function;
  /** 下拉刷新 */
  refresh: Function;
  /** 上拉加载 */
  load: Function;
  /** 重置 */
  reset: Function;
  /** 请求参数 */
  params: Object;
  /** 分页 */
  pagination: { page: number; size: number };
  /** 总条数 */
  total: number;
  /** 列表数据 */
  records: M[];
  /** 是否有更多数据 */
  isMore: boolean;
  /** 是否有错误信息 */
  isError: boolean;
  /** 下拉刷新loading */
  refreshLoading: boolean;
};

export type RespDataType = {
  pages: number;
  total: number;
  records: any[];
};

export default function useQuery<R = RespDataType, M = any>(request: (params: any) => Promise<any>) {
  const fn = () => {};
  const result = reactive<UseQueryResultType<R, M>>({
    data: <R>{},
    error: null,
    isError: false,
    loading: false,
    refreshLoading: false,
    pagination: { page: 1, size: 10 },
    total: 0,
    params: {},
    records: [],
    isMore: true,
    search: fn,
    refresh: fn,
    load: fn,
    reset: fn,
  });

  const before = (params: any) => {
    result.loading = true;
    result.isError = false;
    if (params.refresh) result.refreshLoading = true;
  };

  const after = async (_params: any, isLoad: boolean, respPromise: Promise<R>) => {
    const { data, error } = await awaitTo<RespDataType>(respPromise);
    result.data = <any>data;
    result.error = error;
    result.loading = false;
    result.refreshLoading = false;
    if (error) return (result.isError = true);
    result.total = <any>data?.total;
    if (!isLoad) {
      result.records = <any>data?.records;
    } else {
      result.records = [...result.records, ...(data?.records as any[])];
    }
    result.isMore = result.records.length < result.total;
  };

  const aop = Aop(before, after);

  /**
   * @description 页面状态时请求
   */
  onMounted(async () => {
    const { error } = await awaitTo<R>(aop.invoke(request, result.pagination, false));
  });

  /**
   * @description 条件查询
   */
  const search = async (params = {}) => {
    result.params = params;
    await awaitTo<R>(aop.invoke(request, { ...result.pagination, ...result.params }, false));
  };

  /**
   * @description 刷新
   */
  const refresh = async () => {
    // result.params = {};
    result.pagination = { page: 1, size: 10 };
    await awaitTo<R>(aop.invoke(request, { ...result.pagination, ...result.params, refresh: true }, false));
  };

  /**
   * @description 上拉加载
   */
  const load = async () => {
    // 没有更多数据，直接返回，不调用请求
    if (!result.isMore) return;
    ++result.pagination.page;
    const { error } = await awaitTo<R>(aop.invoke(request, { ...result.pagination, ...result.params }, true));
    if (error) --result.pagination.page;
  };

  const reset = async () => {
    result.params = {};
    result.pagination = { page: 1, size: 10 };
    await awaitTo<R>(aop.invoke(request, { ...result.pagination, ...result.params }, false));
  };

  result.search = search;
  result.refresh = refresh;
  result.load = load;
  result.reset = reset;

  return toRefs<UseQueryResultType<R, M>>(result as UseQueryResultType<R, M>);
}
