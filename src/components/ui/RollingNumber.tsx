"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const DIGIT_HEIGHT_EM = 1.1;
/** Extra full drum revolutions before landing on the target digit */
const EXTRA_REVOLUTIONS = 1;

function RollingDigit({
  digit,
  index,
  animate,
  reducedMotion,
}: {
  digit: number;
  index: number;
  animate: boolean;
  reducedMotion: boolean;
}) {
  const target = reducedMotion
    ? digit
    : EXTRA_REVOLUTIONS * 10 + digit;

  return (
    <span
      aria-hidden="true"
      className="inline-block overflow-hidden"
      style={{ height: `${DIGIT_HEIGHT_EM}em` }}
    >
      <motion.span
        className="flex flex-col will-change-transform"
        initial={false}
        animate={{
          y: animate ? `-${target * DIGIT_HEIGHT_EM}em` : "0em",
        }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 1.28 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }
        }
      >
        {Array.from({ length: EXTRA_REVOLUTIONS * 10 + 10 }, (_, i) => (
          <span
            key={i}
            className="block shrink-0"
            style={{
              height: `${DIGIT_HEIGHT_EM}em`,
              lineHeight: `${DIGIT_HEIGHT_EM}`,
            }}
          >
            {i % 10}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function RollingNumber({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reducedMotion = Boolean(useReducedMotion());

  const integer = Math.max(0, Math.trunc(value));
  const digits = String(integer).split("").map(Number);
  const label = `${prefix}${integer}${suffix}`;
  const shouldAnimate = inView || reducedMotion;

  return (
    <span
      ref={ref}
      className={[
        "inline-flex items-baseline font-(family-name:--font-display) font-semibold tracking-[-0.065em] tabular-nums",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="sr-only">{label}</span>

      <span aria-hidden="true" className="inline-flex items-baseline">
        {prefix ? <span className="mr-[0.08em]">{prefix}</span> : null}
        {digits.map((digit, index) => (
          <RollingDigit
            key={`${digits.length}-${index}`}
            digit={digit}
            index={index}
            animate={shouldAnimate}
            reducedMotion={reducedMotion}
          />
        ))}
        {suffix ? <span>{suffix}</span> : null}
      </span>
    </span>
  );
}
