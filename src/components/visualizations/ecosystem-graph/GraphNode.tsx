import type { GraphNodeData } from "./graph-data";
import styles from "./EcosystemGraph.module.css";

type Props = {
  node: GraphNodeData;
  active: boolean;
  dimmed: boolean;
};

const RADIUS = {
  sm: 18,
  md: 29,
  lg: 42,
} as const;

function entityWidth(label: string) {
  return Math.max(72, Math.min(138, label.length * 7.1 + 28));
}

function PersonGlyph({ size }: { size: number }) {
  return (
    <g transform={`scale(${size / 24}) translate(-12 -12)`} aria-hidden>
      <circle cx="12" cy="8.2" r="3.4" fill="currentColor" />
      <path
        d="M5.5 19.5c.9-3.4 3.2-5.1 6.5-5.1s5.6 1.7 6.5 5.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </g>
  );
}

export function GraphNode({ node, active, dimmed }: Props) {
  const size = node.size ?? "md";
  const radius = RADIUS[size];
  const className = [
    styles.node,
    active ? styles.nodeActive : "",
    dimmed && !active ? styles.nodeDimmed : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (node.kind === "entity") {
    const width = entityWidth(node.label);
    const height = 27;

    return (
      <g className={className} transform={`translate(${node.x} ${node.y})`}>
        <rect
          className={styles.entityChip}
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
          rx={height / 2}
        />
        <text className={styles.entityLabel} x={0} y={0}>
          {node.label}
        </text>
      </g>
    );
  }

  if (node.kind === "person") {
    const r = 20;
    return (
      <g className={className} transform={`translate(${node.x} ${node.y})`}>
        <circle className={styles.markCirclePerson} r={r} />
        <g className={styles.personGlyph}>
          <PersonGlyph size={22} />
        </g>
        <text className={styles.nodeTitle} x={0} y={r + 16}>
          {node.label}
        </text>
      </g>
    );
  }

  const isHub = node.kind === "hub";
  const isModel = node.kind === "model";
  const isIntegration = node.kind === "integration";
  const isTool = node.kind === "tool";
  const isProduct = node.kind === "product";
  const logoSize = isHub ? radius * 1.18 : radius * 1.08;
  const titleY = radius + (isHub ? 20 : 17);
  const captionY = radius + (isHub ? 36 : 31);
  const clipId = `clip-${node.id}`;

  return (
    <g className={className} transform={`translate(${node.x} ${node.y})`}>
      <defs>
        <clipPath id={clipId}>
          <circle r={radius - 1.5} />
        </clipPath>
      </defs>

      <circle
        className={[
          styles.markCircle,
          isHub ? styles.markCircleHub : "",
          isModel ? styles.markCircleModel : "",
          isIntegration ? styles.markCircleIntegration : "",
          isTool ? styles.markCircleTool : "",
          isProduct ? styles.markCircleProduct : "",
        ]
          .filter(Boolean)
          .join(" ")}
        r={radius}
      />

      {node.accent && isProduct ? (
        <circle
          className={styles.markRing}
          r={radius + 3.5}
          stroke={node.accent}
        />
      ) : null}

      {node.logoSrc ? (
        <image
          href={node.logoSrc}
          x={-logoSize / 2}
          y={-logoSize / 2}
          width={logoSize}
          height={logoSize}
          preserveAspectRatio="xMidYMid meet"
          clipPath={`url(#${clipId})`}
        >
          <title>{node.logoAlt ?? node.label}</title>
        </image>
      ) : node.monogram ? (
        <>
          {node.accent ? (
            <circle r={radius - 1.25} fill={node.accent} opacity={0.95} />
          ) : null}
          <text
            className={[
              styles.monogram,
              node.accent ? styles.monogramOnAccent : "",
            ]
              .filter(Boolean)
              .join(" ")}
            x={0}
            y={0}
          >
            {node.monogram}
          </text>
        </>
      ) : null}

      <text className={isHub ? styles.nodeTitleHub : styles.nodeTitle} x={0} y={titleY}>
        {node.label}
      </text>

      {node.caption && (isProduct || isModel || isHub || isTool) ? (
        <text className={styles.nodeCaption} x={0} y={captionY}>
          {node.caption}
        </text>
      ) : null}
    </g>
  );
}
