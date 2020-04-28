import * as t from "../../lib/";

const isPositive = t.constraint(
  "isPositive",
  "has to be a positive number",
  (input: number) => input > 0
);

const type = t.object({
  object: t.object({
    number: t.number.with(isPositive),
  }),
});

const input = {};

const result = type.decode(input);

if (result.isValid) {
  console.log("OK", result.value);
} else {
  console.log("ERROR", result.getErrorTree());
}
