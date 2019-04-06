var d3 = require('d3');

// circle events
function initNodeEvents(circle, text, isNodeClicked, isPathClicked) {
  circle.on('click', function(d, i) {
    d3.select(this).style('fill', 'orange');
    isNodeClicked[i] = !isNodeClicked[i];
  });

  text.on('click', function(d, i) {
    d3.selectAll('circle').each(function(d, j) {
      if (j === i) {
        d3.select(this).style('fill', 'orange');
        isNodeClicked[i] = !isNodeClicked[i];
      }
    });
  });

  circle
    .on('mouseover', function(d1, i) {
      document.body.style.cursor = 'pointer';
      d3.select(this).style('fill', 'orange');
      circleHover(d1, true, isPathClicked);
    })
    .on('mouseout', function(d1, i) {
      document.body.style.cursor = 'default';
      if (!isNodeClicked[i]) d3.select(this).style('fill', 'white');
      circleHover(d1, false, isPathClicked);
    });

  text
    .on('mouseover', function(d1, i) {
      document.body.style.cursor = 'pointer';
      d3.selectAll('circle').each(function(d, j) {
        if (j === i) {
          d3.select(this).style('fill', 'orange');
        }
      });
      circleHover(d1, true, isPathClicked);
    })
    .on('mouseout', function(d1, i) {
      document.body.style.cursor = 'default';
      d3.selectAll('circle').each(function(d, j) {
        if (j === i) {
          if (!isNodeClicked[i]) d3.select(this).style('fill', 'orange');
        }
      });
      circleHover(d1, false, isPathClicked);
    });
}

function circleHover(d1, display, isPathClicked) {
  d3.selectAll('g.links > g > text').each(function(d2, j) {
    if (d1.name === d2.source.name || d1.name === d2.target.name) {
      if (display) {
        d3.select(this).style('display', 'block');
      } else if (!isPathClicked[j]) {
        d3.select(this).style('display', 'none');
      }
    }
  });
  d3.selectAll('g.links > g > line').each(function(d2, j) {
    if (d1.name === d2.source.name || d1.name === d2.target.name) {
      if (display) {
        d3.select(this).style('stroke', 'orange');
      } else if (!isPathClicked[j]) {
        d3.select(this).style('stroke', 'black');
      }
    }
  });
}

export { initNodeEvents, circleHover };
