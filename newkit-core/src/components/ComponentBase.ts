export class ComponentBase {
  public constructor() {
  }

  public watch(key: string, watchFn: (newVal, oldVal) => void | any = (newVal, oldVal) => { }) {
    let p = `$_$_${key}`;
    this[p] = this[key];
    Object.defineProperty(this, key, {
      get() {
        return this[p];
      },
      set(value) {
        let oldVal = this[p];
        this[p] = value;
        watchFn(value, oldVal);
      }
    });
  }
}
