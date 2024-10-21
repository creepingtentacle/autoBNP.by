// Utilities
var Vector3 = {};
var Matrix44 = {};

Vector3.create = function(x, y, z) {
    return {'x': x, 'y': y, 'z': z};
};

Vector3.dot = function(v0, v1) {
    return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
};

Vector3.cross = function(v, v0, v1) {
    v.x = v0.y * v1.z - v0.z * v1.y;
    v.y = v0.z * v1.x - v0.x * v1.z;
    v.z = v0.x * v1.y - v0.y * v1.x;
};

Vector3.normalize = function(v) {
    var l = v.x * v.x + v.y * v.y + v.z * v.z;
    if (l > 0.00001) {
        l = 1.0 / Math.sqrt(l);
        v.x *= l;
        v.y *= l;
        v.z *= l;
    }
};

Vector3.arrayForm = function(v) {
    if (v.array) {
        v.array[0] = v.x;
        v.array[1] = v.y;
        v.array[2] = v.z;
    } else {
        v.array = new Float32Array([v.x, v.y, v.z]);
    }
    return v.array;
};

// Initialize WebGL and shaders
function initWebGL() {
    var canvas = document.getElementById('sakura');
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        return;
    }

    // Setup WebGL state
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var vertexShader = getShader(gl, "sakura_point_vsh");
    var fragmentShader = getShader(gl, "sakura_point_fsh");

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
        return;
    }

    gl.useProgram(shaderProgram);

    // Bind vertex buffer
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var vertices = new Float32Array([
        -0.5,  0.5, 0.0,
        -0.5, -0.5, 0.0,
         0.5,  0.5, 0.0,
         0.5, -0.5, 0.0
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var vertexPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.enableVertexAttribArray(vertexPosition);
    gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);

    // Draw the scene
    function drawScene() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(drawScene);
    }

    drawScene();
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var theSource = "";
    var currentChild = shaderScript.firstChild;

    while(currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
            theSource += currentChild.textContent;
        }
        currentChild = currentChild.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x_vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else if (shaderScript.type == "x-shader/x_fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, theSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

// Start the animation
function startAnimation() {
    initWebGL();
}

document.addEventListener('DOMContentLoaded', startAnimation);
