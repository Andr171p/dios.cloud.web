import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

export function DiosMark({ className = "", priority = false }: Props) {
  return (
    <Image
      src="/brand/dios-mark.png"
      alt="DIOS"
      width={36}
      height={36}
      priority={priority}
      className={`h-9 w-9 object-contain ${className}`.trim()}
    />
  );
}
