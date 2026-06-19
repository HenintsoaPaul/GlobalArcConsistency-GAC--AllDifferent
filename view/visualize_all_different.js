// Fallback dataset to ensure functionality if CORS blocks fetch on local file:// URI
// const FALLBACK_TRACE = [
//   {
//     "step_no": 0,
//     "phase": "init",
//     "title": "Initial Bipartite Graph",
//     "description": "Initial bipartite graph showing variables on the left and the union of domains on the right. Undirected edges connect variables to their possible domain values.",
//     "variables": [
//       { "name": "x1", "domain": [1, 2] },
//       { "name": "x2", "domain": [1, 2] },
//       { "name": "x3", "domain": [2, 3] },
//       { "name": "x4", "domain": [2, 3, 4, 5] }
//     ],
//     "values": [1, 2, 3, 4, 5],
//     "edges": [
//       { "var": "x1", "val": 1, "direction": "undirected", "status": "normal" },
//       { "var": "x1", "val": 2, "direction": "undirected", "status": "normal" },
//       { "var": "x2", "val": 1, "direction": "undirected", "status": "normal" },
//       { "var": "x2", "val": 2, "direction": "undirected", "status": "normal" },
//       { "var": "x3", "val": 2, "direction": "undirected", "status": "normal" },
//       { "var": "x3", "val": 3, "direction": "undirected", "status": "normal" },
//       { "var": "x4", "val": 2, "direction": "undirected", "status": "normal" },
//       { "var": "x4", "val": 3, "direction": "undirected", "status": "normal" },
//       { "var": "x4", "val": 4, "direction": "undirected", "status": "normal" },
//       { "var": "x4", "val": 5, "direction": "undirected", "status": "normal" }
//     ],
//     "matching": {},
//     "sccs": [],
//     "reachable_nodes": []
//   },
//   {
//     "step_no": 1,
//     "phase": "matching",
//     "title": "Maximum Bipartite Matching",
//     "description": "Calculate a Maximum Bipartite Matching using augmenting paths. Green/bold edges indicate the matched variable-value pairs. Maximum matching found of size 4 (complete matching).",
//     "variables": [
//       { "name": "x1", "domain": [1, 2] },
//       { "name": "x2", "domain": [1, 2] },
//       { "name": "x3", "domain": [2, 3] },
//       { "name": "x4", "domain": [2, 3, 4, 5] }
//     ],
//     "values": [1, 2, 3, 4, 5],
//     "edges": [
//       { "var": "x1", "val": 1, "direction": "undirected", "status": "normal" },
//       { "var": "x1", "val": 2, "direction": "undirected", "status": "matched" },
//       { "var": "x2", "val": 1, "direction": "undirected", "status": "matched" },
//       { "var": "x2", "val": 2, "direction": "undirected", "status": "normal" },
//       { "var": "x3", "val": 2, "direction": "undirected", "status": "normal" },
//       { "var": "x3", "val": 3, "direction": "undirected", "status": "matched" },
//       { "var": "x4", "val": 2, "direction": "undirected", "status": "normal" },
//       { "var": "x4", "val": 3, "direction": "undirected", "status": "normal" },
//       { "var": "x4", "val": 4, "direction": "undirected", "status": "matched" },
//       { "var": "x4", "val": 5, "direction": "undirected", "status": "normal" }
//     ],
//     "matching": { "x1": 2, "x2": 1, "x3": 3, "x4": 4 },
//     "sccs": [],
//     "reachable_nodes": []
//   },
//   {
//     "step_no": 2,
//     "phase": "residual",
//     "title": "Directed Residual Graph",
//     "description": "Construct the directed residual graph G_R. Edges in the matching are directed from values to variables (value -> variable). Non-matching edges are directed from variables to values (variable -> value). Unmatched values are highlighted.",
//     "variables": [
//       { "name": "x1", "domain": [1, 2] },
//       { "name": "x2", "domain": [1, 2] },
//       { "name": "x3", "domain": [2, 3] },
//       { "name": "x4", "domain": [2, 3, 4, 5] }
//     ],
//     "values": [1, 2, 3, 4, 5],
//     "edges": [
//       { "var": "x1", "val": 1, "direction": "var_to_val", "status": "normal" },
//       { "var": "x1", "val": 2, "direction": "val_to_var", "status": "matched" },
//       { "var": "x2", "val": 1, "direction": "val_to_var", "status": "matched" },
//       { "var": "x2", "val": 2, "direction": "var_to_val", "status": "normal" },
//       { "var": "x3", "val": 2, "direction": "var_to_val", "status": "normal" },
//       { "var": "x3", "val": 3, "direction": "val_to_var", "status": "matched" },
//       { "var": "x4", "val": 2, "direction": "var_to_val", "status": "normal" },
//       { "var": "x4", "val": 3, "direction": "var_to_val", "status": "normal" },
//       { "var": "x4", "val": 4, "direction": "val_to_var", "status": "matched" },
//       { "var": "x4", "val": 5, "direction": "var_to_val", "status": "normal" }
//     ],
//     "matching": { "x1": 2, "x2": 1, "x3": 3, "x4": 4 },
//     "sccs": [],
//     "reachable_nodes": [ "val_5", "val_4", "var_x4" ]
//   },
//   {
//     "step_no": 3,
//     "phase": "sccs",
//     "title": "Strongly Connected Components (SCCs)",
//     "description": "Identify Strongly Connected Components (SCCs) in G_R using Tarjan's algorithm. Nodes belonging to the same component are colored identically. Edges inside an SCC lie on a cycle and are guaranteed to belong to some maximum matching.",
//     "variables": [
//       { "name": "x1", "domain": [1, 2] },
//       { "name": "x2", "domain": [1, 2] },
//       { "name": "x3", "domain": [2, 3] },
//       { "name": "x4", "domain": [2, 3, 4, 5] }
//     ],
//     "values": [1, 2, 3, 4, 5],
//     "edges": [
//       { "var": "x1", "val": 1, "direction": "var_to_val", "status": "normal" },
//       { "var": "x1", "val": 2, "direction": "val_to_var", "status": "matched" },
//       { "var": "x2", "val": 1, "direction": "val_to_var", "status": "matched" },
//       { "var": "x2", "val": 2, "direction": "var_to_val", "status": "normal" },
//       { "var": "x3", "val": 2, "direction": "var_to_val", "status": "normal" },
//       { "var": "x3", "val": 3, "direction": "val_to_var", "status": "matched" },
//       { "var": "x4", "val": 2, "direction": "var_to_val", "status": "normal" },
//       { "var": "x4", "val": 3, "direction": "var_to_val", "status": "normal" },
//       { "var": "x4", "val": 4, "direction": "val_to_var", "status": "matched" },
//       { "var": "x4", "val": 5, "direction": "var_to_val", "status": "normal" }
//     ],
//     "matching": { "x1": 2, "x2": 1, "x3": 3, "x4": 4 },
//     "sccs": [
//       [ "val_2", "var_x2", "val_1", "var_x1" ],
//       [ "var_x3" ],
//       [ "val_3" ],
//       [ "val_5" ],
//       [ "var_x4" ],
//       [ "val_4" ]
//     ],
//     "reachable_nodes": [ "val_5", "val_4", "var_x4" ]
//   },
//   {
//     "step_no": 4,
//     "phase": "filtering",
//     "title": "Final Filtering (Domain Pruning)",
//     "description": "Pruning edges that cannot participate in any maximum matching. Edges are removed if they are not part of the matching, do not lie on any cycle (not in the same SCC), and do not lie on any alternating path starting from an unmatched value vertex. Red/dashed edges are pruned.",
//     "variables": [
//       { "name": "x1", "domain": [1, 2] },
//       { "name": "x2", "domain": [1, 2] },
//       { "name": "x3", "domain": [3] },
//       { "name": "x4", "domain": [4, 5] }
//     ],
//     "values": [1, 2, 3, 4, 5],
//     "edges": [
//       { "var": "x1", "val": 1, "direction": "undirected", "status": "kept" },
//       { "var": "x1", "val": 2, "direction": "undirected", "status": "matched" },
//       { "var": "x2", "val": 1, "direction": "undirected", "status": "matched" },
//       { "var": "x2", "val": 2, "direction": "undirected", "status": "kept" },
//       { "var": "x3", "val": 2, "direction": "undirected", "status": "pruned" },
//       { "var": "x3", "val": 3, "direction": "undirected", "status": "matched" },
//       { "var": "x4", "val": 2, "direction": "undirected", "status": "pruned" },
//       { "var": "x4", "val": 3, "direction": "undirected", "status": "pruned" },
//       { "var": "x4", "val": 4, "direction": "undirected", "status": "matched" },
//       { "var": "x4", "val": 5, "direction": "undirected", "status": "kept" }
//     ],
//     "matching": { "x1": 2, "x2": 1, "x3": 3, "x4": 4 },
//     "sccs": [
//       [ "val_2", "var_x2", "val_1", "var_x1" ],
//       [ "var_x3" ],
//       [ "val_3" ],
//       [ "val_5" ],
//       [ "var_x4" ],
//       [ "val_4" ]
//     ],
//     "reachable_nodes": [ "val_5", "val_4", "var_x4" ],
//     "pruned_domains": {
//       "x1": [1, 2],
//       "x2": [1, 2],
//       "x3": [3],
//       "x4": [4, 5]
//     },
//     "removed_edges": [
//       ["x3", 2],
//       ["x4", 2],
//       ["x4", 3]
//     ]
//   }
// ];

