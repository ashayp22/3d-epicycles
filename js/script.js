var points = []; //the points of the 3D object
let time = 0; //time
var fourierX; //circles for x coordinate
var fourierY; //circles for y coordinate
var fourierZ; //circles for z coordinate
var xCircles = [] //3D epicycles
var yCircles = [] //3D epicycles
var zCircles = [] //3D epicycles

var a; //animation
var currentDrawing = "cube";

//lines connecting the epicycles to the 3D object being drawn
var line1;
var line2;
var line3;

//set up stuff
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 10000 ); //https://threejs.org/docs/#api/en/cameras/PerspectiveCamera

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth * 0.85, window.innerHeight * 0.75 );
document.getElementById('fourier').appendChild( renderer.domElement );

camera.position.z = -1495;
camera.position.y = 1012;
camera.position.x = -1300;

//allow you to zoom in and out, move camera - //http://stemkoski.github.io/Three.js/Outline.html
var controls = new THREE.OrbitControls( camera, renderer.domElement );

//how much to move when doing WASD
const changeCameraPos = 10;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;

    //moving camera around
    if (keyCode == 87) { //w
        camera.translateZ(-changeCameraPos)
    } else if (keyCode == 83) { //s
        camera.translateZ(changeCameraPos)
    } else if (keyCode == 65) { //a
        camera.position.x -= changeCameraPos;
    } else if (keyCode == 68) { //d
        camera.position.x += changeCameraPos;
    } else if(keyCode == 82) { //r
        //restart drawing
        cancelAnimationFrame( a );
        clearScene();
        renderer.render( scene, camera );
        changeDrawing(currentDrawing);
        animate();
    }
};

//removes everything from the scene
function clearScene() {
    for( var i = scene.children.length - 1; i >= 0; i--) { 
        obj = scene.children[i];
        scene.remove(obj); 
   }
}

//draws a line on the screen
function drawLine(startX, startY, startZ, endX, endY, endZ, lineColor) {

    var points = [];
    points.push( new THREE.Vector3( startX, startY, startZ ));
    points.push( new THREE.Vector3( endX, endY, endZ ));
                                                                       
    let lineMaterial = new THREE.MeshBasicMaterial( { color: lineColor } );
    const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
    var line = new THREE.Line( lineGeometry, lineMaterial );

    scene.add( line );

    return line;
}

//updates the position of a line
function updateLine(line, startX, startY, startZ, endX, endY, endZ) {
    let newPositions = [startX, startY, startZ, endX, endY, endZ];

    //updates positions
    var positions = line.geometry.attributes.position.array; //all positions returned in array, indices 0-2 are first point, 3-5 second point, etc
    for(var i = 0; i < 6; i++) {
        positions[i] = newPositions[i]
    }

    line.geometry.attributes.position.needsUpdate = true; // required after the first render
}

//draws a circle on the screen
function drawCircle(radius, x, y, z, yRotation) {
    var geometry = new THREE.CircleGeometry( radius, 32 );
    var circleMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } ); //color same as the background
    var circle = new THREE.Mesh( geometry, circleMaterial );
    circle.rotation.y = yRotation;
    circle.position.set(x, y, z);
    scene.add( circle );

    //https://stackoverflow.com/questions/41031214/javascript-threejs-3d-draw-solid-cubic-with-border
    //Adds a border
    var geo = new THREE.EdgesGeometry( circle.geometry );
    var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 50 } );
    var wireframe = new THREE.LineSegments( geo, mat );
    wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
    circle.add( wireframe );

    return circle;

}

//plots a shape on the screen
function plotShape(type) {

    loaded = loadDrawing(type); //the array of points
    let x = loaded.x;
    let y = loaded.y;
    let z = loaded.z;

    //draw a line connecting adjacent points in loaded
    for(let i = 1; i < x.length; i++) {
        drawLine(x[i-1], y[i-1], z[i-1], x[i], y[i], z[i], 0xffff00)
    }

    animate();
}

//creates epicycles 
function epiCycles(x, y, rotation, fourier, circles, isZ) {

    for(let i = 0; i < fourier.length; i++) {

        //for drawing the ellipse
        let prevx = x;
        let prevy = y;

        //get Discrete Fourier Transform Data
        let frequency = fourier[i].frequency;
        let radius = fourier[i].amplitude;
        let phase = fourier[i].phase;

        //need to add Pi/2 (90 degrees) to not start at theta = 0;
        x += radius * Math.cos(frequency * time + phase + rotation );
        y += radius * Math.sin(frequency * time + phase + rotation);

        //draws circle
        if(isZ) {
            circles[i].position.set(-300, prevy, prevx) //for Z fourier transform, the x coordinate becomes the z coordinate
        } else {
            circles[i].position.set(prevx, prevy, 0)
        }

        //draws a line from center of circle to edge
    }

    return {x: x, y: y};
}


