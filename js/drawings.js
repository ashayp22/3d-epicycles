function getCube() {
    let temp = [
        {x: 0, y: 0, z: 0},
        {x: 1, y: 0, z: 0},
        {x: 1, y: 1, z: 0},
        {x: 0, y: 1, z: 0},
        {x: 0, y: 0, z: 0},
        {x: 0, y: 0, z: 1},
        {x: 1, y: 0, z: 1},
        {x: 1, y: 0, z: 0},
        {x: 1, y: 0, z: 1},
    
        {x: 1, y: 1, z: 1},
        {x: 1, y: 1, z: 0},
        {x: 1, y: 1, z: 1},
    
        {x: 0, y: 1, z: 1},
        {x: 0, y: 1, z: 0},
        {x: 0, y: 1, z: 1},
        {x: 0, y: 0, z: 1},
    ]
    
    let drawing = []
    
    for(let size = 10; size <= 350; size += 10) {
        for(let i = 0; i < temp.length; i += 1) {
            drawing.push({x: temp[i].x*size, y: temp[i].y*size, z: temp[i].z*size});
        }
    }

    return drawing;
}

function getSphere() {
    var drawing = []

    let r = 100;
    
    for(var s = 0; s <= Math.PI; s += 0.2) {
        for(var t = 0; t <= 2 * Math.PI; t += 0.2) {
            drawing.push({x: r * Math.sin(s) * Math.cos(t), z: r * Math.sin(s) * Math.sin(t), y: r * Math.cos(s)})
        }
    }

    return drawing;
}

function getCylinder() {
    var drawing = []

    let r = 100;
    
    for(var s = 0; s <= 150; s += 10) {
        for(var t = 0; t <= 2 * Math.PI; t += 0.2) {
            drawing.push({x: r * Math.cos(t), y: s, z: r * Math.sin(t)})
        }
    }
    
    return drawing;
}

function getCone() {
    var drawing = []

    let s = Math.PI/4;
    
    for(var r = 0; r <= 150; r += 10) {
        for(var t = 0; t <= 2 * Math.PI; t += 0.2) {
            drawing.push({x: r * Math.sin(s) * Math.cos(t), y: r * Math.cos(s), z: r * Math.sin(s) * Math.sin(t)})
        }
    }
    return drawing;    
}

function getEgg() {
    var drawing = []

    let r = 100;
    
    for(var s = 0; s <= Math.PI; s += 0.2) {
        for(var t = 0; t <= 2 * Math.PI; t += 0.2) {
            drawing.push({x: 2*r * Math.sin(s) * Math.cos(t), z: 5*r * Math.sin(s) * Math.sin(t), y: 3*r * Math.cos(s)})
        }
    }

    return drawing;  
}

function getIceCream() {
    var drawing = []


    //cone
    var s = Math.PI/8;
    
    for(var r = 0; r <= 150; r += 10) {
        for(var t = 0; t <= 2 * Math.PI; t += 0.1) {
            drawing.push({x: r * Math.sin(s) * Math.cos(t), y: r * Math.cos(s), z: r * Math.sin(s) * Math.sin(t)})
        }
    }
    
    //scoops

    r = 150*Math.sin(Math.PI/8);
    let height = 150*Math.cos(Math.PI/8);

    for(s = 0; s <= Math.PI/2; s += 0.2) {
        for(var t = 0; t <= 2 * Math.PI; t += 0.2) {
            drawing.push({x: r * Math.sin(s) * Math.cos(t), y: r * Math.cos(s) + height, z: r * Math.sin(s) * Math.sin(t)})
        }
    }

    for(s = 0; s <= Math.PI; s += 0.2) {
        for(var t = 0; t <= 2 * Math.PI; t += 0.2) {
            drawing.push({x: r * Math.sin(s) * Math.cos(t), y: r * Math.cos(s) + height + 2 * r, z: r * Math.sin(s) * Math.sin(t)})
        }
    }
    
    return drawing;  
}



function getFunky() {
    var drawing = []

    for(var s = 0; s <= Math.PI; s += 0.15) {
        for(var t = 0; t <= 2 * Math.PI; t += 0.15) {
    
            let r = Math.cos(4*s)* Math.sin(2*t) + 2;
            r *= 100;
    
            drawing.push({z: r * Math.sin(s) * Math.cos(t), x: r * Math.sin(s) * Math.sin(t), y: r * Math.cos(s)})
        }
    }
    
    return drawing;
}

function getFlower() {
    var drawing = []

    for(var s = 0; s <= Math.PI/2; s += 0.1) {
        for(var t = 0; t <= 2 * Math.PI; t += 0.1) {
    
            let r = 150*(1 - Math.sin(16*s)) + 50*(1 - Math.cos(4*t));
    
            drawing.push({z: r * Math.sin(s) * Math.cos(t), x: r * Math.sin(s) * Math.sin(t), y: r * Math.cos(s)})
        }
    }
    
    return drawing;
}

function getPenguin() {
    let drawing = []

    for(let z = 0; z < 3; z += 1) {
        for(let i = 0; i < penguin.length; i += 1) {
            drawing.push({x: penguin[i].x - 200, y: -penguin[i].y + 400, z: z*10})
        }
    }

    return drawing;
}

function getLion() {
    let drawing = []

    for(let z = 0; z < 3; z += 1) {
        for(let i = 0; i < lion.length; i += 1) {
            drawing.push({x: lion[i].x - 400, y: (-lion[i].y ) + 400, z: z*10})
        }
    }

    return drawing;
}


function getDragon() {
    let drawing = []

    for(let z = 0; z < 4; z += 1) {
        for(let i = 0; i < dragon.length; i += 1) {
            drawing.push({x: dragon[i].x - 200, y: -dragon[i].y + 400, z: z*10})
        }
    }

    return drawing;
}


function getDog() {
    let drawing = []

    for(let z = 0; z < 4; z += 1) {
        for(let i = 0; i < dog.length; i += 1) {
            drawing.push({x: dog[i].x - 300, y: -dog[i].y + 300, z: z*10})
        }
    }

    return drawing;
}

function getFish() {
    let drawing = []

    let mult = 100;

    for(var s = 0; s <= 4; s += 0.1) {
        for(var t = 0; t <= 2 * Math.PI; t += 0.2) {
    
            let r = (0.1 + Math.abs((0.7 - s)))*(Math.sqrt(16 - Math.pow(s, 2))/5)*(1 + Math.pow(Math.E, -s));    
            drawing.push({x: mult*s, y: mult*r * Math.cos(t), z: mult*(r / 2)*Math.sin(t)})
        }
    }

    drawing.pop()

    return drawing;
}



function getDrawing(drawingType) {
    switch (drawingType) {
        case "cube":
          return getCube()  
        case "sphere":
            return getSphere() 
        case "cylinder":
            return getCylinder() 
        case "cone":
            return getCone() 
        case "egg":
            return getEgg()
        case "fish":
            return getFish()
        case "funky":
            return getFunky()
        case "icecream":
            return getIceCream() 
        case "flower":
            return getFlower() 
        case "penguin":
            return getPenguin() 
        case "lion":
            return getLion() 
        case "dragon":
            return getDragon() 
        case "dog":
            return getDog() 
        default:
            return getCube() 

    }
}