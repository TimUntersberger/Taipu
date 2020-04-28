import { StringType } from "./string";
import { ObjectType } from "./object";
import { ValidationResult, ErrorResult } from "./validation";
import { NumberType } from "./number";
import { BooleanType } from "./boolean";
import { TypeConstraint } from "./constraint";

export abstract class Type<TValue, TConstraints extends any[]> {
  abstract id: string = "type";
  abstract validate(input: any): ValidationResult<TValue>;

  constructor(public constraints: TConstraints[] = []) {}

  decode(input: any): ValidationResult<TValue> {
    if (!input) {
      return new ErrorResult(null, [
        { origin: null, message: "has to be defined" },
      ]);
    }

    const validationResult = this.validate(input);
    const constraintErrors = ((this.constraints as any) as TypeConstraint<
      string,
      any
    >[])
      .filter((c) => !c.validate(input))
      .map((c) => ({ origin: null, message: c.message }));

    if (constraintErrors.length > 0 && !validationResult.isValid) {
      return new ErrorResult(
        null,
        [...validationResult.errors, ...constraintErrors],
        validationResult.subResults
      );
    } else if (!validationResult.isValid) {
      return validationResult;
    } else if (constraintErrors.length > 0) {
      return new ErrorResult(null, constraintErrors);
    }

    return validationResult;
  }

  protected _with<TSelf extends Type<any, any[]>>(
    self: TSelf,
    constraints: any[]
  ): TSelf {
    return new (self.constructor as any)([
      ...((self as any).constraints as any),
      ...(constraints as any),
    ]);
  }
}

export type ExtractObjectType<P> = P extends ObjectType<infer T, []>
  ? T
  : never;

export type MapObjectType<T> = {
  [P in keyof T]: ExtractType<T[P]>;
};

export type ExtractType<T> = T extends StringType<any[]>
  ? string
  : T extends NumberType<any[]>
  ? number
  : T extends BooleanType<any[]>
  ? boolean
  : T extends ObjectType<{}, []>
  ? MapObjectType<ExtractObjectType<T>>
  : T extends object
  ? MapObjectType<T>
  : any;