function draw3D() {
    //draw until we have reached the beginning
    if(time <= Math.PI*2) {
        //need two rotating epicycle systems. One controls x and the other controls the y.
        let vectorX = epiCycles(-300, -200, 0, fourierX, xCircles, false);
        let vectorY = epiCycles(200, 300, Math.PI/2, fourierY, yCircles, false);
        let vectorZ = epiCycles(-400, -200, 0, fourierZ, zCircles, true);

        //create the new point from the 3 epicycle systems
        let vectorCombined = {x: vectorX.x, y: vectorY.y, z: vectorZ.x}

        //push to front of wave array
        points.push(vectorCombined);

        //update the line connecting the epicycle to the thing being drawn
        updateLine(line1, vectorX.x,vectorX.y, 0, vectorCombined.x, vectorCombined.y, vectorCombined.z)
        updateLine(line2, vectorY.x,vectorY.y, 0, vectorCombined.x, vectorCombined.y, vectorCombined.z)
        updateLine(line3, -300 ,vectorZ.y, vectorZ.x, vectorCombined.x, vectorCombined.y, vectorCombined.z)

        //draw the new part of the path
        if(points.length >= 2) {
            let end = points.length-1;
            drawLine(points[end-1].x, points[end-1].y, points[end-1].z, points[end].x, points[end].y, points[end].z, 0xffff00)
        }

        //every time step, we move onto the next point. Increasing or decreasing this value messes up the 3D drawing.
        const dt = Math.PI*2 / fourierY.length;
        //increase time
        time += dt;
    }
}

const animate = function () {
    a = requestAnimationFrame( animate );

    //one time step fror drawing the shape
    draw3D();
    
    controls.update();
    renderer.render( scene, camera );
};

//MAIN CODE


function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + 1;
}

//changes the current object being drawn
function changeDrawing(type) {
    //clear everything
    cancelAnimationFrame( a );
    clearScene();

    //update the website to show the new object being drawn
    let buttons = document.getElementsByClassName("button");
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "#fdfd92";
        buttons[i].style.borderColor = "#fdfd92";
    }

    document.getElementById(type).style.backgroundColor = "#fdcb92"
    document.getElementById(type).style.borderColor = "#fdcb92";

    //set the current drawing
    currentDrawing = type;
    
    //load the points for this drawing
    loaded = loadDrawing(currentDrawing);

    //apply the fourier transform
    applyFourier(loaded.x, loaded.y, loaded.z);

    //start animation
    animate();
}

function loadDrawing(type) {
    const skip = 1;

    //reset points and time
    points = []; //the points of the 3D object
    time = 0; //time

    //get the drawing 
    let drawing = getDrawing(type);

    var x = []; //x coordinates for the points
    var y = []; //y coordinates for the points
    var z = []; //z coordinates for the points

    //split up into components
    for(let i = 0; i < drawing.length; i += skip) {
        x.push(drawing[i].x);
        y.push(drawing[i].y); //since processing is weird and uses wierd numberline
        z.push(drawing[i].z);
    }

    return {x, y, z}
}

function applyFourier(x, y, z) {
    //run discrete fourier transform on an array of values
    fourierX = dft(x);
    fourierY = dft(y);
    fourierZ = dft(z);

    //sort based on amplitude
    fourierX.sort((a, b) => b.amplitude - a.amplitude);
    fourierY.sort((a, b) => b.amplitude - a.amplitude);
    fourierZ.sort((a, b) => b.amplitude - a.amplitude);

    xCircles = [] //3D epicycles
    yCircles = [] //3D epicycles
    zCircles = [] //3D epicycles

    for(let i = 0; i < fourierX.length; i++) {
        xCircles.push(drawCircle(fourierX[i].amplitude, 0, 0, 0, 0))
    }

    for(let i = 0; i < fourierY.length; i++) {
        yCircles.push(drawCircle(fourierY[i].amplitude, 0, 0, 0, 0))
    }

    for(let i = 0; i < fourierZ.length; i++) {
        zCircles.push(drawCircle(fourierZ[i].amplitude, 0, 0, 0, Math.PI / 2)) //The z epicycles are rotated 90 degrees
    }

    //lines connecting the epicycles to the current point being drawn
    line1 = drawLine(0, 0, 0, 10, 10, 0, 0xffffff)
    line2 = drawLine(0, 0, 0, 10, 10, 0, 0xffffff)
    line3 = drawLine(0, 0, 0, 10, 10, 0, 0xffffff)

    //Plot a 3D axis for debugging
    // const axesHelper = new THREE.AxesHelper( 500 );
    // axesHelper.translateX(-300);
    // axesHelper.translateY(300);
    // axesHelper.translateZ(-400);
    // scene.add( axesHelper );
}

changeDrawing(currentDrawing);
// plotShape(currentDrawing);