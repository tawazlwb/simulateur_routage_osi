var $chart_area, lastWidth, GraphModule, results;

function checkForChanges() {
  if ($chart_area.width() != lastWidth) {
    lastWidth = $chart_area.width();
    let height = $('#graph').height();
    GraphModule.Graph.graph.svg.style('width', lastWidth + 'px');
    GraphModule.Graph.simulation.force(
      'center',
      customModule.d3.forceCenter(lastWidth / 2, height / 2)
    );
    GraphModule.Graph.simulation.restart();
  }

  setTimeout(checkForChanges, 500);
}

function countSelectedNode() {
  let count = 0;
  if (typeof GraphModule !== 'undefined') {
    GraphModule.isNodeClicked.forEach(function(isClicked, index) {
      if (isClicked) {
        ++count;
      }
    });
    return count;
  }
}

function getSelectedNodes() {
  let selectedNodes = [];
  if (typeof GraphModule !== 'undefined') {
    GraphModule.isNodeClicked.forEach(function(isClicked, index) {
      if (isClicked) {
        selectedNodes.push(GraphModule.Graph.simulation.nodes()[index].name);
      }
    });
  }
  return selectedNodes;
}

function CheckNodes() {
  let count = countSelectedNode();
  if (count == 0 || count == 1 || count > 2) {
    return false;
  }
  return true;
}

function drawPath(path, clean) {
  // Color nodes
  customModule.d3.selectAll('circle').each(function(d, i) {
    if (path.includes(d.name) && !clean) {
      customModule.d3.select(this).style('fill', 'orange');
      GraphModule.isNodeClicked[i] = true;
    } else {
      customModule.d3.select(this).style('fill', 'white');
      GraphModule.isNodeClicked[i] = false;
    }
  });

  // Show path values
  customModule.d3.selectAll('g.links > g > text').each(function(d2, j) {
    for (let i = 0; i < path.length - 1; i++) {
      const element1 = path[i];
      const element2 = path[i + 1];
      if (
        (d2.source.name === element1 && d2.target.name === element2) ||
        (d2.source.name === element2 && d2.target.name === element1)
      ) {
        if (!clean) {
          customModule.d3.select(this).style('display', 'block');
        } else {
          customModule.d3.select(this).style('display', 'none');
        }
      }
    }
  });

  // Color path
  customModule.d3.selectAll('line').each(function(d, j) {
    for (let i = 0; i < path.length - 1; i++) {
      const element1 = path[i];
      const element2 = path[i + 1];
      if (
        (d.source.name === element1 && d.target.name === element2) ||
        (d.source.name === element2 && d.target.name === element1)
      ) {
        if (!clean) {
          customModule.d3.select(this).style('stroke', 'orange');
          GraphModule.isPathClicked[j] = true;
        } else {
          customModule.d3.select(this).style('stroke', 'black');
          GraphModule.isPathClicked[j] = false;
        }
      }
    }
  });
}

$(document).ready(function() {
  // custom network
  var $optimal = $('#optimal');
  var $clear = $('#clear');
  var $distance = $('#distance');
  var $path = $('#path');

  $optimal.on('click', function() {
    $distance.text('...');
    $path.text('...');
    if (!CheckNodes()) {
      alert('You must select 2 nodes to start Dijkstra algorithm simulation!');
    } else {
      let selectedNodes = getSelectedNodes();
      if (selectedNodes.length === 2) {
        let start = selectedNodes[0],
          finish = selectedNodes[1];
        results = customModule.Dijkstra.run(
          GraphModule.Graph.graph.links_data,
          start,
          finish
        );
        if (results.distance === Infinity) {
          $distance.text('Infinity');
          $path.text('No possible path!');
          alert('There is no path between the selected nodes!');
          $clear.toggleClass('disabled');
          $optimal.toggleClass('disabled');
        } else {
          drawPath(results.path);
          $distance.text('12');
          $path.text(results.path.join(' -> '));
          $clear.toggleClass('disabled');
          $(this).toggleClass('disabled');
        }
      }
    }
  });

  $clear.on('click', function() {
    drawPath(results.path, true);
    $(this).toggleClass('disabled');
    $optimal.toggleClass('disabled');
    $distance.text('...');
    $path.text('...');
  });
});
