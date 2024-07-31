const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
myCache.set( 123, "first" )
myCache.set( 2, "first" )
myCache.set( 3, "first" )
myCache.set( 4, "first" )
myCache.set( 13, "first" )


myCache.set( 123, "ttttttt" )
value = myCache.mget( [ 123] );
console.log(Object.values(value))