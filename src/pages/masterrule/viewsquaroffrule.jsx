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

export default function ViewSquarOffMasterRulue() {
    const navigate = useNavigate();
    const toast = useToast();
    const gridRef = useRef(null);

    const [rules, setRuleData] = useState([]);
    const [isPageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false);          

    const loadInitialData = useCallback(async () => {
        setPageLoading(true);
        setLoading(true);
        try {
            const { masterRules = [] } = await TradeRuleServices.viewSquarOffMasterRules();

            const nextRows = await Promise.all(
                masterRules.map(async (x) => {
                    return {
                        id: x.ruleId,
                        ruleId: x.ruleId,
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
                        bearExpiryDate: x.
                            automated
                            .expiryDate,
                        bearSwitchingPrice: x.
                            automated
                            .switchingPrice,
                        bearCallPutOption: x.
                            automated
                            .callPutOption.name,
                        bullExpiryDate: x.
                            manual
                            .expiryDate,
                        bullSwitchingPrice: x.
                            manual
                            .startingPrice,
                        bullCallPutOption: x.
                            manual
                            .callPutOption.name,
                        ruleState: x.ruleState,
                    };
                })
            );

            setRuleData(nextRows);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load data.");
        } finally {
            setPageLoading(false);
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

    const onQueryCellInfo = (args) => {
        if (args.column.field === "pnl") {
            const value = args.data[args.column.field];
            args.cell.classList.add(value >= 0 ? "text-green-400" : "text-red-400");
        }
    };

    const RuleStateBadge = (props) => {
        let chip = "px-3 py-1 rounded-md text-xs font-semibold border ";
        let color = "bg-red-100 text-red-700 border-red-200";
        const label = (props.ruleState || "UNKNOWN").toUpperCase();
        return <span className={chip + color}>{label}</span>;
    };

    const DetailCard = (props) => {
        const isBullish = String(props?.strategy || "").toLowerCase() === "bull";
        const headerCls =
            "text-base font-normal text-white bg-slate-800 rounded-t-md px-4 py-2 shadow-sm tracking-wide";
        const bodyCls =
            "bg-slate-900 p-4 rounded-b-md space-y-3 border border-t-0 border-slate-700";
        const labelCls = "text-slate-300";

        return (
            <div className="p-6 rounded-xl bg-slate-900/95 text-white text-base border border-slate-700 space-y-8 font-sans">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <div className={headerCls}>GENERAL</div>
                        <div className={bodyCls}>
                            <p>
                                <span className={labelCls}>Quantity:</span>{" "}
                                {props.quantity ?? 0}
                            </p>
                            <p>
                                <span className={labelCls}>Limit Price:</span>{" "}
                                {props.limitPrice ?? 0}
                            </p>
                            <p>
                                <span className={labelCls}>Trigger Price:</span>{" "}
                                {props.triggerPrice ?? 0}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className={headerCls}>{isBullish ? "BEAR" : "LONG"}</div>
                        <div className={bodyCls}>
                            <p>
                                <span className={labelCls}>
                                    {isBullish ? "BEAR" : "LONG"} Expiry Date:
                                </span>{" "}
                                {props.bearExpiryDate ?? "N/A"}
                            </p>
                            <p>
                                <span className={labelCls}>
                                    {isBullish ? "BEAR" : "LONG"} Switching Price:
                                </span>{" "}
                                {props.bearSwitchingPrice ?? 0}
                            </p>
                            <p>
                                <span className={labelCls}>
                                    {isBullish ? "BEAR" : "LONG"} Call/Put Option:
                                </span>{" "}
                                {props.bearCallPutOption ?? "N/A"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className={headerCls}>{isBullish ? "BULL" : "SHORT"}</div>
                        <div className={bodyCls}>
                            <p>
                                <span className={labelCls}>
                                    {isBullish ? "BULL" : "SHORT"} Expiry Date:
                                </span>{" "}
                                {props.bullExpiryDate ?? "N/A"}
                            </p>
                            <p>
                                <span className={labelCls}>
                                    {isBullish ? "BULL" : "SHORT"} Starting Price:
                                </span>{" "}
                                {props.startingPrice ?? 0}
                            </p>
                            <p>
                                <span className={labelCls}>
                                    {isBullish ? "BULL" : "SHORT"} Current Price:
                                </span>{" "}
                                {props.bullSwitchingPrice ?? 0}
                            </p>
                            <p>
                                <span className={labelCls}>
                                    {isBullish ? "BULL" : "SHORT"} Call/Put Option:
                                </span>{" "}
                                {props.bullCallPutOption ?? "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const detailTemplate = (props) => <DetailCard {...props} />;

    return (
        <>
            <SectionBlurLoader loading={isPageLoading} text="loading…">
                <div className="space-y-6">
                    <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                        <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 hidden sm:block">
                                    <svg
                                        viewBox="0 0 48 48"
                                        className="h-10 w-10 text-emerald-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                    >
                                        <path d="M12 8v32M12 16h8M12 32h8M36 8v32M28 16h8M28 32h8" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                                        View Squar Off Master Rule
                                    </h1>
                                    <p className="mt-1 text-slate-400">
                                        Define your trading logic once — deploy across strategies
                                        with confidence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative ctech-theme ctech-card p-4 md:p-1 mt-6">
                    <div
                        className={[
                            "absolute inset-0 z-20 transition-opacity",
                            loading
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none",
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
                    >
                        <ColumnsDirective>
                            <ColumnDirective field="id" isPrimaryKey={true} visible={false} />
                            <ColumnDirective
                                field="ruleState"
                                headerText="Rule State"
                                width="140"
                                template={RuleStateBadge}
                            />
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
