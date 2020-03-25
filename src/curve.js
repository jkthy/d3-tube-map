import * as d3 from 'd3';

export function interchange(lineWidth) {
  return d3
    .arc()
    .innerRadius(0)
    .outerRadius(1.25 * lineWidth)
    .startAngle(0)
    .endAngle(2 * Math.PI);
}

export function station(
  d,
  xScale,
  yScale,
  lineWidthMultiplier,
  lineWidthTickRatio
) {
  var dir;
  var sqrt2 = Math.sqrt(2);

  var lineFunction = d3
    .line()
    .x(function(d) {
      return xScale(d[0]);
    })
    .y(function(d) {
      return yScale(d[1]);
    });

  switch (d.labelPos.toLowerCase()) {
    case 'n':
      dir = [0, 1];
      break;
    case 'ne':
      dir = [1 / sqrt2, 1 / sqrt2];
      break;
    case 'e':
      dir = [1, 0];
      break;
    case 'se':
      dir = [1 / sqrt2, -1 / sqrt2];
      break;
    case 's':
      dir = [0, -1];
      break;
    case 'sw':
      dir = [-1 / sqrt2, -1 / sqrt2];
      break;
    case 'w':
      dir = [-1, 0];
      break;
    case 'nw':
      dir = [-1 / sqrt2, 1 / sqrt2];
      break;
    default:
      break;
  }

  return lineFunction([
    [
      d.x +
        d.shiftX * lineWidthMultiplier +
        (lineWidthMultiplier / 2.05) * dir[0],
      d.y +
        d.shiftY * lineWidthMultiplier +
        (lineWidthMultiplier / 2.05) * dir[1],
    ],
    [
      d.x +
        d.shiftX * lineWidthMultiplier +
        (lineWidthMultiplier / 2) * dir[0] +
        (lineWidthMultiplier / lineWidthTickRatio) * dir[0],
      d.y +
        d.shiftY * lineWidthMultiplier +
        (lineWidthMultiplier / 2) * dir[1] +
        (lineWidthMultiplier / lineWidthTickRatio) * dir[1],
    ],
  ]);
}

export function line(data, xScale, yScale, lineWidth, lineWidthTickRatio) {
  var path = '';
  var lineNodes = data.nodes;
  var points;

  for (var lineNode = 0; lineNode < lineNodes.length; lineNode++) {
    if (lineNode > 0) {
      path +=
        'L' +
        lineNodes[lineNode].coords[0] +
        ',' +
        lineNodes[lineNode].coords[1];
    } else {
      points = [lineNodes[lineNode].coords[0], lineNodes[lineNode].coords[1]];

      path += 'M' + points[0] + ',' + points[1];
    }
  }

  return path;
}
