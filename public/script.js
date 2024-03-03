async function main() {
  const res = await fetch("http://localhost:3000/api/getData/");
  const d = await res.json();

  const data = {
    nodes: [],
    links: [],
  };

  const uniqueNodes = new Set();
  d.forEach((item) => {
    for (const tag of item.tags) {
      uniqueNodes.add(tag);
    }
  });

  const uniqueLinks = new Set();
  d.forEach((item) => {
    for (let i = 0; i < item.tags.length; i++) {
      for (let j = 0; j < item.tags.length; j++) {
        if (i === j) {
          continue;
        }
        uniqueLinks.add({
          source: item.tags[i],
          target: item.tags[j],
          value: 1,
        });
      }
    }
  });

  data.nodes = Array.from(uniqueNodes).map((tag) => ({ id: tag }));
  data.links = Array.from(uniqueLinks);

  // Specify the dimensions of the chart.
  const container = document.querySelector("#container");
  if (!container) {
    throw new Error("No container found");
  }
  const width = container.clientWidth;
  const height = container.clientHeight;

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links = data.links.map((d) => ({ ...d }));
  const nodes = data.nodes.map((d) => ({ ...d }));

  // Create a simulation with several forces.
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add a line for each link, and a circle for each node.
  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll()
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value));

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1)
    .selectAll()
    .data(nodes)
    .join("circle")
    .attr("r", 7)
    .on("mouseover", (event, d) => {});

  node.append("title").text((d) => "hello");

  // Add a drag behavior.
  node.call(
    d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
  );

  // Set the position attributes of links and nodes each time the simulation ticks.
  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  }

  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  container.append(svg.node());
}

main();
