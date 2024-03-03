"use client";

import * as d3 from "d3";
import { useEffect } from "react";

export default function Graph() {
  useEffect(() => {
    var width = 300,
      height = 300;
    var nodes = [{}, {}, {}, {}, {}];

    var simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", () => {});
  }, []);

  return <div>hello world</div>;
}
