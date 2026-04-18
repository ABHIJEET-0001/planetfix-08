import { useCounter } from "@/hooks/use-counter";

export function AnimatedNumber({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
}: { value: number; decimals?: number; suffix?: string; prefix?: string }) {
  const v = useCounter(value);
  return (
    <span>
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}
