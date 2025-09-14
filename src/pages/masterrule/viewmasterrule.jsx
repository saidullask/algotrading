import { useRef, useState, useCallback, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Filter,
  Toolbar,
  Inject,
  DetailRow,
} from "@syncfusion/ej2-react-grids";
import { useNavigate } from "react-router-dom";
import { TradeRuleServices } from "../../services/traderuleservices";
import { Authservices } from "../../services/AuthServices";
import Config from "../../config";
import { useToast } from "../../components/ToastHost";
import SectionBlurLoader from "../../components/SectionBlurLoader";
const Bullish = "Bull";
const normId = (v) => (v == null ? "" : String(v));

function ViewMasterRuleInner() {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const toast = useToast();

  const [rules, setRuleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setPageLoading] = useState(false);
  const openIdsRef = useRef(new Set());
  const stickyIdRef = useRef("");
  const needsRestoreRef = useRef(false);


  const showGridSpinner = () => { try { gridRef.current?.showSpinner?.(); } catch { } };
  const hideGridSpinner = () => { try { gridRef.current?.hideSpinner?.(); } catch { } };

  const rememberOpen = (id) => {
    const k = normId(id);
    if (k) openIdsRef.current.add(k);
  };
  const forgetOpen = (id) => {
    const k = normId(id);
    if (k) openIdsRef.current.delete(k);
  };

  const snapshotExpandedFromDom = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const rows = grid.getRows ? grid.getRows() : [];
    const next = new Set();
    for (let i = 0; i < rows.length; i++) {
      const tr = rows[i];
      const isOpen = tr.nextElementSibling?.classList?.contains("e-detailrow");
      if (isOpen) {
        const info = grid.getRowInfo ? grid.getRowInfo(tr) : null;
        const id = info?.data?.id ?? info?.data?.ruleId;
        if (id != null) next.add(String(id));
      }
    }
    openIdsRef.current = next;
  }, []);

  const expandById = useCallback((id) => {
    const grid = gridRef.current;
    if (!grid) return;

    const idx = grid.getRowIndexByPrimaryKey(String(id));
    if (idx == null || idx < 0) return;
    try {
      grid.detailRowModule?.expand(idx);
    } catch {
      const tr = grid.getRowByIndex(idx);
      if (!tr) return;
      const drm = grid.detailRowModule;
      if (drm?.aria?.setExpand) drm.aria.setExpand(tr, true);
      else if (typeof drm?.setExpand === "function") drm.setExpand(tr, true);
      else if (typeof drm?.expand === "function") drm.expand(tr);
      else tr.querySelector(".e-detailrowcollapse, .e-detailrowexpand")
        ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  }, []);

  const restoreOpenRows = useCallback(() => {
    const priority = stickyIdRef.current || "";
    if (priority) requestAnimationFrame(() => expandById(priority));
    openIdsRef.current.forEach((id) => {
      if (!priority || id !== priority) {
        requestAnimationFrame(() => expandById(id));
      }
    });
  }, [expandById]);

  const loadInitialData = useCallback(async () => {
    try {
      setPageLoading(true);
      setLoading(true);
      showGridSpinner();

      const { masterRules = [] } = await TradeRuleServices.viewActiveMasterRules();

      const nextRows = await Promise.all(
        masterRules.map(async (x) => {
          const details = await TradeRuleServices.getMasterRuleFromId(x.ruleId);
          const switchingPriceOptions =
            (details?.strikePrices ?? []).map((sp) => ({ label: sp, value: sp }));

          return {
            id: String(x.ruleId),
            ruleName: x.ruleName,
            exchangeType: x.exchangeType.name,
            instrumentType: x.instrumentType.name,
            symbolName: x.symbolName,
            rootExchangeSymbol: x.rootExchangeSymbol,

            quantity: x.general.quantityInLots,
            limitPrice: x.general.limitPrice,
            isLimitPriceEnabled: x.general.isLimitPriceEnabled,
            triggerPrice: x.general.triggerPrice,
            isTriggerPriceEnabled: x.general.isTriggerPriceEnabled,

            bearExpiryDate: x.automated.expiryDate,
            bearSwitchingPrice: x.automated.switchingPrice,
            bearCallPutOption: x.automated.callPutOption.name,

            bullExpiryDate: x.manual.expiryDate,
            bullSwitchingPrice: x.manual.currentBullPrice,
            bullCallPutOption: x.manual.callPutOption.name,
            startingPrice: x.manual.startingPrice,

            ruleState: x.ruleState,
            strategy: x.strategy,
            switchingPriceOptions,
          };
        })
      );

      setRuleData(nextRows);
      setPageLoading(false);
      const available = new Set(nextRows.map((r) => r.id));
      for (const id of Array.from(openIdsRef.current)) {
        if (!available.has(id)) openIdsRef.current.delete(id);
      }
      if (stickyIdRef.current && !available.has(stickyIdRef.current)) {
        stickyIdRef.current = "";
      }

      needsRestoreRef.current = true;
    } catch (err) {
      toast.error("Failed to load data.");
    } finally {
      hideGridSpinner();
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const currentUser = Authservices.currentUserValue ?? null;
    if (currentUser === null) {
      navigate(Config.signInPath);
      return;
    }
    loadInitialData();
  }, [navigate, loadInitialData]);

  const onDataBound = () => {
    if (!needsRestoreRef.current) return;
    needsRestoreRef.current = false;
    restoreOpenRows();
  };

  const onDetailDataBound = (args) => {
    rememberOpen(args?.data?.id);
  };

  const onActionComplete = (args) => {
    if (args?.requestType === "detailCollapse") {
      forgetOpen(args?.data?.id);
    }
  };

  const RuleStateBadge = (props) => {
    const state = String(props.ruleState || "").toLowerCase();
    let chip = "px-3 py-1 rounded-md text-xs font-semibold border ";
    let color = "bg-slate-600 text-white border-slate-500";
    switch (state) {
      case "running": color = "bg-blue-100 text-blue-700 border-blue-200"; break;
      case "started": color = "bg-emerald-100 text-emerald-700 border-emerald-200"; break;
      case "paused": color = "bg-blue-200 text-blue-800 border-blue-300"; break;
      case "stopped": color = "bg-slate-200 text-slate-800 border-slate-300"; break;
      case "finished": color = "bg-gray-200 text-gray-800 border-gray-300"; break;
      case "created": color = "bg-amber-100 text-amber-800 border-amber-200"; break;
      case "terminated": color = "bg-red-100 text-red-700 border-red-200"; break;
      default: break;
    }
    const label = (props.ruleState || "UNKNOWN").toUpperCase();
    return <span className={chip + color}>{label}</span>;
  };

  const StrategyBadge = (props) => {
    const strat = String(props.strategy || "").toLowerCase();
    const isBull = strat === "bull";
    const base = "px-3 py-1 rounded-md text-xs font-semibold border ";
    const color = isBull ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : "bg-rose-100 text-rose-700 border-rose-200";
    return <span className={base + color}>{(props.strategy || "").toUpperCase()}</span>;
  };

  const onQueryCellInfo = (args) => {
    if (args.column.field === "pnl") {
      const value = args.data[args.column.field];
      args.cell.classList.add(value >= 0 ? "text-green-400" : "text-red-400");
    }
  };

  const DetailCard = (props) => {
    const [isRuleStart, setRuleStart] = useState(false);
    const [isRulePaush, setRulePaush] = useState(false);
    const [isRuleExit, setRuleExit] = useState(false);
    const [isRefresh, setRefresh] = useState(false);
    const [isFinalOfTheDay, setFinalOfTheDay] = useState(false);

    const isRunning = String(props.ruleState || "").toLowerCase() === "running";
    const isPaused = String(props.ruleState || "").toLowerCase() === "paused";
    const isTerminated = String(props.ruleState || "").toLowerCase() === "terminated";
    const isBullish = props?.strategy === Bullish;

    const headerCls = "text-base font-normal text-white bg-slate-800 rounded-t-md px-4 py-2 shadow-sm tracking-wide";
    const bodyCls = "bg-slate-900 p-4 rounded-b-md space-y-3 border border-t-0 border-slate-700";
    const labelCls = "text-slate-300";

    const prepareReload = () => {
      snapshotExpandedFromDom();
      const id = normId(props.id);
      stickyIdRef.current = id;
      rememberOpen(id);
      needsRestoreRef.current = true;
      setLoading(true);
      showGridSpinner();
    };
    const finalizeReload = () => {
      hideGridSpinner();
      setLoading(false);
    };

    const startRule = async (rule) => {
      try {
        setRuleStart(true);
        prepareReload();
        const res = await TradeRuleServices.startMasterRule(rule.ruleName);
        if (res.isSuccess) {
          toast.success(res.message);
          await loadInitialData();
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Failed to start rule");
      } finally {
        setRuleStart(false); finalizeReload();
      }
    };

    const paushedRule = async (rule) => {
      try {
        setRulePaush(true);
        prepareReload();
        const res = await TradeRuleServices.pauseMasterRule(rule.ruleName);
        if (res.isSuccess) {
          toast.success(res.message);
          await loadInitialData();
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Failed to pause rule");
      } finally {
        setRulePaush(false); finalizeReload();
      }
    };

    const exitRule = async (rule) => {
      try {
        setRuleExit(true);
        prepareReload();
        const res = await TradeRuleServices.exitMasterRule(rule.ruleName);
        if (res.isSuccess) {
          toast.success(res.message);
          await loadInitialData();
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Failed to exit rule");
      } finally {
        setRuleExit(false); finalizeReload();
      }
    };

    const refresh = async () => {
      try {
        setRefresh(true);
        prepareReload();
        await loadInitialData();
        toast.success("Refreshed");
      } catch {
        toast.error("Refresh failed");
      } finally {
        setRefresh(false); finalizeReload();
      }
    };

    const finalOfTheDay = async (rule) => {
      try {
        setFinalOfTheDay(true);
        prepareReload();
        const res = await TradeRuleServices.finalOrderOfTheDay(rule.ruleName);
        if (res.isSuccess) {
          toast.success(res.message);
          await loadInitialData();
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Failed to place final order of the day");
      } finally {
        setFinalOfTheDay(false); finalizeReload();
      }
    };

    return (
      <div className="p-6 rounded-xl bg-slate-900/95 text-white text-base border border-slate-700 space-y-8 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className={headerCls}>GENERAL</div>
            <div className={bodyCls}>
              <p><span className={labelCls}>Quantity:</span> {props.quantity ?? 0}</p>
              <p><span className={labelCls}>Limit Price:</span> {props.limitPrice ?? 0}</p>
              <p><span className={labelCls}>Trigger Price:</span> {props.triggerPrice ?? 0}</p>
            </div>
          </div>

          <div>
            <div className={headerCls}>{isBullish ? "BEAR" : "LONG"}</div>
            <div className={bodyCls}>
              <p><span className={labelCls}>{isBullish ? "BEAR" : "LONG"} Expiry Date:</span> {props.bearExpiryDate ?? "N/A"}</p>
              <p><span className={labelCls}>{isBullish ? "BEAR" : "LONG"} Switching Price:</span> {props.bearSwitchingPrice ?? 0}</p>
              <p><span className={labelCls}>{isBullish ? "BEAR" : "LONG"} Call/Put Option:</span> {props.bearCallPutOption ?? "N/A"}</p>
            </div>
          </div>

          <div>
            <div className={headerCls}>{isBullish ? "BULL" : "SHORT"}</div>
            <div className={bodyCls}>
              <p><span className={labelCls}>{isBullish ? "BULL" : "SHORT"} Expiry Date:</span> {props.bullExpiryDate ?? "N/A"}</p>
              <p><span className={labelCls}>{isBullish ? "BULL" : "SHORT"} Starting Price:</span> {props.startingPrice ?? 0}</p>
              <p><span className={labelCls}>{isBullish ? "BULL" : "SHORT"} Current Price:</span> {props.bullSwitchingPrice ?? 0}</p>
              <p><span className={labelCls}>{isBullish ? "BULL" : "SHORT"} Call/Put Option:</span> {props.bullCallPutOption ?? "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-slate-700 mt-6 pt-4 text-sm font-normal" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => startRule(props)} disabled={isRuleStart || isRunning || isTerminated} aria-busy={isRuleStart}
            className={["px-4 py-2 rounded-md shadow text-white",
              (isRuleStart || isRunning || isTerminated) ? "bg-emerald-600 opacity-60 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"].join(" ")}
            title={isRunning ? "Already running" : isTerminated ? "Terminated rules cannot be started" : "Start"}>
            {isRuleStart ? "STARTING..." : "START"}
          </button>

          <button onClick={() => paushedRule(props)} disabled={isRulePaush || isPaused || isTerminated} aria-busy={isRulePaush}
            className={["px-4 py-2 rounded-md shadow text-white",
              (isRulePaush || isPaused || isTerminated) ? "bg-blue-600 opacity-60 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"].join(" ")}
            title={isPaused ? "Already paused" : isTerminated ? "Terminated rules cannot be paused" : "Pause"}>
            {isRulePaush ? "PAUSING..." : "PAUSE"}
          </button>

          <button onClick={() => exitRule(props)} disabled={isRuleExit || isTerminated} aria-busy={isRuleExit}
            className={["px-4 py-2 rounded-md shadow text-white",
              (isRuleExit || isTerminated) ? "bg-red-600 opacity-60 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"].join(" ")}
            title={isTerminated ? "Already terminated" : "Square off & exit"}>
            {isRuleExit ? "EXIT..." : "SQUARE OFF & EXIT"}
          </button>

          <button onClick={refresh} disabled={isRefresh} aria-busy={isRefresh}
            className={["px-4 py-2 rounded-md shadow text-white",
              isRefresh ? "bg-blue-600 opacity-60 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"].join(" ")}>
            {isRefresh ? "REFRESHING..." : "REFRESH"}
          </button>

          <button onClick={() => finalOfTheDay(props)} disabled={isFinalOfTheDay || isTerminated} aria-busy={isFinalOfTheDay}
            className={["px-4 py-2 rounded-md shadow",
              (isFinalOfTheDay || isTerminated) ? "bg-yellow-400 opacity-60 cursor-not-allowed text-black" : "bg-yellow-400 hover:bg-yellow-500 text-black"].join(" ")}
            title={isTerminated ? "Already terminated" : "Place final order of the day"}>
            {isFinalOfTheDay ? "PROCEEDING..." : "FINAL ORDER OF THE DAY"}
          </button>
        </div>
      </div>
    );
  };

  const detailTemplate = (props) => <DetailCard {...props} />;

  return (
    <>
      <SectionBlurLoader
        loading={isPageLoading}
        text="loading…"
      >


        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 hidden sm:block">
                  <svg viewBox="0 0 48 48" className="h-10 w-10 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 8v32M12 16h8M12 32h8M36 8v32M28 16h8M28 32h8" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white">View Master Rule</h1>
                  <p className="mt-1 text-slate-400">Define your trading logic once — deploy across strategies with confidence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative ctech-theme ctech-card p-4 md:p-1 mt-6">
          <div
            className={[
              "absolute inset-0 z-20 transition-opacity",
              loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            ].join(" ")}
            style={{ background: "rgba(2,6,23,0.45)" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="h-10 w-10 rounded-full border-4 border-white/30 border-t-white animate-spin" />
            </div>
          </div>

          <GridComponent
            ref={gridRef}
            dataSource={rules}
            gridLines="Vertical"
            allowPaging
            allowSorting
            allowFiltering
            queryCellInfo={onQueryCellInfo}
            toolbar={["Search"]}
            detailTemplate={detailTemplate}
            loadingIndicator={{ indicatorType: "Shimmer" }}
            dataBound={onDataBound}
            detailDataBound={onDetailDataBound}
            actionComplete={onActionComplete}
          >
            <ColumnsDirective>
              <ColumnDirective field="id" isPrimaryKey={true} visible={false} />
              <ColumnDirective field="ruleState" headerText="Rule State" width="140" template={RuleStateBadge} />
              <ColumnDirective field="strategy" headerText="Strategy" width="120" template={StrategyBadge} />
              <ColumnDirective field="ruleName" headerText="Rule Name" width="300" />
              <ColumnDirective field="exchangeType" headerText="Exchange Type" width="140" />
              <ColumnDirective field="instrumentType" headerText="Instrument Type" width="150" />
              <ColumnDirective field="symbolName" headerText="Symbol Name" width="120" />
              <ColumnDirective field="rootExchangeSymbol" headerText="Root Exchange Symbol" width="200" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Toolbar, DetailRow]} />
          </GridComponent>
        </div>
      </SectionBlurLoader>
    </>
  );
}

export default function ViewMasterRule() {
  return (
    <ViewMasterRuleInner />
  );
}
