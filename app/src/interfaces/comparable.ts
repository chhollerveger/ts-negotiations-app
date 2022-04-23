export interface Comparable<T> {
  alreadyExists(object: T): boolean;
}