// Active State variables
let STEPS = [];
let current = 0;
let nodePositions = {};
const nodeRadius = 22;

// Parse Base64 wrappers if they exist or just return JSON array
function parseTrace(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object' && data.content) {
    try {
      const decoded = atob(data.content.replace(/\s/g, ''));
      return JSON.parse(decoded);
    } catch (e) {
      console.error("Failed to decode base64 content", e);
    }
  }
  return data;
}

// Calculate bipartite positioning (Variables on left, Values on right)
function calculateBipartitePositions(variables, values) {
  const positions = {};
  const height = 400;
  const leftX = 130;
  const rightX = 470;

  const varSpacing = (height - 60) / Math.max(1, variables.length - 1);
  const valSpacing = (height - 60) / Math.max(1, values.length - 1);

  variables.forEach((v, idx) => {
    positions[`var_${v.name}`] = {
      cx: leftX,
      cy: variables.length === 1 ? height / 2 : 30 + idx * varSpacing
    };
  });

  values.forEach((val, idx) => {
    positions[`val_${val}`] = {
      cx: rightX,
      cy: values.length === 1 ? height / 2 : 30 + idx * valSpacing
    };
  });

  return positions;
}

// Load Regin Trace Steps
function loadTraceData(rawData) {
  try {
    STEPS = parseTrace(rawData);
    if (!Array.isArray(STEPS) || STEPS.length === 0) {
      throw new Error("Invalid trace file structure.");
    }
    current = 0;

    // Calculate node layout positions based on first step
    const firstStep = STEPS[0];
    const variables = firstStep.variables;
    const values = firstStep.values;
    nodePositions = calculateBipartitePositions(variables, values);

    updateHeaderSubtitle();
    render();
  } catch (err) {
    console.error("Error parsing trace data:", err);
    alert("Error parsing trace: " + err.message);
  }
}

