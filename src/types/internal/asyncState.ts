export interface AsyncState<T> {
  state: T
  loading: boolean
  error: unknown
}
