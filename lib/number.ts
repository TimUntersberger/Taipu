import { Type } from "./type";
import { ValidationResult, ErrorResult, SuccessResult } from "./validation";
import { MergeTuples } from "./util/tuple";
import { TypeConstraint } from ".";

export class NumberType<TConstraints extends any[]> extends Type<
  number,
  TConstraints
> {
  id = "number";

  validate(input: any): ValidationResult<number> {
    return isNaN(input) || !isFinite(input)
      ? new ErrorResult(null, [
          {
            origin: null,
            message: "has to be a finite number",
          },
        ])
      : new SuccessResult(null, +input);
  }

  with<T extends TypeConstraint<string, number>[]>(...constraints: T) {
    return super._with<NumberType<MergeTuples<TConstraints, T>>>(
      this as any,
      constraints
    );
  }
}

export const number = new NumberType();
