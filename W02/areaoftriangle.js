function AreaOfTriangle(v0,v1,v2){
    v1.substract( v0 );
    v2.substract( v0 );
    var ab=1.0*v1.norm2()*v2.norm2()-Math.pow(v1.inner(v2),2);
    ab=0.5*Math.pow(ab,0.5);
    return ab;
}