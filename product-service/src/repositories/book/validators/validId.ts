import validate from "uuid-validate";

export function validId(id: string): boolean {
  return validate(id, 4);
}
