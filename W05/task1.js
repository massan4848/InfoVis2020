function main(vert_shader,frag_shader,reflection_model,target_dom)
{   if(target_dom === undefined) target_dom = document.body;

    var width = 250;
    var height = 250;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    target_dom.appendChild( renderer.domElement );

    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: vert_shader,
        fragmentShader: frag_shader,
        defines:{
            Lambert: reflection_model == "Lambert",
            Phong : reflection_model == "Phong"
        },
        uniforms :{
            light_position :{type : 'v3', value : light.position},
            camera_position :{type : 'v3', value : camera.position},
        }
    });

    var torus_knot = new THREE.Mesh( geometry, material );
    scene.add( torus_knot );
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot.rotation.x += 0.01;
        torus_knot.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
