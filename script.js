// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.8);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight / 1.3;
  var figureMarginTop = (window.innerHeight - figureHeight) / 5;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
let current = 0; // index of the visible image
const images = d3.selectAll("figure img").nodes();

function handleStepEnter(response) {
  // highlight step
  step.classed("is-active", (d, i) => i === response.index);

  const next = response.index; // index of the new image

  images.forEach((img, i) => {
    img.style.opacity = i === next ? 1 : 0;
  });

  current = next;
}

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.25,
      debug: false,
    })
    .onStepEnter(handleStepEnter);
}

// kick things off
init();
