import { Type } from "./type";
import { ValidationResult, ErrorResult, SuccessResult } from "./validation";
import { MergeTuples } from "./util/tuple";
import { TypeConstraint } from ".";

export class StringType<TConstraints extends any[]> extends Type<
  string,
  TConstraints
> {
  id: "string" = "string";

  validate(input: any) {
    return typeof input !== "string"
      ? new ErrorResult(null, [
          {
            origin: null,
            message: "has to be a string",
          },
        ])
      : new SuccessResult(null, input);
  }

  with<T extends TypeConstraint<string, string>[]>(...constraints: T) {
    return super._with<StringType<MergeTuples<TConstraints, T>>>(
      this as any,
      constraints
    );
  }
}

export const string = new StringType<[]>([]);
