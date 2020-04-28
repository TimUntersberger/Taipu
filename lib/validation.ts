export type ValidationError = {
  origin: string;
  message: string;
};

export class ValidationResult<T = any> {
  constructor(
    public origin: string,
    public isValid: boolean,
    public value: T,
    public subResults: ValidationResult<T>[] = [],
    public errors: ValidationError[] = []
  ) {}

  private mergePaths(x1: string, x2: string) {
    return [x1, x2].filter((x) => x).join(".");
  }

  private _getErrorTreeAsArray(parent: string) {
    const path = this.mergePaths(parent, this.origin);
    return [
      this.errors.map((e) => `${this.mergePaths(path, e.origin)} ${e.message}`),
      ...this.subResults.map((r) => r._getErrorTreeAsArray(path)),
    ].reduce((acc, cur) => [...acc, ...cur], []);
  }

  getErrorTreeAsArray() {
    return this._getErrorTreeAsArray(this.origin);
  }

  getErrorTree() {
    return this.errors.length > 0
      ? this.errors.map((e) => e.message)
      : this.subResults.reduce(
          (o, r) => ({
            [r.origin]: r.getErrorTree(),
          }),
          {}
        );
  }
}

export class ErrorResult<T = any> extends ValidationResult<T> {
  constructor(
    origin: string,
    errors: ValidationError[],
    subResults: ValidationResult<T>[] = []
  ) {
    super(origin, false, null, subResults, errors);
  }
}

export class SuccessResult<T = any> extends ValidationResult<T> {
  constructor(
    origin: string,
    value: T,
    subResults: ValidationResult<T>[] = []
  ) {
    super(origin, true, value, subResults);
  }
}
