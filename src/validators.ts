

export function required() {
  return (value: any) => value ? true : 'required'
}

export function minLength(min: number) {
  return (value: string) => value.length >= min ? true : 'too short'
}

export function maxLength(max: number) {
  return (value: string) => value.length <= max ? true : 'too long'
}

export function email() {
  return (value: string) =>
    value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      ? true
      : 'invalid email'
}