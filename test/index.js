var assert = require('assert')
var ethUtils = require('../dist/index.js')
var BN = require('bn.js')

describe('zeros function', function () {
  it('should produce lots of 0s', function () {
    var z60 = ethUtils.zeros(30)
    var zs60 = '000000000000000000000000000000000000000000000000000000000000'
    assert.equal(z60.toString('hex'), zs60)
  })
})

describe('zero address', function () {
  it('should generate a zero address', function () {
    var zeroAddress = ethUtils.zeroAddress()
    assert.equal(zeroAddress, '0x0000000000000000000000000000000000000000')
  })
})

describe('is zero address', function () {
  it('should return true when a zero address is passed', function () {
    var isZeroAddress = ethUtils.isZeroAddress('0x0000000000000000000000000000000000000000')
    assert.equal(isZeroAddress, true)
  })

  it('should return false when the address is not equal to zero', function () {
    var nonZeroAddress = '0x2f015c60e0be116b1f0cd534704db9c92118fb6a'
    assert.equal(ethUtils.isZeroAddress(nonZeroAddress), false)
  })
})

describe('keccak', function () {
  it('should produce a hash', function () {
    var msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = '82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28'
    var hash = ethUtils.keccak(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('keccak256', function () {
  it('should produce a hash (keccak(a, 256) alias)', function () {
    var msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = '82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28'
    var hash = ethUtils.keccak256(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('keccak without hexprefix', function () {
  it('should produce a hash', function () {
    var msg = '3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = '22ae1937ff93ec72c4d46ff3e854661e3363440acd6f6e4adf8f1a8978382251'
    var hash = ethUtils.keccak(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('keccak-512', function () {
  it('should produce a hash', function () {
    var msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = '36fdacd0339307068e9ed191773a6f11f6f9f99016bd50f87fd529ab7c87e1385f2b7ef1ac257cc78a12dcb3e5804254c6a7b404a6484966b831eadc721c3d24'
    var hash = ethUtils.keccak(msg, 512)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('sha256', function () {
  it('should produce a sha256', function () {
    var msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = '58bbda5e10bc11a32d808e40f9da2161a64f00b5557762a161626afe19137445'
    var hash = ethUtils.sha256(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('ripemd160', function () {
  it('should produce a ripemd160', function () {
    var msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = '4bb0246cbfdfddbe605a374f1187204c896fabfd'
    var hash = ethUtils.ripemd160(msg)
    assert.equal(hash.toString('hex'), r)
  })

  it('should produce a padded ripemd160', function () {
    var msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = '0000000000000000000000004bb0246cbfdfddbe605a374f1187204c896fabfd'
    var hash = ethUtils.ripemd160(msg, true)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('rlphash', function () {
  it('should produce a keccak-256 hash of the rlp data', function () {
    var msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    var r = '33f491f24abdbdbf175e812b94e7ede338d1c7f01efb68574acd279a15a39cbe'
    var hash = ethUtils.rlphash(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('unpad', function () {
  it('should unpad a string', function () {
    var str = '0000000006600'
    var r = ethUtils.unpad(str)
    assert.equal(r, '6600')
  })
})

describe('unpad a hex string', function () {
  it('should unpad a string', function () {
    var str = '0x0000000006600'
    var r = ethUtils.unpad(str)
    assert.equal(r, '6600')
  })
})

describe('pad', function () {
  it('should left pad a Buffer', function () {
    var buf = Buffer.from([9, 9])
    var padded = ethUtils.setLength(buf, 3)
    assert.equal(padded.toString('hex'), '000909')
  })
  it('should left truncate a Buffer', function () {
    var buf = Buffer.from([9, 0, 9])
    var padded = ethUtils.setLength(buf, 2)
    assert.equal(padded.toString('hex'), '0009')
  })
  it('should left pad a Buffer - alias', function () {
    var buf = Buffer.from([9, 9])
    var padded = ethUtils.setLengthLeft(buf, 3)
    assert.equal(padded.toString('hex'), '000909')
  })
})

describe('rpad', function () {
  it('should right pad a Buffer', function () {
    var buf = Buffer.from([9, 9])
    var padded = ethUtils.setLength(buf, 3, true)
    assert.equal(padded.toString('hex'), '090900')
  })
  it('should right truncate a Buffer', function () {
    var buf = Buffer.from([9, 0, 9])
    var padded = ethUtils.setLength(buf, 2, true)
    assert.equal(padded.toString('hex'), '0900')
  })
  it('should right pad a Buffer - alias', function () {
    var buf = Buffer.from([9, 9])
    var padded = ethUtils.setLengthRight(buf, 3)
    assert.equal(padded.toString('hex'), '090900')
  })
})

describe('bufferToHex', function () {
  it('should convert a buffer to hex', function () {
    var buf = Buffer.from('5b9ac8', 'hex')
    var hex = ethUtils.bufferToHex(buf)
    assert.equal(hex, '0x5b9ac8')
  })
  it('empty buffer', function () {
    var buf = Buffer.alloc(0)
    var hex = ethUtils.bufferToHex(buf)
    assert.strictEqual(hex, '0x')
  })
})

describe('intToHex', function () {
  it('should convert a int to hex', function () {
    var i = 6003400
    var hex = ethUtils.intToHex(i)
    assert.equal(hex, '0x5b9ac8')
  })
})

describe('intToBuffer', function () {
  it('should convert a int to a buffer', function () {
    var i = 6003400
    var buf = ethUtils.intToBuffer(i)
    assert.equal(buf.toString('hex'), '5b9ac8')
  })
})

describe('bufferToInt', function () {
  it('should convert a int to hex', function () {
    var buf = Buffer.from('5b9ac8', 'hex')
    var i = ethUtils.bufferToInt(buf)
    assert.equal(i, 6003400)
    assert.equal(ethUtils.bufferToInt(Buffer.allocUnsafe(0)), 0)
  })
  it('should convert empty input to 0', function () {
    assert.equal(ethUtils.bufferToInt(Buffer.allocUnsafe(0)), 0)
  })
})

describe('fromSigned', function () {
  it('should convert an unsigned (negative) buffer to a singed number', function () {
    var neg = '-452312848583266388373324160190187140051835877600158453279131187530910662656'
    var buf = Buffer.allocUnsafe(32).fill(0)
    buf[0] = 255

    assert.equal(ethUtils.fromSigned(buf), neg)
  })
  it('should convert an unsigned (positive) buffer to a singed number', function () {
    var neg = '452312848583266388373324160190187140051835877600158453279131187530910662656'
    var buf = Buffer.allocUnsafe(32).fill(0)
    buf[0] = 1

    assert.equal(ethUtils.fromSigned(buf), neg)
  })
})

describe('toUnsigned', function () {
  it('should convert a signed (negative) number to unsigned', function () {
    var neg = '-452312848583266388373324160190187140051835877600158453279131187530910662656'
    var hex = 'ff00000000000000000000000000000000000000000000000000000000000000'
    var num = new BN(neg)

    assert.equal(ethUtils.toUnsigned(num).toString('hex'), hex)
  })

  it('should convert a signed (positive) number to unsigned', function () {
    var neg = '452312848583266388373324160190187140051835877600158453279131187530910662656'
    var hex = '0100000000000000000000000000000000000000000000000000000000000000'
    var num = new BN(neg)

    assert.equal(ethUtils.toUnsigned(num).toString('hex'), hex)
  })
})

describe('isValidPrivate', function () {
  var SECP256K1_N = new ethUtils.BN('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16)
  it('should fail on short input', function () {
    var tmp = '0011223344'
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on too big input', function () {
    var tmp = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on invalid curve (zero)', function () {
    var tmp = '0000000000000000000000000000000000000000000000000000000000000000'
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on invalid curve (== N)', function () {
    var tmp = SECP256K1_N.toString(16)
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on invalid curve (>= N)', function () {
    var tmp = SECP256K1_N.addn(1).toString(16)
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should work otherwise (< N)', function () {
    var tmp = SECP256K1_N.subn(1).toString(16)
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), true)
  })
})

describe('isValidPublic', function () {
  it('should fail on too short input', function () {
    var pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae744'
    pubKey = Buffer.from(pubKey, 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey), false)
  })
  it('should fail on too big input', function () {
    var pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d00'
    pubKey = Buffer.from(pubKey, 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey), false)
  })
  it('should fail on SEC1 key', function () {
    var pubKey = '043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    pubKey = Buffer.from(pubKey, 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey), false)
  })
  it('shouldn\'t fail on SEC1 key with sanitize enabled', function () {
    var pubKey = '043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    pubKey = Buffer.from(pubKey, 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey, true), true)
  })
  it('should fail with an invalid SEC1 public key', function () {
    var pubKey = '023a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    pubKey = Buffer.from(pubKey, 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey, true), false)
  })
  it('should work with compressed keys with sanitize enabled', function () {
    var pubKey = '033a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a'
    pubKey = Buffer.from(pubKey, 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey, true), true)
  })
  it('should work with sanitize enabled', function () {
    var pubKey = '043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    pubKey = Buffer.from(pubKey, 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey, true), true)
  })
  it('should work otherwise', function () {
    var pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    pubKey = Buffer.from(pubKey, 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey), true)
  })
})

describe('importPublic', function () {
  var pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
  it('should work with an Ethereum public key', function () {
    var tmp = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    assert.equal(ethUtils.importPublic(Buffer.from(tmp, 'hex')).toString('hex'), pubKey)
  })
  it('should work with uncompressed SEC1 keys', function () {
    var tmp = '043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    assert.equal(ethUtils.importPublic(Buffer.from(tmp, 'hex')).toString('hex'), pubKey)
  })
  it('should work with compressed SEC1 keys', function () {
    var tmp = '033a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a'
    assert.equal(ethUtils.importPublic(Buffer.from(tmp, 'hex')).toString('hex'), pubKey)
  })
})

describe('publicToAddress', function () {
  it('should produce an address given a public key', function () {
    var pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    var address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    pubKey = Buffer.from(pubKey, 'hex')
    var r = ethUtils.publicToAddress(pubKey)
    assert.equal(r.toString('hex'), address)
  })
  it('should produce an address given a SEC1 public key', function () {
    var pubKey = '043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    var address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    pubKey = Buffer.from(pubKey, 'hex')
    var r = ethUtils.publicToAddress(pubKey, true)
    assert.equal(r.toString('hex'), address)
  })
  it('shouldn\'t produce an address given an invalid SEC1 public key', function () {
    var pubKey = '023a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    pubKey = Buffer.from(pubKey, 'hex')
    assert.throws(function () {
      ethUtils.publicToAddress(pubKey, true)
    })
  })
  it('shouldn\'t produce an address given an invalid public key', function () {
    var pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae744'
    pubKey = Buffer.from(pubKey, 'hex')
    assert.throws(function () {
      ethUtils.publicToAddress(pubKey)
    })
  })
})

describe('publicToAddress 0x', function () {
  it('should produce an address given a public key', function () {
    var pubKey = '0x3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    var address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    var r = ethUtils.publicToAddress(pubKey)
    assert.equal(r.toString('hex'), address)
  })
})

describe('privateToPublic', function () {
  it('should produce a public key given a private key', function () {
    var pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    var privateKey = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28, 95])
    var r = ethUtils.privateToPublic(privateKey).toString('hex')
    assert.equal(r.toString('hex'), pubKey)
  })
  it('shouldn\'t produce a public key given an invalid private key', function () {
    var privateKey1 = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28, 95, 42])
    var privateKey2 = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28])
    assert.throws(function () {
      ethUtils.privateToPublic(privateKey1)
    })
    assert.throws(function () {
      ethUtils.privateToPublic(privateKey2)
    })
  })
})

describe('privateToAddress', function () {
  it('should produce an address given a private key', function () {
    var address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    // Our private key
    var privateKey = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28, 95])
    var r = ethUtils.privateToAddress(privateKey).toString('hex')
    assert.equal(r.toString('hex'), address)
  })
})

describe('generateAddress', function () {
  it('should produce an address given a public key', function () {
    var add = ethUtils.generateAddress('990ccf8a0de58091c028d6ff76bb235ee67c1c39', 14).toString('hex')
    assert.equal(add.toString('hex'), '936a4295d8d74e310c0c95f0a63e53737b998d12')
  })
})

describe('generateAddress with hex prefix', function () {
  it('should produce an address given a public key', function () {
    var add = ethUtils.generateAddress('0x990ccf8a0de58091c028d6ff76bb235ee67c1c39', 14).toString('hex')
    assert.equal(add.toString('hex'), 'd658a4b8247c14868f3c512fa5cbb6e458e4a989')
  })
})

describe('generateAddress with nonce 0 (special case)', function () {
  it('should produce an address given a public key', function () {
    var add = ethUtils.generateAddress('0x990ccf8a0de58091c028d6ff76bb235ee67c1c39', 0).toString('hex')
    assert.equal(add.toString('hex'), 'bfa69ba91385206bfdd2d8b9c1a5d6c10097a85b')
  })
})

describe('hex prefix', function () {
  var string = 'd658a4b8247c14868f3c512fa5cbb6e458e4a989'
  it('should add', function () {
    assert.equal(ethUtils.addHexPrefix(string), '0x' + string)
  })
  it('should return on non-string input', function () {
    assert.equal(ethUtils.addHexPrefix(1), 1)
  })
})

describe('isPrecompiled', function () {
  it('should return true', function () {
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000001'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000002'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000003'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000004'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000005'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000006'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000007'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000008'), true)
    assert.equal(ethUtils.isPrecompiled(Buffer.from('0000000000000000000000000000000000000001', 'hex')), true)
  })
  it('should return false', function () {
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000000'), false)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000009'), false)
    assert.equal(ethUtils.isPrecompiled('1000000000000000000000000000000000000000'), false)
    assert.equal(ethUtils.isPrecompiled(Buffer.from('0000000000000000000000000000000000000000', 'hex')), false)
  })
})

describe('toBuffer', function () {
  it('should work', function () {
    // Buffer
    assert.deepEqual(ethUtils.toBuffer(Buffer.allocUnsafe(0)), Buffer.allocUnsafe(0))
    // Array
    assert.deepEqual(ethUtils.toBuffer([]), Buffer.allocUnsafe(0))
    // String
    assert.deepEqual(ethUtils.toBuffer('11'), Buffer.from([49, 49]))
    assert.deepEqual(ethUtils.toBuffer('0x11'), Buffer.from([17]))
    assert.deepEqual(ethUtils.toBuffer('1234').toString('hex'), '31323334')
    assert.deepEqual(ethUtils.toBuffer('0x1234').toString('hex'), '1234')
    // Number
    assert.deepEqual(ethUtils.toBuffer(1), Buffer.from([1]))
    // null
    assert.deepEqual(ethUtils.toBuffer(null), Buffer.allocUnsafe(0))
    // undefined
    assert.deepEqual(ethUtils.toBuffer(), Buffer.allocUnsafe(0))
    // 'toBN'
    assert.deepEqual(ethUtils.toBuffer(new BN(1)), Buffer.from([1]))
    // 'toArray'
    assert.deepEqual(ethUtils.toBuffer({ toArray: function () { return [ 1 ] } }), Buffer.from([1]))
  })
  it('should fail', function () {
    assert.throws(function () {
      ethUtils.toBuffer({ test: 1 })
    })
  })
})

describe('baToJSON', function () {
  it('should turn a array of buffers into a pure json object', function () {
    var ba = [Buffer.from([0]), Buffer.from([1]), [Buffer.from([2])]]
    assert.deepEqual(ethUtils.baToJSON(ba), ['0x00', '0x01', ['0x02']])
  })
  it('should turn a buffers into string', function () {
    assert.deepEqual(ethUtils.baToJSON(Buffer.from([0])), '0x00')
  })
})

var echash = Buffer.from('82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28', 'hex')
var ecprivkey = Buffer.from('3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1', 'hex')

describe('ecsign', function () {
  it('should produce a signature', function () {
    var sig = ethUtils.ecsign(echash, ecprivkey)
    assert.deepEqual(sig.r, Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex'))
    assert.deepEqual(sig.s, Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex'))
    assert.equal(sig.v, 27)
  })
})

describe('ecrecover', function () {
  it('should recover a public key', function () {
    var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    var pubkey = ethUtils.ecrecover(echash, 27, r, s)
    assert.deepEqual(pubkey, ethUtils.privateToPublic(ecprivkey))
  })
  it('should fail on an invalid signature (v = 21)', function () {
    var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.throws(function () {
      ethUtils.ecrecover(echash, 21, r, s)
    })
  })
  it('should fail on an invalid signature (v = 29)', function () {
    var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.throws(function () {
      ethUtils.ecrecover(echash, 29, r, s)
    })
  })
  it('should fail on an invalid signature (swapped points)', function () {
    var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.throws(function () {
      ethUtils.ecrecover(echash, 27, s, r)
    })
  })
})

describe('hashPersonalMessage', function () {
  it('should produce a deterministic hash', function () {
    var h = ethUtils.hashPersonalMessage(Buffer.from('Hello world'))
    assert.deepEqual(h, Buffer.from('8144a6fa26be252b86456491fbcd43c1de7e022241845ffea1c3df066f7cfede', 'hex'))
  })
})

describe('isValidSignature', function () {
  it('should fail on an invalid signature (shorter r))', function () {
    var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1ab', 'hex')
    var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.equal(ethUtils.isValidSignature(27, r, s), false)
  })
  it('should fail on an invalid signature (shorter s))', function () {
    var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca', 'hex')
    assert.equal(ethUtils.isValidSignature(27, r, s), false)
  })
  it('should fail on an invalid signature (v = 21)', function () {
    var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.equal(ethUtils.isValidSignature(21, r, s), false)
  })
  it('should fail on an invalid signature (v = 29)', function () {
    var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.equal(ethUtils.isValidSignature(29, r, s), false)
  })
  it('should work otherwise', function () {
    var r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    var s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.equal(ethUtils.isValidSignature(27, r, s), true)
  })
  // FIXME: add homestead test
})

var checksumAddresses = [
  '0x6CAfc374c496cdB2bB865288E4aA1e86EE9bf534',
  '0x641aCb18016A60C78f322fc61003eb399954067B',
  '0xaBeB78B850B6CFFc685Df6c10EfC503f5EaC2f3a',
  '0x51c3f7D52256048086ec41658671b29dbD41Fab3',
  '0xe43a96E9d52bF57162Ed3b30c1DC7c41C04E1948',
  '0x54DE1CA4747579e1833975cF054eAF8D9B0de99d',
  '0x6358F1654f00eA317A7e0ed6C80E4bae4539e122',
  '0xdd325b343887Ab6517a517f29e92cb23B9f12de7',
  '0xc8139F4a4b444e20c93aA857f6316b7935Aa24CB',
  '0xC1eCb653F222Fd5697A764AC38C45F87b37F63e6',
  '0x918656Dd12C6Cddc28083D236996cdB06f161Fbf',
]

describe('.toChecksumAddress()', function () {
  it('should work', function () {
    for (var i = 0; i < checksumAddresses.length; i++) {
      var tmp = checksumAddresses[i]
      assert.equal(ethUtils.toChecksumAddress(tmp.toLowerCase()), tmp)
    }
  })
})

describe('.isValidChecksumAddress()', function () {
  it('should return true', function () {
    for (var i = 0; i < checksumAddresses.length; i++) {
      assert.equal(ethUtils.isValidChecksumAddress(checksumAddresses[i]), true)
    }
  })
  it('should validate', function () {
    assert.equal(ethUtils.isValidChecksumAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6a'), false)
  })
})

describe('.isValidAddress()', function () {
  it('should return true', function () {
    assert.equal(ethUtils.isValidAddress('0x641aCb18016A60C78f322fc61003eb399954067B'), true)
    assert.equal(ethUtils.isValidAddress('0x918656Dd12C6Cddc28083D236996cdB06f161Fbf'), true)
  })
  it('should return false', function () {
    assert.equal(ethUtils.isValidAddress('2f015c60e0be116b1f0cd534704db9c92118fb6a'), false)
    assert.equal(ethUtils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6'), false)
    assert.equal(ethUtils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6aa'), false)
    assert.equal(ethUtils.isValidAddress('x2f015c60e0be116b1f0cd534704db9c92118fb6a'), false)
  })
})

describe('message sig', function () {
  const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
  const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')

  it('should return hex strings that the RPC can use', function () {
    assert.equal(ethUtils.toRpcSig(27, r, s), '0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca661b')
    assert.deepEqual(ethUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca661b'), {
      v: 27,
      r: r,
      s: s,
    })
    assert.deepEqual(ethUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca6600'), {
      v: 27,
      r: r,
      s: s,
    })
  })

  it('should throw on invalid length', function () {
    assert.throws(function () {
      ethUtils.fromRpcSig('')
    })
    assert.throws(function () {
      ethUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca660042')
    })
  })

  it('pad short r and s values', function () {
    assert.equal(ethUtils.toRpcSig(27, r.slice(20), s.slice(20)), '0x00000000000000000000000000000000000000004a1579cf389ef88b20a1abe90000000000000000000000000000000000000000326fa689f228040429e3ca661b')
  })

  it('should throw on invalid v value', function () {
    assert.throws(function () {
      ethUtils.toRpcSig(1, r, s)
    })
  })
})
