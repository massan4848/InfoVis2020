function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 8 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1,  1, 0 ],  // v0
        [ -1, -1, 0 ],  // v1
        [  1, -1, 0 ],  // v2
        [  1,  1, 0 ],  // v3    
        [ -1,  1, -2 ], // v4
        [ -1, -1, -2 ], // v5
        [  1, -1, -2 ], // v6
        [  1,  1, -2 ]  // v7
    ];

    // clockwise rotation is back.
    var faces = [
        [0,1,2],
        [3,0,2],
        [3,2,6],
        [7,3,6],
        [7,6,5],
        [4,7,5],
        [4,5,1],
        [0,4,1],
        [4,0,3],
        [7,4,3],
        [1,5,6],
        [2,1,6]
    ];
    var vnum = new Array();
    for(var i=0;i<8;i++){
         vnum.push(new THREE.Vector3().fromArray( vertices[i] ));
    }

    var fnum = new Array();
    for(var i=0;i<12;i++){
        var id = faces[i];
        fnum.push(new THREE.Face3( id[0], id[1], id[2] ));
    }

    var geometry = new THREE.Geometry();
    for(var i=0;i<8;i++){
        geometry.vertices.push( vnum[i] );        
   }
   for(var i=0;i<12;i++){
        geometry.faces.push( fnum[i] );
   }

    //    var material = new THREE.MeshBasicMaterial();
    var material = new THREE.MeshLambertMaterial();
    material.vertexColors = THREE.FaceColors;
    for(var i=0;i<12;i++){
        if(i%2==0)geometry.faces[i].color = new THREE.Color( 1, 0, 0 );
        else geometry.faces[i].color = new THREE.Color( 0, 1, 0 );
    }

    geometry.computeFaceNormals();
    material.side = THREE.FrontSide;

    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        triangle.rotation.x += 0.004;
        triangle.rotation.y += 0.008;
        renderer.render( scene, camera );
    }
}
