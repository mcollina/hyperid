import * as hyperid from '..'

const urlSafeInstance = hyperid({ fixedLength: false, urlSafe: true })
const fixedLengthInstance = hyperid(true)

const urlSafeId = urlSafeInstance()
const fixedLengthId = fixedLengthInstance()

// decode
console.log(hyperid.decode(urlSafeId))
console.log(fixedLengthInstance.decode(fixedLengthId))
