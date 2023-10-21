const toBoolean = (value) => {
  if (typeof value === 'boolean') {
    return Boolean(value)
  }

  if (typeof value === 'string' && (value.toLowerCase() === 'true' || value.toLowerCase() === 'yes' || value === '1')) {
    return true
  }

  if (typeof value === 'number' && value > 0) {
    return true
  }

  return false
}

const isIdValid = (value, type) => {
  if (type === 'number' && typeof parseNumber(value) === 'number') {
    return Number(value)
  }

  throw Error('Id invalido')
}

const parseNumber = (value) => {
  const numberValue = parseInt(value)

  return isNaN(numberValue) ? undefined : numberValue
}

export {
  toBoolean,
  isIdValid
}
