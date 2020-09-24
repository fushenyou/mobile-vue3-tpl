/**
 * @description 用户全局相关数据
 */

import { provide, inject, ref, Ref } from "vue";

const USER_STATE = Symbol();

const initState = {};

// 定义userState数据类型
export type UserStateType = {};

export type UserContext = {
  user: Ref<UserStateType>;
  serUser: (value: UserStateType) => void;
};

export const useUserProvide = () => {
  const user = ref<UserStateType>(initState);
  const setUser = (value: UserStateType) => (user.value = value);

  provide(USER_STATE, {
    user,
    setUser,
  });
};

export const useUserInject = () => {
  const context = inject<UserContext>(USER_STATE);
  if (!context) {
    throw new Error(`使用useUserInject之前先使用useUserProvide`);
  }
  return context;
};
