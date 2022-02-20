import * as hyperid from '..'

const urlSafeInstance = hyperid({ fixedLength: false, urlSafe: true })
const fixedLengthInstance = hyperid(true)
const startFromInstance = hyperid({ startFrom: 9 })

const urlSafeId = urlSafeInstance()
const fixedLengthId = fixedLengthInstance()
const startFromId = startFromInstance()

// decode
console.log(hyperid.decode(urlSafeId))
console.log(fixedLengthInstance.decode(fixedLengthId))
console.log(startFromInstance.decode(startFromId))