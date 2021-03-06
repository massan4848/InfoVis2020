KVS.THREEScreen=function(){
    this.height=this.width=0;
    this.trackball=this.renderer=this.light=this.camera=this.scene=void 0
};

KVS.THREEScreen.prototype={
    constructor:KVS.THREEScreen,init:function(a,c){
        void 0===c&&(c={});
        void 0===c.width&&(c.width=window.innerWidth);
        void 0===c.height&&(c.height=window.innerHeight);
        void 0===c.enableAutoResize&&(c.enableAutoResize=!0);
        void 0===c.targetDom&&(c.targetDom=document.body);
        this.width=c.width;
        this.height=c.height;
        var f=a.max_coord.clone().sub(a.min_coord).max(),d=a.objectCenter(),b=this.width/this.height,e=100*f;
        this.scene=new THREE.Scene;
        this.camera=new THREE.PerspectiveCamera(45,b,.1,e);
        this.camera.position.set(d.x,d.y,2*f);
        this.camera.up.set(0,1,0);
        this.scene.add(this.camera);
        this.light=new THREE.DirectionalLight(new THREE.Color("white"));
        this.light.position.copy(this.camera.position);
        this.scene.add(this.light);
        this.renderer=new THREE.WebGLRenderer;
        this.renderer.setSize(this.width,this.height);
        this.renderer.setClearColor(new THREE.Color(.828125,.86328125,.89453125));
        c.targetDom.appendChild(this.renderer.domElement);
        this.trackball=new THREE.TrackballControls(this.camera,
        this.renderer.domElement);
        this.trackball.staticMoving=!0;
        this.trackball.rotateSpeed=3;
        this.trackball.radius=Math.min(this.width,this.height);
        this.trackball.target=d;
        this.trackball.noRotate=!1;
        this.trackball.update();
        this.trackball.addEventListener("change",this.draw);
        c.enableAutoResize&&window.addEventListener("resize",this.resize.bind(this),!1)
    },
    resize:function(a){
        this.width=void 0===a?window.innerWidth:a[0];
        this.height=void 0===a?window.innerHeight:a[1];
        a=this.width/this.height;
        this.renderer.setSize(this.width,this.height);
    this.camera.aspect=a;
    this.camera.updateProjectionMatrix();
    this.trackball.handleResize();
    this.draw()
    },
    draw:function(){
        void 0!=this.renderer&&(this.trackball.handleResize(),this.renderer.render(this.scene,this.camera),this.trackball.update())
    },
    loop:function(){
        requestAnimationFrame(this.loop.bind(this));
        this.draw()
    }
};
KVS.ToTHREELine=function(a){
    var c=new THREE.Geometry,f=new THREE.LineBasicMaterial;
    f.linewidth=a.width;
    if(0==a.colors.length)f.color=new THREE.Color("white");
    else if(1==a.colors.length){
    var d=a.colors[0];
    f.color=new THREE.Color(d[0],d[1],d[2])
    }
    else if(a.colors.length==a.coords.length){
        f.vertexColors=THREE.VertexColors;
        for(var b=0;b<a.colors.length;b++)d=a.colors[b],c.colors.push(new THREE.Color(d[0],d[1],d[2]))
        }
    else f.vertexColors=THREE.FaceColors,console.log("Not supported.");
    d=a.coords.length;
    for(b=0;b<d;b++){
        var e=(new THREE.Vector3).fromArray(a.coords[b]);
        c.vertices.push(e)
    }
return new THREE.Line(c,f,a.line_type==KVS.StripLine?THREE.LineStrip:THREE.LinePieces)
};
KVS.ToTHREEMesh=function(a){
    var c=new THREE.Geometry,f=new THREE.MeshLambertMaterial;
    f.side=THREE.DoubleSide;
    for(var d=a.connections.length,b=0;b<d; b++){
        var e=a.connections[b];
        c.faces.push(new THREE.Face3(e[0],e[1],e[2]))
    }
    if(0==a.colors.length)f.color=new THREE.Color("white");
    else if(1==a.colors.length)e=a.colors[0],f.color=new THREE.Color(e[0],e[1],e[2]);
    else if(a.colors.length==a.coords.length)for(f.vertexColors=THREE.VertexColors,b=0;b<d;b++){
        var e=a.colors[c.faces[b].a],g=a.colors[c.faces[b].b],
        h=a.colors[c.faces[b].c];
        c.faces[b].vertexColors.push(new THREE.Color(e[0],e[1],e[2]));
        c.faces[b].vertexColors.push(new THREE.Color(g[0],g[1],g[2]));
        c.faces[b].vertexColors.push(new THREE.Color(h[0],h[1],h[2]))
    }
    else if(a.colors.length==a.connections.length)for(f.vertexColors=THREE.FaceColors,b=0;b<d;b++)e=a.colors[b],c.faces[b].color=new THREE.Color(e[0],e[1],e[2]);
    d=a.numberOfVertices();
    for(b=0;b<d;b++)e=(new THREE.Vector3).fromArray(a.coords[b]),c.vertices.push(e);
        c.computeFaceNormals();
        c.computeVertexNormals();

    return new THREE.Mesh(c,f)
};
KVS.ToTHREEParticleSystem=function(a){
    THREE.ShaderLib.particle_basic.fragmentShader=[
    THREE.ShaderChunk.logdepthbuf_fragment,THREE.ShaderChunk.map_particle_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n");
    var c=new THREE.Geometry,f=new THREE.ParticleSystemMaterial;
    f.size=a.size;
    if(0==a.colors.length)f.color=new THREE.Color("white");
    else if(1==a.colors.length){var d=a.colors[0];
    f.color=new THREE.Color(d[0],d[1],d[2])}else{
        f.vertexColors=!0;
        for(var b=0;b<a.colors.length;b++)d=a.colors[b],c.colors.push(new THREE.Color(d[0],d[1],d[2]))
    }
    d=a.coords.length;
    for(b=0;b<d;b++){var e=(new THREE.Vector3).fromArray(a.coords[b]);
    c.vertices.push(e)}return new THREE.ParticleSystem(c,f)
};
