function echoIf(cond, msgIfTrue, msgIfFalse) {
	return cond ? msgIfTrue : msgIfFalse;
}
exports.echoIf = echoIf;

function dfltBool(input, dflt) {
	return ('boolean' == typeof input) ? input : dflt;
}
exports.dfltBool = dfltBool;