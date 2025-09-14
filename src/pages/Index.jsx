import React, { useRef, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trading3D from "../components/sidebarcomponents/Trading3D";
import StatCard from "../components/sidebarcomponents/StatCard";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Filter,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { Authservices } from "../services/AuthServices";
import Config from "../config";

function StatusBadge(props) {
  const raw = String(props.status ?? "").toLowerCase();
  const state =
    raw === "open" ? "open" : raw === "watch" ? "watch" : raw === "closed" ? "closed" : "unknown";

  const cls =
    state === "open"
      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-700/30"
      : state === "watch"
      ? "bg-rose-500/10 text-rose-300 border border-rose-700/30"
      : "bg-slate-500/10 text-slate-300 border border-slate-700/30";

  return (
    <span className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium ${cls}`}>
      {state === "open" ? "Open" : state === "watch" ? "Watch" : "Closed"}
    </span>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const currentUser = Authservices.currentUserValue ?? null;
    if (!currentUser) {
      Authservices.logout();
      navigate(Config.signInPath);
      return;
    }

    const demo = [];
    for (let i = 0; i < 250; i++) {
      demo.push({
        symbol: "NIFTY",
        strategy: "Momentum",
        qty: 50,
        avg: 22250.25,
        pnl: 1340.45,
        status: "Open",
      });
    }
    setRows(demo);
  }, [navigate]);

  const onQueryCellInfo = (args) => {
    if (args.column?.field === "pnl") {
      const v = Number(args.data?.pnl ?? 0);
      args.cell.style.color = v >= 0 ? "var(--ct-gain)" : "var(--ct-loss)";
      args.cell.style.fontWeight = 600;
    }
  };

  const enableLiveSearch = useCallback(() => {
    const input = gridRef.current?.element?.querySelector(".e-search input");
    if (input && !input.dataset.liveSearch) {
      input.dataset.liveSearch = "1";
      input.addEventListener("input", (e) => {
        gridRef.current?.search(e.target.value);
      });
    }
  }, []);

  const onGridCreated = useCallback(() => {
    enableLiveSearch();
    const grid = gridRef.current;
    if (grid?.autoFitColumns) grid.autoFitColumns();
  }, [enableLiveSearch]);

  return (
    <div className="[font-size:clamp(14px,0.9vw,18px)]">
      <div className="mx-auto w-full max-w-screen-xl 2xl:max-w-[1600px] px-4 sm:px-6 xl:px-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Welcome back. Your trading overview and live visualization.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Net P/L (Today)" value="+ ₹12,467.90" note="Across 3 strategies" tone="emerald" />
          <StatCard title="Win Rate" value="62.4%" note="Last 30 sessions" tone="cyan" />
          <StatCard title="Open Risk" value="₹1,250" note="Total position risk" tone="indigo" />
          <StatCard title="Max Drawdown" value="-3.8%" note="Rolling 90-day" tone="rose" />
        </div>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">Market Visual (3D)</h2>
          <Trading3D />
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <h3 className="text-white font-medium">Recent Positions</h3>
            <span className="text-xs text-slate-500">demo data</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-slate-400">
                <tr className="border-b border-slate-800">
                  <th className="px-4 py-2 text-left">Symbol</th>
                  <th className="px-4 py-2 text-left">Strategy</th>
                  <th className="px-4 py-2 text-right">Qty</th>
                  <th className="px-4 py-2 text-right">Avg Price</th>
                  <th className="px-4 py-2 text-right">P/L</th>
                  <th className="px-4 py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { s: "NIFTY 50", st: "Momentum", q: 2, a: 22780.5, pl: 1450.3, ok: true },
                  { s: "BANKNIFTY", st: "Theta Pro", q: 1, a: 48550.0, pl: -322.4, ok: false },
                  { s: "TCS", st: "Breakout", q: 15, a: 3845.2, pl: 612.1, ok: true },
                  { s: "INFY", st: "Swing", q: 12, a: 1535.7, pl: -92.3, ok: false },
                ].map((r, i) => (
                  <tr key={i} className="border-b border-slate-900/70">
                    <td className="px-4 py-2">{r.s}</td>
                    <td className="px-4 py-2 text-slate-300">{r.st}</td>
                    <td className="px-4 py-2 text-right">{r.q}</td>
                    <td className="px-4 py-2 text-right">₹{r.a.toLocaleString("en-IN")}</td>
                    <td className={`px-4 py-2 text-right ${r.pl >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {r.pl >= 0 ? "+" : "-"}₹{Math.abs(r.pl).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <span
                        className={`rounded-md px-2 py-1 text-xs ${
                          r.ok
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-700/30"
                            : "bg-rose-500/10 text-rose-300 border border-rose-700/30"
                        }`}
                      >
                        {r.ok ? "Open" : "Watch"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="ctech-theme ctech-card p-4 md:p-6">
          <GridComponent
            id="dashboard-grid"
            ref={gridRef}
            dataSource={rows}
            height={420}
            width="100%"
            gridLines="Vertical"
            allowPaging
            allowSorting
            allowFiltering
            enableAdaptiveUI
            rowHeight={42}
            queryCellInfo={onQueryCellInfo}
            toolbar={["Search"]}
            created={onGridCreated}
            dataBound={enableLiveSearch}
            pageSettings={{ pageCount: 5, pageSize: 12 }}
          >
            <ColumnsDirective>
              <ColumnDirective field="symbol" headerText="Symbol" width="120" />
              <ColumnDirective field="strategy" headerText="Strategy" width="150" />
              <ColumnDirective field="qty" headerText="Qty" type="number" textAlign="Right" width="90" />
              <ColumnDirective field="avg" headerText="Avg Price" type="number" textAlign="Right" format="N2" width="120" />
              <ColumnDirective field="pnl" headerText="P/L (₹)" type="number" textAlign="Right" format="N2" width="120" />
              <ColumnDirective field="status" headerText="Status" width="110" template={StatusBadge} />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Toolbar]} />
          </GridComponent>
        </div>
      </div>
    </div>
  );
}
