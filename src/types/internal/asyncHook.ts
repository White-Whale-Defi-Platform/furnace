export interface AsyncHook<T> {
  result: T
  loading: boolean
  error: unknown
}
