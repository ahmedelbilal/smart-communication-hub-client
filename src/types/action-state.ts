export type ActionState<T = undefined> = {
  success: boolean | null;
  message: string;
  data?: T;
};

export const initialState: ActionState = {
  message: '',
  success: null,
};
