import { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState
} from "reactflow";

import CustomNode from "./customNode";

import "reactflow/dist/style.css";
import { IExpression } from "../../models/expression";

interface IProps {
  onChange?: (value: string, data: any) => void;
  value?: IExpression[];
}

const initialEdges: Edge[] = [];

const nodeTypes = {
  custom: CustomNode
};

const BasicFlow = ({ onChange, value }: IProps) => {
    onChange
  const initialNodes: Node[] = value
    ? value.map((item, index) => {
        const storedPosition = localStorage.getItem(`nodePosition_${index}`);
        const position = storedPosition
          ? JSON.parse(storedPosition)
          : { x: 250, y: 5 + index * 100 };

        return {
          id: `${index}`,
          data: { label: item.personName },
          position
        };
      })
    : [];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnectRef = useRef<(params: Edge | Connection) => void>();

  useEffect(() => {
    onConnectRef.current = (params: Edge | Connection) =>
      setEdges((els) => addEdge(params, els));
  }, [setEdges]);

  useEffect(() => {
    const storedEdges = localStorage.getItem("flowEdges");
    if (storedEdges) {
      const parsedEdges = JSON.parse(storedEdges);
      if (parsedEdges && parsedEdges.length > 0) {
        setEdges(parsedEdges);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("flowEdges", JSON.stringify(edges));
  }, [edges]);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      if (onConnectRef.current) {
        onConnectRef.current(params);
      }
    },
    []
  );

  const onNodeMove = useCallback(
    (node: Node) => {
      localStorage.setItem(
        `nodePosition_${node.id}`,
        JSON.stringify(node.position)
      );
    },
    []
  );

  useEffect(() => {
    const storedNodePositions = Object.keys(localStorage).filter((key) =>
      key.startsWith("nodePosition_")
    );

    storedNodePositions.forEach((key) => {
      const nodeId = key.replace("nodePosition_", "");
      //@ts-ignore
      const nodePosition = JSON.parse(localStorage.getItem(key));

      if (nodePosition) {
        const updatedNodes = nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              position: nodePosition
            };
          }
          return node;
        });
        //@ts-ignore
        onNodesChange(updatedNodes);
      }
    });
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      //@ts-ignore
      onNodeDragStop={onNodeMove}
      fitView
      style={{ padding: "20%" }}
    >
      <Background />
    </ReactFlow>
  );
};

export default BasicFlow;
