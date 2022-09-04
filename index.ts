/**
 * Technical Assignment
 *
 * 1. Override the canvas renderers for node labels and hover.
 *    So that the labels would be centred under the nodes, no shadow, the label text would be white
 *    on green background and there would be a green stroke around the node.
 *
 * 2. Override the NodeProgramBorder webGL program and shaders, so that the nodes of the type `border`
 *    would render as filled circles with red donut around them.
 *
 *    The nodes of the type `border` would render as filled circles with red donut around them.
 *    The donut grows according to an attribute of the node with the name `donut`.
 *    It has a numeric value from 0 to 1, which determines the angle (0 - no donut, 1 - full circle).
 *    The donut is filled clockwise, e.g. for donut = 0.25 a 90 deg angle between 12 and 3 will be filled.
 */

import Graph from "graphology";
import Sigma from "sigma";

import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import NodeProgramBorder from "./custom-renderers/webgl/programs/node.border";
import drawLabel, { drawHover } from "./custom-renderers/canvas/canvas-utils";

import ForceSupervisor from "graphology-layout-force/worker";

const container = document.getElementById("sigma-container") as HTMLElement;

const graph = new Graph();

const RED = "rgba(168,0,39,0.91)";
const BLUE = "#0b55a8";
const GREY_BLUE = "#366596";

// test data
graph.addNode("John", { size: 25, label: "John", type: "image", image: "./user.svg", color: RED });
graph.addNode("Mary", { size: 25, label: "Mary", type: "image", image: "./user.svg", color: RED });
graph.addNode("Suzan", { size: 25, label: "Suzan", type: "image", image: "./user.svg", color: RED });
graph.addNode("Nantes", { size: 25, label: "Nantes", type: "image", image: "./city.svg", color: BLUE });
graph.addNode("New-York", { size: 25, label: "New-York", type: "image", image: "./city.svg", color: BLUE });

// nodes rendered with the custom NodeProgramBorder
graph.addNode("Sushi", { size: 25, label: "Sushi", type: "border", color: GREY_BLUE, donut: 0.2 });
graph.addNode("Falafels", { size: 15, label: "Falafels", type: "border", color: GREY_BLUE, donut: 0.1 });
graph.addNode("Chicken Vindaloo", {
  size: 35,
  label: "Chicken Vindaloo",
  type: "border",
  color: GREY_BLUE,
  donut: 0.85,
});

// edges
graph.addEdge("John", "Mary", { type: "line", label: "works with", size: 5 });
graph.addEdge("Mary", "Suzan", { type: "line", label: "works with", size: 5 });
graph.addEdge("Mary", "Nantes", { type: "arrow", label: "lives in", size: 5 });
graph.addEdge("John", "New-York", { type: "arrow", label: "lives in", size: 5 });
graph.addEdge("Suzan", "New-York", { type: "arrow", label: "lives in", size: 5 });
graph.addEdge("John", "Falafels", { type: "arrow", label: "eats", size: 5 });
graph.addEdge("Mary", "Chicken Vindaloo", { type: "arrow", label: "eats", size: 5 });
graph.addEdge("Suzan", "Sushi", { type: "arrow", label: "eats", size: 5 });

// set initial positions
graph.nodes().forEach((node, i) => {
  const angle = (i * 2 * Math.PI) / graph.order;
  graph.setNodeAttribute(node, "x", 100 * Math.cos(angle));
  graph.setNodeAttribute(node, "y", 100 * Math.sin(angle));
});

// init the graph visualisation
const renderer = new Sigma(graph, container, {
  nodeProgramClasses: {
    image: getNodeProgramImage(),
    border: NodeProgramBorder, // << here sigma is using your custom renderer (TA part 2)
  },
  renderEdgeLabels: true,
  stagePadding: 48,
  labelRenderer: drawLabel,
  hoverRenderer: drawHover,
  // << add custom canvas rendering for labels and hover (TA part 1)
});

renderer.on("afterRender", () => {
  console.log("afterRender finished");
  // update position from the viewport
});

// Create the spring layout, start it and stop it
const layout = new ForceSupervisor(graph);
layout.start();
setTimeout(() => {
  layout.stop();
}, 2000);
