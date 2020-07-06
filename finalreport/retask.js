function main(){
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    screen.init( volume, {
        width: window.innerWidth*0.7,
        height: window.innerHeight*0.5,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = document.getElementById("isovalue").value;
    var reflection_model = document.getElementById("reflection").value;
    var ka =  document.getElementById("ka").value;
    var kd =  document.getElementById("kd").value;
    var ks =  document.getElementById("ks").value;


    var surfaces = Isosurfaces( volume, isovalue, screen.camera, screen.light,reflection_model,ka,kd,ks);
    screen.scene.add( surfaces );

    var element = document.getElementById('change');
    element.addEventListener('click',function(){
        screen.scene.remove(surfaces);
        isovalue = document.getElementById("isovalue").value;
        var reflection_model = document.getElementById("reflection").value;
        var ka =  document.getElementById("ka").value;
        var kd =  document.getElementById("kd").value;
        var ks =  document.getElementById("ks").value;
        surfaces = Isosurfaces( volume, isovalue, screen.camera, screen.light, reflection_model,ka,kd,ks );
        screen.scene.add( surfaces );
        console.log(isovalue,reflection_model,ka,kd,ks);
    });

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth*0.7, window.innerHeight*0.5 ] );
    });

    screen.loop() 
}
