import { Type } from "./type";
import { ValidationResult, ErrorResult, SuccessResult } from "./validation";
import { MergeTuples } from "./util/tuple";
import { TypeConstraint } from ".";

export class BooleanType<TConstraints extends any[]> extends Type<
  boolean,
  TConstraints
> {
  id = "boolean";

  validate(input: any): ValidationResult<boolean> {
    return input !== "true" && input !== "false" && typeof input !== "boolean"
      ? new ErrorResult(null, [
          {
            origin: null,
            message: "has to be a boolean",
          },
        ])
      : new SuccessResult(
          null,
          typeof input === "string" ? input === "true" : input
        );
  }

  with<T extends TypeConstraint<string, boolean>[]>(...constraints: T) {
    return super._with<BooleanType<MergeTuples<TConstraints, T>>>(
      this as any,
      constraints
    );
  }
}

export const boolean = new BooleanType([]);
