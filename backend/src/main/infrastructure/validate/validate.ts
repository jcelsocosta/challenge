function isNumberEmpty(target: any): boolean {
  return typeof target !== 'number'
}

function isStringEmpty(target: string): boolean {
  return (
    !target ||
    target === undefined ||
    target === null ||
    typeof target !== 'string' ||
    target.trim() === '' ||
    // prettier-ignore
    target.trim() === ''
  )
}

export {
  isNumberEmpty,
  isStringEmpty,
}

