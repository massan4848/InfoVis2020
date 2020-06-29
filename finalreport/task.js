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
    var select = document.getElementById("reflection");

    var surfaces = Isosurfaces( volume, isovalue, screen.camera, screen.light );
    screen.scene.add( surfaces );

    var element = document.getElementById('change-isovalue');
    element.addEventListener('click',function(){
        screen.scene.remove(surfaces);
        isovalue = document.getElementById("isovalue").value;
        reflection_model = document.getElementById("reflection").value;
        surfaces = Isosurfaces( volume, isovalue, screen.camera, screen.light, reflection_model );
        screen.scene.add( surfaces );
        console.log(isovalue);
    });

    select.addEventListener('change',function(){
        screen.scene.remove(surfaces);
        reflection_model = document.getElementById("reflection").value;
        surfaces = Isosurfaces( volume, isovalue, screen.camera, screen.light, reflection_model );
        screen.scene.add( surfaces );
        console.log(-1);
    });



    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth*0.7, window.innerHeight*0.5 ] );
    });

    screen.loop() 
}
