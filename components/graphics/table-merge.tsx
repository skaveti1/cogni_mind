import type { CSSProperties } from "react";

type Styled = CSSProperties & Record<string, string | number>;

type MiniTable = {
  x: number;
  y: number;
  r: number;
  d: number;
  fd: number;
  w: number;
  accent?: boolean;
  head: string[];
  rows: string[][];
};

// A mess of source tables: different headers, schemas, formats and column sets.
const MESSY: MiniTable[] = [
  {
    x: -118,
    y: -168,
    r: -8,
    d: 0,
    fd: 0,
    w: 122,
    accent: true,
    head: ["PART NO", "DESC", "COST"],
    rows: [
      ["AB-1024", "Hyd valve 1/2", "184.00"],
      ["AB-1027", "Hyd valve 3/4", "211.00"],
    ],
  },
  {
    x: 104,
    y: -180,
    r: 7,
    d: 0.08,
    fd: 0.3,
    w: 112,
    head: ["ITEM", "NAME", "UOM", "PRICE"],
    rows: [["HV-050", "Valve, hyd .5in", "EA", "191.50"]],
  },
  {
    x: -4,
    y: -66,
    r: 2,
    d: 0.04,
    fd: 0.6,
    w: 128,
    head: ["SKU", "DESCRIPTION", "QTY"],
    rows: [
      ["10553", "Hyd valve 1/2", "12"],
      ["10554", "Hyd valve 3/4", "4"],
    ],
  },
  {
    x: -140,
    y: 26,
    r: 6,
    d: 0.12,
    fd: 0.9,
    w: 104,
    head: ["P/N", "VENDOR", "$"],
    rows: [["A-1024", "Acme", "178.00"]],
  },
  {
    x: 124,
    y: 8,
    r: -6,
    d: 0.16,
    fd: 0.2,
    w: 118,
    head: ["Part", "Description", "Each"],
    rows: [["HV50", 'Valve hydraulique .5"', "178"]],
  },
  {
    x: -34,
    y: 158,
    r: -4,
    d: 0.2,
    fd: 0.7,
    w: 122,
    head: ["MAT", "TEXT", "ME", "PRICE"],
    rows: [["1024", "VALVE 1/2 HYD", "EA", "178.00"]],
  },
  {
    x: 116,
    y: 172,
    r: 9,
    d: 0.24,
    fd: 0.5,
    w: 104,
    head: ["No.", "Item", "Cost"],
    rows: [["44333", "Hyd valve 0.5", "184.00"]],
  },
  {
    x: 14,
    y: -212,
    r: 4,
    d: 0.28,
    fd: 0.1,
    w: 96,
    head: ["ID", "DESC"],
    rows: [["V-1/2", "Hydraulic valve"]],
  },
];

const CLEAN_HEAD = ["SKU", "DESCRIPTION", "UOM", "PRICE"];
const CLEAN_COL = [
  "w-[80px] shrink-0",
  "min-w-0 flex-1",
  "w-[38px] shrink-0",
  "w-[62px] shrink-0",
];
const CLEAN_ROWS = [
  ["VALV-10024", "Hydraulic valve, 1/2 in", "EA", "$178.00"],
  ["FLNG-2040", "Flange, 2 in, 150#", "EA", "$42.10"],
  ["BRNG-6205", "Bearing, 6205-2RS", "EA", "$6.80"],
  ["GASK-1500", "Gasket, 1/2 in spiral", "EA", "$3.25"],
];

function MiniGrid({ table }: { table: MiniTable }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface shadow-[0_2px_8px_-4px_rgba(26,24,21,0.25)]">
      <div
        className={`flex border-b border-line ${
          table.accent ? "bg-amber-soft" : "bg-elevated"
        }`}
      >
        {table.head.map((cell) => (
          <span
            key={cell}
            className={`flex-1 truncate border-r border-line px-1.5 py-1 font-mono text-[7.5px] uppercase tracking-[0.06em] last:border-r-0 ${
              table.accent ? "text-amber" : "text-muted"
            }`}
          >
            {cell}
          </span>
        ))}
      </div>
      {table.rows.map((row, ri) => (
        <div key={ri} className="flex border-b border-line last:border-b-0">
          {row.map((cell, ci) => (
            <span
              key={ci}
              className={`flex-1 truncate border-r border-line px-1.5 py-1 text-[8px] last:border-r-0 ${
                ci === 0 ? "font-mono text-ink-soft" : "text-ink"
              }`}
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TableMerge() {
  return (
    <div className="merge-layer relative aspect-[4/5] w-full overflow-hidden">
      {/* Swarm of messy source tables */}
      {MESSY.map((table, i) => (
        <div
          key={i}
          className="merge-card absolute left-1/2 top-1/2"
          style={
            {
              "--x": `${table.x}px`,
              "--y": `${table.y}px`,
              "--r": `${table.r}deg`,
              "--d": `${table.d}s`,
              width: table.w,
            } as Styled
          }
        >
          <div
            className="merge-float"
            style={{ "--fd": `${table.fd}s` } as Styled}
          >
            <MiniGrid table={table} />
          </div>
        </div>
      ))}

      {/* Merge point */}
      <div className="absolute inset-0 z-10 grid place-items-center">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="merge-ring block h-44 w-44 rounded-full border border-accent/30" />
        </span>

        <div className="merge-result w-[94%] rounded-xl border border-line bg-surface p-3 shadow-[0_1px_2px_rgba(26,24,21,0.04),0_18px_40px_-24px_rgba(26,24,21,0.35)]">
          <div className="merge-badge mb-2.5 flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent">
              AI co-worker
            </span>
            <span className="ml-auto flex items-center gap-1 text-[0.6rem] text-muted">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="merge-check text-accent"
                pathLength={1}
              >
                <path d="M20 6 9 17l-5-5" pathLength={1} />
              </svg>
              8 merged
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-line">
            <div className="flex bg-elevated">
              {CLEAN_HEAD.map((cell, ci) => (
                <span
                  key={cell}
                  className={`${CLEAN_COL[ci]} truncate border-r border-line px-2 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.08em] text-muted last:border-r-0`}
                >
                  {cell}
                </span>
              ))}
            </div>
            {CLEAN_ROWS.map((row, ri) => (
              <div
                key={row[0]}
                data-i={ri}
                className="merge-row flex border-t border-line"
              >
                {row.map((cell, ci) => (
                  <span
                    key={ci}
                    className={`${CLEAN_COL[ci]} truncate border-r border-line px-2 py-1.5 text-[0.62rem] last:border-r-0 ${
                      ci === 0
                        ? "font-mono text-ink-soft"
                        : ci === 3
                          ? "font-mono text-accent"
                          : "text-ink"
                    }`}
                  >
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
