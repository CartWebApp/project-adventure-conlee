const windowWidth = window.innerWidth;
const windowHight = window.innerHeight;



// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: windowWidth,
        height: windowHight,
        pixelRatio: 3,
        background: '#fafafa',
        wireframeBackground: '#222',
        hasBounds: true,
        enabled: true,
        wireframes: true,
        showSleeping: true,
        showDebug: true,
        showBroadphase: true,
        showBounds: true,
        showVelocity: true,
        showCollisions: true,
        showSeparations: true,
        showAxes: true,
        showPositions: true,
        showAngleIndicator: true,
        showIds: true,
        showShadows: true,
        showVertexNumbers: true,
        showConvexHulls: true,
        showInternalEdges: true,
        showMousePosition: false
    }
});


// create two boxes and a ground
function dynamicBox(X, Y, W, H) {
    const DynamicBox = Bodies.rectangle(X, Y, W, H);
    return DynamicBox
}
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 90, 80);
const boxC = dynamicBox(100, 100, 100, 100)
const ground = Bodies.rectangle(400, 800, 1000, 1, { isStatic: true });
const mouseBox = Bodies.rectangle(0, 0, 10, 10);

// add all of the bodies to the world
// do NOT directly add a dynamicBox() element to this, it is UNSTABLE
Composite.add(engine.world, [boxA, boxB, boxC, ground]);

const mouse = Mouse.create(render.canvas)

const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {
            visible:true
        }
    }
});

Composite.add(engine.world, mouseConstraint);

// run the renderer
Render.run(render);

render.mouse = mouse;
// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);