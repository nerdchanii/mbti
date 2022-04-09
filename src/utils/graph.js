import G6 from "@antv/g6";

const FONT_SIZE = {
  NODE: 32,
  EDGE: 24,
};

function getStroke(score) {
  if (score === "VERY_GOOD") return "#2D8FF4";
  if (score === "GOOD") return "#36B162";
  if (score === "SOSO") return "#FBC140";
  if (score === "BAD") return "#FF5F00";
  if (score === "VERY_BAD") return "#F03A36";
  throw new Error("invalid score");
}

function getScore(score) {
  if (score === "VERY_GOOD") return "천생연분";
  if (score === "GOOD") return "좋음";
  if (score === "SOSO") return "그닥";
  if (score === "BAD") return "안좋음";
  if (score === "VERY_BAD") return "파국";
  throw new Error("invalid score");
}

function getOrigin(data) {
  return {
    nodes: data.users.map((user) => {
      return {
        id: `node_${user.id}`,
        label: user.name,
        comboId: `combo_${user.id}`,
        labelCfg: { style: { fontSize: FONT_SIZE.NODE } },
      };
    }),
    edges: data.matches.map((match) => {
      return {
        id: null,
        source: `combo_${match.sourceId}`,
        target: `combo_${match.targetId}`,
        label: getScore(match.score),
        labelCfg: {
          style: { fontSize: FONT_SIZE.EDGE, fill: getStroke(match.score) },
        },
        style: {
          stroke: getStroke(match.score),
          lineWidth: 8,
        },
      };
    }),
    combos: data.users.map((user) => {
      return {
        id: `combo_${user.id}`,
        label: user.mbti,
        style: {
          stroke: "#DADBDC",
          lineWidth: 4,
          fill: "#FFFFFF",
        },
      };
    }),
  };
}

// $(document).ready(function () {
//   $.ajax({
//     url: "https://mbti-api.ttbkk.com/api/mbti/055a8a88-7a9f-4522-9525-5a39a08699ed",
//     method: "get",
//     contentType: "application/json; charset=utf-8",
//   }).done(function (data) {
//     renderGraph(data);
//   });
// });

export function renderGraph(data) {
  const nodeLength = getOrigin(data).nodes.length;

  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const _width = parseFloat(
    window.getComputedStyle(document.getElementById("mountNode")).width
  );

  let _height;
  if (nodeLength === 2) {
    _height = _width * 0.6;
  } else {
    if (_width >= windowHeight * 0.75) {
      _height = windowHeight * 0.75;
    } else {
      _height = _width;
    }
  }

  const _fitViewPadding = 10;

  let _nodeSize;
  if (nodeLength === 1) {
    _nodeSize = 50;
  } else if (nodeLength <= 4) {
    _nodeSize = _width * 0.15;
  } else if (nodeLength <= 6) {
    _nodeSize = _width * 0.12;
  } else {
    _nodeSize = _width * 0.09;
  }

  let _comboFontSize;
  if (_width <= 400) {
    _comboFontSize = 10;
  } else if (_width <= 600) {
    _comboFontSize = 16;
  } else {
    _comboFontSize = 24;
  }
  const graph = new G6.Graph({
    container: "mountNode",
    fitView: nodeLength > 1,
    fitViewPadding: _fitViewPadding,
    width: _width,
    height: _height,
    groupByTypes: false,
    layout: {
      type: "circular",
    },
    defaultNode: {
      type: "circle",
      size: _nodeSize,
      style: {
        lineWidth: 0,
        fill: "transparent",
        cursor: "pointer",
      },
      labelCfg: {
        offset: 8,
        style: {
          fontSize: _comboFontSize,
          fontFamily: "DearPistachio",
          cursor: "pointer",
        },
      },
    },
    defaultEdge: {
      style: {
        stroke: "#F0F1F2",
        lineWidth: 10,
      },
      labelCfg: {
        autoRotate: true,
        refY: 24,
        style: {
          fontWeight: "bold",
        },
      },
    },
    defaultCombo: {
      style: {
        cursor: "pointer",
      },
      labelCfg: {
        position: "bottom",
        refY: _nodeSize * -1 * 0.3,
        style: {
          fontSize: _comboFontSize,
          fill: "#AAAAAC",
          fontFamily: "DearPistachio",
          fontWeight: "bold",
          cursor: "pointer",
        },
      },
    },

    comboStateStyles: {
      selected: {
        stroke: "#55ACEE",
        lineWidth: 8,
      },
    },
  });

  graph.on("combo:click", (event) => {
    const comboId = event.item.getModel().id;
    const memberNo = comboId.replace("combo_", "");

    toggleComboSelectedState(graph, memberNo);
    toggleEdge(graph, memberNo, getOrigin(data));
  });

  graph.on("combo:mouseover", (event) => {
    const comboId = event.item.getModel().id;
    const memberNo = comboId.replace("combo_", "");

    toggleComboSelectedState(graph, memberNo);
    toggleEdge(graph, memberNo, getOrigin(data));
  });

  graph.on("node:click", (event) => {
    const nodeId = event.item.getModel().id;
    const memberNo = nodeId.replace("node_", "");

    toggleComboSelectedState(graph, memberNo);
    toggleEdge(graph, memberNo, getOrigin(data));
  });

  graph.on("node:mouseover", (event) => {
    const nodeId = event.item.getModel().id;
    const memberNo = nodeId.replace("node_", "");
    toggleComboSelectedState(graph, memberNo);
    toggleEdge(graph, memberNo, getOrigin(data));
  });

  graph.on("node:mouseout", (e) => {
    toggleComboSelectedState(graph, "");
    toggleEdge(graph, "", getOrigin(data));
  });

  graph.on("node:mouseleave", (event) => {
    toggleComboSelectedState(graph, "");
    toggleEdge(graph, "", getOrigin(data));
  });

  graph.data(getOrigin(data));
  graph.fitCenter();
  graph.render();

  // 초기화
  toggleComboSelectedState(graph, "");
  toggleEdge(graph, "", getOrigin(data));
}

function toggleComboSelectedState(graph, memberNo) {
  graph.getCombos().forEach((combo) => {
    graph.setItemState(
      combo,
      "selected",
      combo.getModel().id === "combo_" + memberNo
    );
  });
}

function toggleEdge(graph, targetMemberNo, origin) {
  graph.getEdges().forEach((edge) => {
    const model = edge.getModel();
    if (
      model.source === "combo_" + targetMemberNo ||
      model.target === "combo_" + targetMemberNo
    ) {
      const targetEdgeData = origin.edges.find(function (dataEdge) {
        return (
          dataEdge.source === model.source && dataEdge.target === model.target
        );
      });

      if (targetEdgeData) {
        console.log(model, targetEdgeData);
        model.style.stroke = targetEdgeData.style.stroke;
        // model.style.stroke = '#FF5F00';
        model.label = targetEdgeData.label;
        edge.toFront();
      }
    } else {
      model.style.stroke = "#F0F1F2";
      model.label = "";
      edge.toBack();
    }
  });

  //graph.paint();
  graph.refresh();
}
