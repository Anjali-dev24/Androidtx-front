import * as shape from 'd3-shape';
import { scale } from 'react-native-size-scaling';

// Function to create a straight line path
const line = (width, height) => {
  const path = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    {x: width / 2, y: 0},
    {x: width, y: 0},
    {x: width, y: height},
    {x: 0, y: height},
    {x: 0, y: 0},
    {x: width / 2, y: 0},
  ]);

  return path;
};

// Function to create a curved path that dips down in the middle
const lineCurvedDown = (iPosition, height, circle) => {
  const position = iPosition;
  const circleWidth = circle + position;
  const trim = (position + circleWidth) / 2;

  const curved = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([
    {x: position - scale(20), y: 0}, // Left side of the curve
    {x: position - scale(10), y: scale(2)},
    {x: position - scale(2), y: scale(10)},
    {x: position, y: scale(17)},

    {x: trim - scale(25), y: height / 2 + scale(2)}, // Center of the curve
    {x: trim - scale(10), y: height / 2 + scale(10)},
    {x: trim, y: height / 2 + scale(10)},
    {x: trim + scale(10), y: height / 2 + scale(10)},
    {x: trim + scale(25), y: height / 2 + scale(2)},

    {x: circleWidth, y: scale(17)}, // Right side of the curve
    {x: circleWidth + scale(2), y: scale(10)},
    {x: circleWidth + scale(10), y: 0},
    {x: circleWidth + scale(20), y: 0},
  ]);

  return curved;
};

// Function to combine the straight line and the curved line paths
export const getPathDown = (width, iHeight, centerWidth) => {
  const height = scale(iHeight);
  const circleWidth = scale(centerWidth) + scale(16);
  return `${line(width, height)} ${lineCurvedDown(
    width / 2 - circleWidth / 2,
    height,
    circleWidth,
  )}`;
};
