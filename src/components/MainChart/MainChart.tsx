import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import * as d3 from 'd3';
import { TickerHistoryItem } from '../../types';

type ChartProps = {
  history: TickerHistoryItem[];
}

// Chart margins for the axes to fit
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 30,
};
const axisPadding = 0.02; // Inner paddings for axes
const mobileThreshold = 600; // Determines how many ticks to render: fever on small screens
const parseTime = d3.timeParse('%Y-%m-%d'); // Method to parse dates

// Gets the closest prev date from the data
const bisectDate = d3.bisector((d: TickerHistoryItem) => parseTime(d.date)).left;

const MainChart: React.FC<ChartProps> = ({ history = [] }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const graphicsRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const cursorRef = useRef<SVGCircleElement>(null);
  const vLineRef = useRef<SVGLineElement>(null);
  const hLineRef = useRef<SVGLineElement>(null);

  // Hovered state — show or hide the cursor point and lines
  const [hovered, setHovered] = useState(false);

  // Main render methods
  const drawChart = useCallback(() => {
    const boundingRect = svgRef.current?.getBoundingClientRect();

    if (!boundingRect || history.length < 2) return;

    const svg = d3.select(graphicsRef.current);
    svg.selectAll('*').remove();

    const { width, height } = boundingRect;

    // Calculate the real size for actual graphics area
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Calculate the dates range with padding
    const dateRange = [
      parseTime(history[0].date) as Date,
      parseTime(history[history.length - 1].date) as Date,
    ];
    const dateMargin = (dateRange[1].getTime() - dateRange[0].getTime()) * axisPadding;
    dateRange[0] = new Date(dateRange[0].getTime() - dateMargin);
    dateRange[1] = new Date(dateRange[1].getTime() + dateMargin);

    // Calculate the values range with padding
    const closeValues = history.map((d) => d.close);
    const minValue = Math.min(...closeValues);
    const maxValue = Math.max(...closeValues);
    const delta = (maxValue - minValue) * axisPadding;

    // Create and set the scales
    const x = d3.scaleTime()
      .range([0, chartWidth])
      .domain(dateRange);
    const y = d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([minValue - delta, maxValue + delta]);

    // Create line function using the new scales
    const line = d3.line<TickerHistoryItem>()
      .x((d) => x(parseTime(d.date) ?? new Date(0)))
      .y((d) => y(d.close));

    // Append the left Y axis and grid
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y).tickSize(-chartWidth))
      .attr('stroke-opacity', 0.2)
      .selectAll('.domain')
      .attr('stroke', 'none');

    // Append the bottom X axis and grid
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},${chartHeight + margin.top})`)
      .call(d3.axisBottom(x).ticks(chartWidth < mobileThreshold ? 4 : 10).tickSize(-chartHeight))
      .attr('stroke-opacity', 0.2)
      .selectAll('.domain')
      .attr('stroke', 'none');

    // Hide borders of the axes
    svg.selectAll('.axis .domain')
      .attr('stroke', 'none');

    // Append the line
    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .append('path')
      .data([history])
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    // Track the mouse on the graph and calculate the hovered value
    d3.select(rectRef.current)
      .on('mousemove', (event) => {
        // Get the position according to data coordinates
        const [mouseX] = d3.pointer(event, svgRef.current);
        const date = x.invert(mouseX - margin.left);

        // Get the index of the value in data array
        const index = bisectDate(history, date, 1);
        if (index === 0 || index >= history.length) return;

        // Get the closest date values to the hovered point
        const d0 = history[index - 1];
        const d1 = history[index];
        const d0Date = parseTime(d0.date);
        const d1Date = parseTime(d1.date);

        if (!d0Date || !d1Date) return;

        // Find the closest value
        const closestData = d1 && (date.valueOf() - d0Date.getTime()
            > d1Date.getTime() - date.valueOf()) ? d1 : d0;

        if (!closestData) return;

        const closestDataDate = parseTime(closestData.date);

        if (!closestDataDate) return;

        // Get the screen coordinates
        const screenX = x(closestDataDate);
        const screenY = y(closestData.close);

        // Position cursor dot and lines to the found coordinates
        d3.select(cursorRef.current)
          .attr('cx', screenX + margin.left)
          .attr('cy', screenY + margin.top);

        d3.select(vLineRef.current)
          .attr('x1', screenX + margin.left)
          .attr('x2', screenX + margin.left)
          .attr('y1', margin.top)
          .attr('y2', chartHeight + margin.top);

        d3.select(hLineRef.current)
          .attr('x1', margin.left)
          .attr('x2', chartWidth + margin.left)
          .attr('y1', screenY + margin.top)
          .attr('y2', screenY + margin.top);
      });
  }, [history]);

  // When data changes create ResizeObserver to track size changes
  // If size changed, rerender the chart
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      drawChart();
    });

    if (svgRef.current && svgRef.current.parentNode instanceof Element) {
      resizeObserver.observe(svgRef.current.parentNode as Element);
    }

    return () => resizeObserver.disconnect();
  }, [history, drawChart]);

  return (
    <svg data-testid="chart" ref={svgRef} width="100%" height="100%">
      <g ref={graphicsRef} />
      <g>
        <line
          ref={vLineRef}
          strokeDasharray="3,3"
          className={`stroke-gray-500 ${hovered ? 'visible' : 'invisible'}`}
        />
        <line
          ref={hLineRef}
          strokeDasharray="3,3"
          className={`stroke-gray-500 ${hovered ? 'visible' : 'invisible'}`}
        />
        <circle
          ref={cursorRef}
          r={3}
          className={`fill-accent-800 stroke-none ${hovered ? 'visible' : 'invisible'}`}
        />
      </g>
      <rect
        ref={rectRef}
        width="100%"
        height="100%"
        className="fill-none pointer-events-all"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      />
    </svg>
  );
};

export default MainChart;
