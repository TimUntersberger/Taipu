export type TypeConstraint<TId, TInput> = {
  id: TId;
  message: string;
  validate: (input: TInput) => boolean;
};

export function constraint<TId extends string, TInput>(
  id: TId,
  message: string,
  validate: (input: TInput) => boolean
): TypeConstraint<TId, TInput> {
  return {
    id,
    message,
    validate,
  };
}
