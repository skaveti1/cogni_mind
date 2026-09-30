import Image from "next/image";

export function SceneBackdrop({
  src,
  priority = false,
  intensity = 1,
}: {
  src: string;
  priority?: boolean;
  intensity?: number;
}) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,15,0.92)_0%,rgba(20,18,15,0.34)_34%,rgba(20,18,15,0.58)_62%,rgba(20,18,15,0.96)_100%)]"
        style={{ opacity: intensity }}
      />
    </div>
  );
}
