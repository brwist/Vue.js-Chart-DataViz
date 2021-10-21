import * as d3 from "d3";

function Histogram(params) {
  initPatternify();

  const attrs = Object.assign(
    {
      container: "body",
      width: 400,
      height: 400,
      margin: {
        top: 15,
        right: 35,
        bottom: 35,
        left: 15,
      },
      data: {},
      xField: "bound",
      yField: "frequency",
      tooltipHTML: (d, ind) => {
        const bin = d.bins[ind];
        return `
          <div class="tooltip">
            <h5>${d.startDate} to ${d.endDate}</h5>
            <div>frequency: ${bin.frequency}</div>
            <div>count: ${bin.count}</div>
            <div>bound: ${bin.bound}</div>
          </div>
        `;
      },
    },
    params || {}
  );

  const lineColor = "#fff";
  const zTranslation = 15;

  let container, chartWidth, chartHeight, svg, chart;
  let data, xScale, yScale, yScaleGlobal, zScale, line, area, tooltip;

  function main() {
    container = d3.select(attrs.container);

    if (container.empty()) {
      throw new Error("container does not exist!");
    }

    transformData();
    setDimensions();
    setScales();

    drawContainers();
    drawAxes();
    drawHistograms();
  }

  function drawHistograms() {
    const group = chart
      .patternify({
        tag: "g",
        selector: "histograms-group",
      })
      .attr("pointer-events", "none");

    const histogram = group
      .patternify({
        tag: "g",
        selector: "histogram",
        data: data,
      })
      .attr("transform", (d) => {
        return `translate(0, ${chartHeight - d.index * zTranslation})`;
      })
      .attr("data-index", (d) => d.index);

    histogram
      .patternify({
        tag: "line",
        selector: "baseline",
      })
      .attr("stroke", "black")
      .attr("stroke-opacity", 0.1)
      .attr("x1", 0)
      .attr("x2", chartWidth)
      .attr("y1", 0)
      .attr("y2", 0);

    histogram
      .patternify({
        tag: "path",
        selector: "area-path",
        data: (d) => [d],
      })
      .attr("d", (d) => area(d.bins))
      .attr("fill", (d) => {
        return d3.interpolateBlues(zScale(d.index));
      });

    histogram
      .patternify({
        tag: "path",
        selector: "line-path",
        data: (d) => [d],
      })
      .attr("d", (d) => line(d.bins))
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 1.5);

    histogram
      .patternify({
        tag: "circle",
        selector: "point",
        data: (d) => d.bins.map((x) => ({ ...x, index: d.index })),
      })
      .attr("cx", (d) => xScale(d[attrs.xField]))
      .attr("cy", (d) => yScale(d[attrs.yField]))
      .attr("r", 3)
      .attr("stroke", lineColor)
      .attr("fill", (d) => {
        return d3.interpolateBlues(zScale(d.index));
      })
      .attr("opacity", 0)
      .attr("data-index", (d, i) => i);
  }

  function hover(rect) {
    const indexes = [...data.flatMap((d, i) => d.bins.map((_, j) => [i, j]))];

    const X = [
      ...data.flatMap((d) => d.bins.map((x) => xScale(x[attrs.xField]))),
    ];

    const Y = [
      ...data.flatMap((d) =>
        d.bins.map((x) => {
          const dy = chartHeight - d.index * zTranslation;
          return yScale(x[attrs.yField]) + dy;
        })
      ),
    ];

    const I = d3.range(X.length);

    if ("ontouchstart" in document) {
      rect
        .style("-webkit-tap-highlight-color", "transparent")
        .on("touchmove", moved)
        .on("touchstart", entered)
        .on("touchend", left);
    } else {
      rect
        .on("mousemove", moved)
        .on("mouseenter", entered)
        .on("mouseleave", left);
    }

    function moved(event) {
      event.preventDefault();

      const [xm, ym] = d3.pointer(event, this);

      const i = d3.least(I, (i) =>
        Math.hypot(X[i] - xm + attrs.margin.left, Y[i] - ym + attrs.margin.top)
      );

      if (indexes[i]) {
        const [ii, ij] = indexes[i];

        const stack = data[ii];

        if (stack) {
          resetHighlight();

          chart.selectAll(`.point[data-index="${ij}"]`).attr("opacity", 1);

          const g = d3.select(`.histogram[data-index="${stack.index}"]`);

          g.selectAll(".line-path").attr("stroke", "black");
          g.selectAll(".point")
            .attr("fill", (d, ind) => {
              return ind === ij
                ? "black"
                : d3.interpolateBlues(zScale(d.index));
            })
            .attr("stroke", (_, ind) => (ind === ij ? "black" : lineColor));

          const tooltipX = X[i] + attrs.margin.left;
          const tooltipY = Y[i] + attrs.margin.top;
          const dir = tooltipX > chartWidth * 0.5 ? 'left' : 'right';

          tooltip
            .attr('data-dir', dir)
            .style("left", (tooltipX + (dir === 'left' ? -10 : 10)) + "px")
            .style("top", tooltipY + "px")
            .style("display", "block")
            .html(attrs.tooltipHTML(stack, ij));

          d3.selectAll('.histogram').each(function(d) {
            if (d.index < stack.index) {
              d3.select(this).attr('opacity', 0.3);
            } else {
              d3.select(this).attr('opacity', 1);
            }
          });
        }
      }
    }

    function entered() {}

    function left() {
      resetHighlight();
    }
  }

  function setScales() {
    const xDomain = [
      d3.min(data, (d) => d3.min(d.bins, (x) => x[attrs.xField])),
      d3.max(data, (d) => d3.max(d.bins, (x) => x[attrs.xField])),
    ];

    const yDomain = [
      0,
      d3.max(data, (d) => d3.max(d.bins, (x) => x[attrs.yField])),
    ];

    xScale = d3.scaleLinear(xDomain, [50, chartWidth - 50]);
    yScale = d3.scaleLinear(yDomain, [0, -chartHeight * 0.4]);

    yScaleGlobal = d3.scaleLinear(yDomain, [chartHeight, 0]);

    zScale = d3.scaleLinear([0, data.length - 1], [0.8, 0.5]);

    line = d3
      .line()
      .x((d) => xScale(d[attrs.xField]))
      .y((d) => yScale(d[attrs.yField]))
      .curve(d3.curveLinear);

    area = d3
      .area()
      .defined(line.defined())
      .x(line.x())
      .y1(line.y())
      .y0(yScale(0))
      .curve(d3.curveLinear);
  }

  function setDimensions() {
    const { width } = container.node().getBoundingClientRect();

    if (width) attrs.width = width;

    chartWidth = attrs.width - attrs.margin.left - attrs.margin.right;
    chartHeight = attrs.height - attrs.margin.top - attrs.margin.bottom;
  }

  function drawContainers() {
    container.style("position", "relative");

    svg = container
      .patternify({
        tag: "svg",
        selector: "svg-chart",
      })
      .attr("width", attrs.width)
      .attr("height", attrs.height);

    chart = svg
      .patternify({
        tag: "g",
        selector: "chart-group",
      })
      .attr(
        "transform",
        `translate(${attrs.margin.left}, ${attrs.margin.top})`
      );

    const rect = svg
      .patternify({
        tag: "rect",
        selector: "hover-rect",
      })
      .attr("width", attrs.width)
      .attr("height", attrs.height)
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "transparent");

    rect.call(hover);

    tooltip = container
      .patternify({
        tag: "div",
        selector: "chart-tooltip",
      })
      .style("position", "absolute")
      .style("display", "none");
  }

  function drawAxes() {
    const xAxisGen = d3.axisBottom(xScale).tickFormat(d3.format(".2s"));
    const yAxisGen = d3.axisRight(yScaleGlobal);

    chart
      .patternify({
        tag: "g",
        selector: "x-axis",
      })
      .attr("transform", `translate(0, ${chartHeight})`)
      .classed("axis", true)
      .call(xAxisGen);

    chart
      .patternify({
        tag: "g",
        selector: "y-axis",
      })
      .attr("transform", `translate(${chartWidth}, 0)`)
      .classed("axis", true)
      .call(yAxisGen);
  }

  function transformData() {
    data = attrs.data
      .map((d, i) => {
        return {
          ...d,
          index: i,
        };
      })
      .sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      })
      .reverse();
  }

  function resetHighlight() {
    d3.selectAll(".line-path").attr("stroke", lineColor);
    d3.selectAll(".point")
      .attr("opacity", 0)
      .attr("stroke", lineColor)
      .attr("fill", (d) => {
        return d3.interpolateBlues(zScale(d.index));
      });
    tooltip.style("display", "none");
    d3.selectAll('.histogram').attr('opacity', 1);
  }

  main.updateData = (newData) => {
    attrs.data = newData;

    resetHighlight();
    transformData();
    setScales();
    drawAxes();
    drawHistograms();

    return main;
  };

  main.render = () => {
    main();
    d3.select(window).on("resize.histograms", () => {
      setDimensions();
      setScales();
      drawAxes();
      drawContainers();
      resetHighlight();
      drawHistograms();
    });
    return main;
  };

  return main;
}

function initPatternify() {
  d3.selection.prototype.patternify = function(params) {
    var container = this;
    var selector = params.selector;
    var elementTag = params.tag;
    var data = params.data || [selector];

    // Pattern in action
    var selection = container.selectAll("." + selector).data(data, (d, i) => {
      if (typeof d === "object") {
        if (d.id) {
          return d.id;
        }
      }
      return i;
    });
    selection.exit().remove();
    selection = selection
      .enter()
      .append(elementTag)
      .merge(selection);
    selection.attr("class", selector);
    return selection;
  };
}

export default Histogram;