// Update the top header info
function updateHeaderSubtitle() {
  const subtitle = document.getElementById("subtitle-info");
  if (!subtitle || !STEPS.length) return;

  const step0 = STEPS[0];
  const domainStrs = step0.variables.map(v => `${v.name}∈{${v.domain.join(',')}}`);
  subtitle.textContent = `Initial Domains: ${domainStrs.join(', ')}`;
}

// Draw the bipartite graph using SVG elements
function renderGraph(step) {
  const svg = document.getElementById('graph-canvas');
  if (!svg) return;

  // Clear SVG
  svg.innerHTML = '';

  // Set pruning view style class on SVG element
  const animationToggle = document.getElementById("animation-style-toggle");
  if (animationToggle.checked) {
    svg.setAttribute("class", "pruning-style-animation");
  } else {
    svg.setAttribute("class", "pruning-style-simple");
  }

  // Define markers for directed residual edges
  let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <!-- Var to Val pointer (Blue) -->
    <marker id="arrow-var-val" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
      <path d="M0,1 L0,5 L5,3 z" fill="#5e81ff"/>
    </marker>
    <!-- Val to Var pointer (Green) -->
    <marker id="arrow-val-var" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
      <path d="M0,1 L0,5 L5,3 z" fill="#10b981"/>
    </marker>
    <!-- Alternating path pointer (Yellow) -->
    <marker id="arrow-alternating" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
      <path d="M0,1 L0,5 L5,3 z" fill="#f59e0b"/>
    </marker>
  `;
  svg.appendChild(defs);

  const matchedVariables = Object.keys(step.matching);
  const matchedValues = Object.values(step.matching);
  const sccsList = step.sccs || [];

  // Find node to SCC group index (only for SCCs of size >= 2)
  const nodeToSccIdx = {};
  sccsList.forEach((scc, idx) => {
    if (scc.length >= 2) {
      scc.forEach(node => {
        nodeToSccIdx[node] = idx;
      });
    }
  });

  // 1. Draw Edges
  step.edges.forEach(edge => {
    const varNodeName = `var_${edge.var}`;
    const valNodeName = `val_${edge.val}`;

    const fromPos = nodePositions[varNodeName];
    const toPos = nodePositions[valNodeName];
    if (!fromPos || !toPos) return;

    // Check if both nodes are reachable from unmatched values (alternating path edge)
    const isReachable = step.reachable_nodes.includes(varNodeName) && step.reachable_nodes.includes(valNodeName);

    // Determine drawing start/end depending on edge direction
    // val_to_var: value -> variable (Matching edges in residual graph)
    // var_to_val: variable -> value (Non-matching edges in residual graph)
    let src = fromPos;
    let dst = toPos;
    let markerId = '';

    if (edge.direction === 'val_to_var') {
      src = toPos;
      dst = fromPos;
      markerId = isReachable ? 'url(#arrow-alternating)' : 'url(#arrow-val-var)';
    } else if (edge.direction === 'var_to_val') {
      src = fromPos;
      dst = toPos;
      markerId = isReachable ? 'url(#arrow-alternating)' : 'url(#arrow-var-val)';
    }

    // Shorten line so arrows end nicely on the circle edge
    const dx = dst.cx - src.cx;
    const dy = dst.cy - src.cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist === 0) return;

    const x1 = src.cx + (dx / dist) * nodeRadius;
    const y1 = src.cy + (dy / dist) * nodeRadius;

    // Give marker tip extra space so it doesn't overlap circle stroke
    const extraSpace = markerId ? 4 : 0;
    const x2 = dst.cx - (dx / dist) * (nodeRadius + extraSpace);
    const y2 = dst.cy - (dy / dist) * (nodeRadius + extraSpace);

    // Create line element
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);

    // Edge styles base
    let stroke = 'rgba(148, 163, 184, 0.25)';
    let strokeWidth = '1.5';
    let dasharray = '';
    let className = 'graph-edge';

    if (edge.status === 'matched') {
      stroke = 'var(--green)';
      strokeWidth = '2.5';
    } else if (isReachable && edge.status !== 'pruned') {
      stroke = 'var(--yellow)';
      strokeWidth = '1.8';
    }

    if (edge.status === 'pruned') {
      className += ' edge-pruned';
      stroke = 'var(--red)';
      dasharray = '4';
    }

    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', strokeWidth);
    if (dasharray) line.setAttribute('stroke-dasharray', dasharray);
    if (markerId) line.setAttribute('marker-end', markerId);
    line.setAttribute('class', className);

    svg.appendChild(line);
  });

  // 2. Draw Nodes (Variables & Values)
  // Variables (Left Column)
  step.variables.forEach(v => {
    const nodeName = `var_${v.name}`;
    const pos = nodePositions[nodeName];
    if (!pos) return;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Styles
    let stroke = 'var(--accent)';
    let strokeWidth = '1.5';
    let fill = '#111522';
    let filter = '';

    // Highlight if part of an alternating path
    const isReachable = step.reachable_nodes.includes(nodeName);
    if (isReachable) {
      stroke = 'var(--yellow)';
      fill = 'rgba(245, 158, 11, 0.08)';
    }

    // Highlight if part of a multi-node SCC
    if (nodeName in nodeToSccIdx) {
      const sccIdx = nodeToSccIdx[nodeName];
      stroke = `var(--scc-${sccIdx % 7})`;
      strokeWidth = '2.5';
      filter = `drop-shadow(0 0 5px var(--scc-${sccIdx % 7}))`;
    }

    // Node circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', pos.cx);
    circle.setAttribute('cy', pos.cy);
    circle.setAttribute('r', nodeRadius);
    circle.setAttribute('stroke', stroke);
    circle.setAttribute('stroke-width', strokeWidth);
    circle.setAttribute('fill', fill);
    if (filter) circle.setAttribute('style', `filter: ${filter}`);
    circle.setAttribute('class', 'node-circle');

    // Node label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', pos.cx);
    text.setAttribute('y', pos.cy + 4);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('class', 'node-text');
    text.textContent = v.name;

    g.appendChild(circle);
    g.appendChild(text);
    svg.appendChild(g);
  });

  // Values (Right Column)
  step.values.forEach(val => {
    const nodeName = `val_${val}`;
    const pos = nodePositions[nodeName];
    if (!pos) return;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    let stroke = 'var(--accent2)';
    let strokeWidth = '1.5';
    let fill = '#111522';
    let filter = '';

    // Check if this value is completely unmatched
    const isUnmatched = !matchedValues.includes(val);
    const isReachable = step.reachable_nodes.includes(nodeName);

    if (isUnmatched && step.phase !== 'init' && step.phase !== 'matching') {
      stroke = 'var(--yellow)';
      strokeWidth = '2';
      filter = 'drop-shadow(0 0 6px var(--yellow))';
    } else if (isReachable) {
      stroke = 'var(--yellow)';
      fill = 'rgba(245, 158, 11, 0.08)';
    }

    // Highlight if part of a multi-node SCC
    if (nodeName in nodeToSccIdx) {
      const sccIdx = nodeToSccIdx[nodeName];
      stroke = `var(--scc-${sccIdx % 7})`;
      strokeWidth = '2.5';
      filter = `drop-shadow(0 0 5px var(--scc-${sccIdx % 7}))`;
    }

    // Node circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', pos.cx);
    circle.setAttribute('cy', pos.cy);
    circle.setAttribute('r', nodeRadius);
    circle.setAttribute('stroke', stroke);
    circle.setAttribute('stroke-width', strokeWidth);
    circle.setAttribute('fill', fill);
    if (filter) circle.setAttribute('style', `filter: ${filter}`);
    circle.setAttribute('class', 'node-circle');

    // Node label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', pos.cx);
    text.setAttribute('y', pos.cy + 4);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('class', 'node-text');
    text.textContent = val;

    g.appendChild(circle);
    g.appendChild(text);
    svg.appendChild(g);
  });
}

// Render domains grid cards
function renderDomains(step) {
  const grid = document.getElementById('domains-grid');
  if (!grid) return;

  const step0 = STEPS[0];
  const stepFinal = STEPS[STEPS.length - 1];

  let html = '';
  step0.variables.forEach(origVar => {
    // Find current domains
    const currentVarObj = step.variables.find(v => v.name === origVar.name);
    const currentVals = currentVarObj ? currentVarObj.domain : [];

    // Determine deleted values (at this step, or finally deleted in filtering)
    let deletedHere = [];
    if (step.phase === 'filtering') {
      deletedHere = origVar.domain.filter(val => !currentVals.includes(val));
    }

    let valsHtml = origVar.domain.map(val => {
      const isDeleted = deletedHere.includes(val);
      return `<span class="dv${isDeleted ? ' deleted' : ''}">${val}</span>`;
    }).join('');

    const isNodeActive = step.phase === 'filtering' && deletedHere.length > 0;

    html += `
      <div class="domain-node${isNodeActive ? ' active' : ''}">
        <div class="var-name" style="color: ${isNodeActive ? 'var(--red)' : 'var(--text)'}">${origVar.name}</div>
        <div class="domain-values">${valsHtml}</div>
      </div>
    `;
  });
  grid.innerHTML = html;
}

// Render details sidebar metrics
function renderStepDetails(step) {
  const matchSize = document.getElementById('matching-size');
  const matchPairs = document.getElementById('matching-pairs-list');
  const sccList = document.getElementById('scc-list');
  const reachableList = document.getElementById('reachable-nodes-list');

  if (!matchSize || !matchPairs || !sccList || !reachableList) return;

  // 1. Render Maximum Matching
  const keys = Object.keys(step.matching);
  if (keys.length === 0) {
    matchSize.textContent = 'None calculated';
    matchSize.style.color = 'var(--muted)';
    matchPairs.innerHTML = '<span class="no-items-text">No active pairs yet</span>';
  } else {
    const totalVars = STEPS[0].variables.length;
    const isComplete = keys.length === totalVars;
    matchSize.textContent = `${keys.length} / ${totalVars} (${isComplete ? 'Complete ✓' : 'Incomplete ✗'})`;
    matchSize.style.color = isComplete ? 'var(--green)' : 'var(--red)';

    matchPairs.innerHTML = keys.map(k => `
      <span class="pair-badge">${k} ⇄ ${step.matching[k]}</span>
    `).join('');
  }

  // 2. Render SCCs (Highlight size >= 2)
  const components = step.sccs || [];
  const multiNodeSccs = components.filter(c => c.length >= 2);

  if (multiNodeSccs.length === 0) {
    sccList.innerHTML = `<span class="no-items-text">${step.phase === 'init' || step.phase === 'matching'
        ? 'Pending calculation'
        : 'No components of size ≥ 2 found.'
      }</span>`;
  } else {
    // Map components into nice list items matching scc colors
    sccList.innerHTML = multiNodeSccs.map((scc, idx) => {
      // Clean names (e.g. var_x1 -> x1, val_2 -> 2)
      const cleanMembers = scc.map(name => name.replace('var_', '').replace('val_', '')).join(', ');
      return `
        <div class="scc-row">
          <div class="scc-color-dot" style="background: var(--scc-${idx % 7}); box-shadow: 0 0 5px var(--scc-${idx % 7})"></div>
          <div class="scc-members">{${cleanMembers}}</div>
        </div>
      `;
    }).join('') + '<div class="scc-desc">Singletons are excluded from coloring</div>';
  }

  // 3. Render Reachable nodes / Alternating paths
  if (step.phase === 'init' || step.phase === 'matching') {
    reachableList.innerHTML = '<span class="no-items-text">Pending calculation</span>';
  } else {
    // Unmatched values
    const matchedValues = Object.values(step.matching);
    const unmatchedVals = step.values.filter(val => !matchedValues.includes(val));

    let html = '';
    if (unmatchedVals.length === 0) {
      html += '<div class="scc-desc">All values matched. Alternating paths empty.</div>';
    } else {
      const unmatchedBadgeList = unmatchedVals.map(val => `<span class="node-badge" style="border-color:var(--yellow); color:var(--yellow); box-shadow: 0 0 4px var(--yellow)">val_${val}</span>`).join(' ');
      html += `<div style="font-size:0.75rem; color:var(--muted); margin-bottom:0.25rem;">Start sources (unmatched values):</div>`;
      html += `<div class="reachable-badge-row" style="margin-bottom:0.5rem;">${unmatchedBadgeList}</div>`;
    }

    // Reachable set
    const cleanReachable = step.reachable_nodes.map(n => `<span class="node-badge reachable-node">${n}</span>`);
    if (cleanReachable.length === 0) {
      html += '<span class="no-items-text">No extra nodes reached</span>';
    } else {
      html += `<div style="font-size:0.75rem; color:var(--muted); margin-bottom:0.25rem;">Reachable Node Set:</div>`;
      html += `<div class="reachable-badge-row">${cleanReachable.join(' ')}</div>`;
    }

    reachableList.innerHTML = html;
  }
}

// Render dynamic domain comparison table
function renderComparisonTable(step) {
  const tbody = document.getElementById("comparison-table-body");
  if (!tbody) return;

  const step0 = STEPS[0];
  const stepFinal = STEPS[STEPS.length - 1];

  let html = "";
  step0.variables.forEach(v => {
    const initDom = `{${v.domain.join(', ')}}`;

    // In step 4 (filtering), we show the final pruned domains, otherwise show pending status
    let prunedDom = "—";
    let status = "Pending";
    let statusClass = "none";

    if (step.phase === 'filtering') {
      const currentPruned = step.pruned_domains[v.name] || [];
      prunedDom = `{${currentPruned.join(', ')}}`;

      const removed = v.domain.filter(x => !currentPruned.includes(x));
      if (removed.length > 0) {
        status = `Pruned: ${removed.join(', ')}`;
        statusClass = "del";
      } else {
        status = "No pruning";
        statusClass = "none";
      }
    } else {
      prunedDom = "Pending";
      status = "Waiting...";
    }

    html += `
      <tr>
        <td class="var-name-cell">${v.name}</td>
        <td class="dom-cell">${initDom}</td>
        <td class="dom-cell">${prunedDom}</td>
        <td><span class="tag ${statusClass}">${status}</span></td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

// Build and export Markdown string of comparison table (Requirement 5)
function getMarkdownTable() {
  if (!STEPS.length) return "";
  const step0 = STEPS[0];
  const stepFinal = STEPS[STEPS.length - 1];

  let md = "# Regin's AllDifferent Filtering Comparison Table\n\n";
  md += "This table compares the variable domains before and after running Regin's global filtering algorithm for the `AllDifferent` constraint.\n\n";
  md += "| Variable | Initial Domain | Pruned Domain | Status / Removed Values |\n";
  md += "| :--- | :--- | :--- | :--- |\n";

  // Retrieve final pruned domains
  const pruned = stepFinal.pruned_domains || {};
  step0.variables.forEach(v => {
    const initialDom = `{${v.domain.join(', ')}}`;
    const prunedDomList = pruned[v.name] || v.domain;
    const prunedDom = `{${prunedDomList.join(', ')}}`;

    const removed = v.domain.filter(x => !prunedDomList.includes(x));
    const status = removed.length ? `Pruned values: ${removed.join(', ')}` : "No values pruned";

    md += `| \`${v.name}\` | \`${initialDom}\` | \`${prunedDom}\` | ${status} |\n`;
  });

  const satisfiable = stepFinal.phase === 'filtering' ? (stepFinal.variables.every(v => v.domain.length > 0) && Object.keys(stepFinal.matching).length === stepFinal.variables.length) : true;
  md += `\n**Constraint Satisfiable**: ${satisfiable} (A complete maximum matching of size ${Object.keys(stepFinal.matching).length} was found).\n`;

  return md;
}

// Download markdown file helper
function downloadMarkdown() {
  const md = getMarkdownTable();
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "regin_comparison_table.md");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Perform rendering updates on step changes
function render() {
  if (!STEPS.length) return;
  const step = STEPS[current];

  // Core text updates
  document.getElementById('step-badge').textContent = `Step ${step.step_no}`;
  document.getElementById('phase-label').textContent = step.phase.replace('_', ' ');
  document.getElementById('step-title').textContent = step.title;
  document.getElementById('step-desc').textContent = step.description;

  // Render views
  renderGraph(step);
  renderDomains(step);
  renderStepDetails(step);
  renderComparisonTable(step);

  // Progress Bar & Step counters
  const progressPercent = STEPS.length > 1 ? (current / (STEPS.length - 1)) * 100 : 100;
  document.getElementById('progress-fill').style.width = `${progressPercent}%`;
  document.getElementById('step-counter').textContent = `${current + 1} / ${STEPS.length}`;

  // Nav buttons disabled status
  document.getElementById('btn-prev').disabled = current === 0;
  document.getElementById('btn-next').disabled = current === STEPS.length - 1;
}

// Navigation wrapper
function go(dir) {
  current = Math.max(0, Math.min(STEPS.length - 1, current + dir));
  render();
}

// Keyboard controls handler
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    go(1);
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    go(-1);
  }
});

