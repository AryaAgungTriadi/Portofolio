export default function ArrowIcon({ direction = "diagonal" }: { direction?: "diagonal" | "up" | "down" }) {
  return <span aria-hidden="true" className="inline-block shrink-0 font-sans text-base leading-none font-semibold">{direction === "up" ? <>&#8593;</> : direction === "down" ? <>&#8595;</> : <>&#8599;</>}</span>;
}
