"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";

import { GraphNode } from "./GraphNode";
import {
  GRAPH_VIEWBOX,
  getEdgePath,
  graphEdges,
  graphNodeMap,
  graphNodes,
  graphScenario,
  mobileFlow,
} from "./graph-data";
import styles from "./EcosystemGraph.module.css";

const PAUSE_BETWEEN_LOOPS_MS = 2800;

const KIND_LABEL: Record<string, string> = {
  hub: "AI",
  product: "Продукт",
  entity: "Сущность",
  integration: "Интеграция",
  model: "Модель",
  person: "Люди",
  tool: "Tools",
};

export function EcosystemGraph() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35, once: false });
  const reducedMotion = Boolean(useReducedMotion());

  const [stepIndex, setStepIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [signalKey, setSignalKey] = useState(0);

  const step = graphScenario[stepIndex] ?? graphScenario[0];
  const activeEdgeSet = useMemo(() => new Set(step.edges), [step.edges]);
  const activeNodeSet = useMemo(() => new Set(step.nodes), [step.nodes]);
  const hasActiveHighlight = activeNodeSet.size > 0;

  useEffect(() => {
    if (reducedMotion || paused || !inView) return;

    const isLast = stepIndex >= graphScenario.length - 1;
    const delay = step.durationMs + (isLast ? PAUSE_BETWEEN_LOOPS_MS : 0);

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % graphScenario.length);
      setSignalKey((key) => key + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [step.durationMs, stepIndex, paused, inView, reducedMotion]);

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.canvas}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${GRAPH_VIEWBOX.width} ${GRAPH_VIEWBOX.height}`}
          role="img"
          aria-label="Граф экосистемы DIOS: продукты, сущности, интеграции и модели, связанные через DIOS AI"
        >

          <g>
            {graphEdges.map((edge) => {
              const from = graphNodeMap[edge.from];
              const to = graphNodeMap[edge.to];
              if (!from || !to) return null;

              const path = getEdgePath(from, to);
              const active = activeEdgeSet.has(edge.id) && !paused && inView;

              return (
                <g key={edge.id}>
                  <path
                    d={path}
                    className={[
                      styles.connection,
                      edge.kind === "local" ? styles.connectionLocal : "",
                      edge.kind === "action" ? styles.connectionAction : "",
                      edge.kind === "model" ? styles.connectionModel : "",
                      active ? styles.connectionActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                  <path
                    key={`${edge.id}-${signalKey}-${active ? "on" : "off"}`}
                    d={path}
                    pathLength={100}
                    className={[
                      styles.signal,
                      edge.kind === "context" || edge.kind === "local"
                        ? styles.signalContext
                        : "",
                      edge.kind === "action" ? styles.signalAction : "",
                      edge.kind === "model" ? styles.signalModel : "",
                      active && !reducedMotion ? styles.signalActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={
                      {
                        "--signal-duration": `${Math.max(1.4, step.durationMs / 1000)}s`,
                      } as CSSProperties
                    }
                  />
                </g>
              );
            })}
          </g>

          <g>
            {graphNodes.map((node) => (
              <GraphNode
                key={node.id}
                node={node}
                active={activeNodeSet.has(node.id)}
                dimmed={hasActiveHighlight && !reducedMotion}
              />
            ))}
          </g>
        </svg>
      </div>

      {!reducedMotion ? (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.pauseButton}
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
          >
            {paused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}
            {paused ? "Запустить" : "Пауза"}
          </button>
        </div>
      ) : null}

      <div className={styles.mobileFlow} aria-label="Сценарий экосистемы DIOS">
        {mobileFlow.map((item, index) => (
          <div key={item.id}>
            {index > 0 ? <div className={styles.mobileConnector} aria-hidden /> : null}
            <div className={styles.mobileStep}>
              <span className={styles.mobileIndex}>{index + 1}</span>
              <span className={styles.mobileLabel}>{item.label}</span>
              <span className={styles.mobileKind}>{KIND_LABEL[item.kind]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