// File Loader from server/disk with CORS fallback banner
async function loadFile(fileName) {
  try {
    const response = await fetch(fileName);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    loadTraceData(data);
    hideCorsWarning();
  } catch (err) {
    console.warn(`CORS block or file not found for ${fileName}. Loading embedded trace instead!`, err);
    loadTraceData(FALLBACK_TRACE);
    showCorsWarning(fileName);
  }
}

// CORS warning banner management
function showCorsWarning(fileName) {
  const warningEl = document.getElementById('cors-warning') || createCorsWarningElement();
  warningEl.innerHTML = `⚠️ Running via <code>file://</code>. CORS blocked direct fetch of <code>${fileName}</code>. Loaded the embedded offline fallback trace instead!`;
  warningEl.style.display = 'block';
}

function createCorsWarningElement() {
  const el = document.createElement('div');
  el.id = 'cors-warning';
  document.body.insertBefore(el, document.body.firstChild);
  return el;
}

function hideCorsWarning() {
  const warningEl = document.getElementById('cors-warning');
  if (warningEl) {
    warningEl.style.display = 'none';
  }
}

// INITIALIZATION & EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  // Style toggle event handler
  const styleToggle = document.getElementById('animation-style-toggle');
  const toggleStatus = document.getElementById('toggle-status');

  styleToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      toggleStatus.textContent = 'Animation (Fade)';
    } else {
      toggleStatus.textContent = 'Static Highlight';
    }
    render();
  });

  // Download button handler
  document.getElementById('btn-download-md').addEventListener('click', downloadMarkdown);

  // Scenario select event handler
  document.getElementById('trace-select').addEventListener('change', (e) => {
    const file = e.target.value;
    if (file === 'custom') return;
    loadFile(file);
  });

  // Uploader triggers
  document.getElementById('btn-upload').addEventListener('click', () => {
    document.getElementById('trace-upload').click();
  });

  document.getElementById('trace-upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const data = JSON.parse(evt.target.result);
        loadTraceData(data);
        hideCorsWarning();

        // Add to dropdown list and select
        const select = document.getElementById('trace-select');
        let customOpt = select.querySelector('option[value="custom"]');
        if (!customOpt) {
          customOpt = document.createElement('option');
          customOpt.value = 'custom';
          select.appendChild(customOpt);
        }
        customOpt.textContent = `Uploaded: ${file.name}`;
        select.value = 'custom';
      } catch (err) {
        alert("Error parsing uploaded trace JSON: " + err.message);
      }
    };
    reader.readAsText(file);
  });

  // Fetch default trace
  loadFile('../data/all_different_trace.json');
});
