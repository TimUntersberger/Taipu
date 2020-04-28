import { Type, MapObjectType } from "./type";
import { ErrorResult, ValidationResult, SuccessResult } from "./validation";
import { MergeTuples } from "./util/tuple";
import { TypeConstraint } from ".";

export interface ObjectTypeProperties {
  [key: string]: Type<any, any[]>;
}
export class ObjectType<
  TProperties extends ObjectTypeProperties,
  TConstraints extends any[]
> extends Type<MapObjectType<TProperties>, TConstraints> {
  id = "object";
  constructor(public properties: TProperties, constraints: TConstraints) {
    super(constraints);
  }

  validate(input: any): ValidationResult<MapObjectType<TProperties>> {
    if (typeof input !== "object") {
      return new ErrorResult(null, [
        {
          origin: null,
          message: "has to be an object",
        },
      ]);
    }

    const results = Object.keys(this.properties)
      .map((p) => {
        const result = this.properties[p].decode(input[p]);
        return {
          origin: p,
          result,
        };
      })
      .map((x) =>
        x.result.isValid
          ? new SuccessResult(x.origin, x.result.value, x.result.subResults)
          : new ErrorResult(x.origin, x.result.errors, x.result.subResults)
      );

    let output = input;

    results.forEach((r) => {
      output = {
        ...output,
        [r.origin]: r.value,
      };
    });

    return results.every((r) => r.isValid)
      ? new SuccessResult(null, output, results)
      : new ErrorResult(null, [], results);
  }

  with<T extends TypeConstraint<string, TProperties>[]>(...constraints: T) {
    return super._with<ObjectType<TProperties, MergeTuples<TConstraints, T>>>(
      this as any,
      constraints
    );
  }
}

export const object = <T extends ObjectTypeProperties>(properties: T) =>
  new ObjectType(properties, []);
