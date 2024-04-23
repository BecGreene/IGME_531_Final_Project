let canvas;
let ctx;

const yMargin = 20;

let minVal = 0;
let maxVal = 300;

let graphYRange;
let graphXUnit;
let xCount;

let data;

const init = () => {
    canvas = document.getElementById('soundGraph');
    ctx = canvas.getContext("2d");

    ///
    /// get data
    ///
    getData([100,150,90,20]);

    // create range and units for graph
    createRangeAndUnits();
    console.log(`min:${minVal}, max:${maxVal}, yRange:${graphYRange}, xUnit:${graphXUnit}, xCount${xCount}`);

    document.getElementById('button').addEventListener('click', () => {createSoundwave()});
}

const getData = (d) => {
    data = d;
}

const createRangeAndUnits = () => {
    let mnmx = getMaxMin(data)
    minVal = mnmx[0];
    maxVal = mnmx[1];
    let xCount = data.length;
    graphYRange = maxVal-minVal;
    graphXUnit = canvas.width / xCount;
}

const createSoundwave = () => {
    ctx.scale(1, -1); // Flip the canvas vertically

    for (let i = 0; i < data.length; i++) {
        const barHeight = (data[i] / (maxVal + yMargin)) * canvas.height;
        const flippedY = canvas.height - barHeight;
        ctx.fillRect(i * graphXUnit, flippedY, graphXUnit, barHeight);
    }
}

const getMaxMin = (data) => {
    let minMax = [data[0],data[0]];
    for (let i = 1; i < data.length; i++) {
        if (data[i] < minMax[0]) {
            minMax[0] = data[i];
        }
        else if (data[i] > minMax[1]) {
            minMax[1] = data[i];
        }
    }
    return minMax;
}

init();