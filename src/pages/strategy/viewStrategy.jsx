import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Toolbar,
    Edit,
    Inject,
    Sort,
    Filter,
} from "@syncfusion/ej2-react-grids";
import { Clientservices } from "../../services/clientservices";
import { Authservices } from "../../services/AuthServices";
import Config from "../../config";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ToastHost";
import SectionBlurLoader from "../../components/SectionBlurLoader";
import ComboBox from "../../components/formcomponents/comboboxcomponent";

function ViewStrategy() {
    const toast = useToast();
    const navigate = useNavigate();

    const [strategies, setStrategies] = useState([]);
    const [clients, setClients] = useState([]);
    const pageSettings = { pageCount: 5 };
    const [addingIds, setAddingIds] = useState(new Set());
    const [isLoading, setLoading] = useState(false);

    const [strategyFilter, setStrategyFilter] = useState("");

    const loadInitialData = useCallback(async () => {
        try {
            setLoading(true);
            const [strategies] = await Promise.all([
                Clientservices.getClientStrategy()
            ]);
            setStrategies(
                strategies.strategies.map((x) => {
                    return {
                        label: x.value,
                        value: x.id
                    }
                })
            )

            setLoading(false);
            return true;
        } catch (err) {
            toast.error(err);
            setLoading(false);
            return false;
        }
    }, [toast]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        const u = Authservices.currentUserValue ?? null;
        if (!u) {
            Authservices.logout();
            navigate(Config.signInPath);
            return;
        }
        loadInitialData();
    }, [navigate, loadInitialData]);

    const onDropdownChang = (v) => {
        setLoading(true);
        Clientservices.getClients(v).then((res) => {
            setLoading(false);
            if (res.isSuccess) {
                setClients(
                    res.clientsData.map((x) => {
                        return {
                            id: x.clientId,
                            clientCode: x.clientCode,
                            clientName: x.clientName,
                            description: x.description,
                            email: x.email,
                            clientType: x.clientType,
                            status: x.status, 
                            phone: x.phoneNumber,
                            strategyName: x.strategy,
                            quantityInLots: x.quantityInLots
                        }
                    })
                )
            }
            else {
                toast.error(res.message);
            }
        },
            (error) => {
                setLoading(false);
                toast.error(error);
            }
        )
    }

    const StatusBadge = (props) => {
        const raw = (props && (props.status ?? props.Status)) ?? props;

        const idFromName = (name) => {
            switch ((name || "").toString().toLowerCase()) {
                case "registered": return 1;
                case "partofrunningrule": return 2;
                case "paymentpending": return 3;
                case "deactivated":
                case "deactivated".toLowerCase(): return 4;
                case "suspended": return 5;
                default: return null;
            }
        };

        let id = null;
        if (typeof raw === "number") id = raw;
        else if (typeof raw === "string") {
            const n = Number(raw);
            id = Number.isFinite(n) && raw.trim() !== "" ? n : idFromName(raw);
        } else if (props && typeof props === "object" && "status" in props) {
            const v = props.status;
            if (typeof v === "number") id = v;
            else if (typeof v === "string") {
                const n = Number(v);
                id = Number.isFinite(n) && v.trim() !== "" ? n : idFromName(v);
            }
        }

        const nameById = {
            1: "Registered",
            2: "PartOfRunningRule",
            3: "PaymentPending",
            4: "DeActivated",
            5: "Suspended",
        };
        const label = nameById[id] || "Unknown";

        let cls = "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ";
        switch (id) {
            case 1: 
                cls += "bg-emerald-600/10 text-emerald-400 border-emerald-700/30";
                break;
            case 2: 
                cls += "bg-indigo-500/10 text-indigo-400 border-indigo-700/30";
                break;
            case 3: 
                cls += "bg-amber-500/10 text-amber-400 border-amber-700/30";
                break;
            case 4: 
                cls += "bg-slate-600/10 text-slate-300 border-slate-700/30";
                break;
            case 5: 
                cls += "bg-rose-600/10 text-rose-400 border-rose-700/30";
                break;
            default:
                cls += "bg-slate-600/10 text-slate-300 border-slate-700/30";
                break;
        }

        return <span className={cls}>{label}</span>;
    };

    return (
        <>
            <SectionBlurLoader loading={isLoading} text="loading…">
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
                                        View Strategy
                                    </h1>
                                    <p className="mt-1 text-slate-400">
                                        Define your trading logic once — deploy across strategies with confidence.
                                    </p>
                                </div>
                            </div>

                            <div className="w-full md:w-auto">
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="min-w-[560px]">
                                            <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">
                                                Select Strategy
                                            </div>
                                            <ComboBox
                                                data={strategies}
                                                onChange={(v) => onDropdownChang(v)}
                                                placeholder="All strategies…"
                                            />
                                        </div>

                                        {strategyFilter && (
                                            <button
                                                type="button"
                                                onClick={() => setStrategyFilter("")}
                                                className="h-9 rounded-xl border border-slate-700 px-3 text-sm text-slate-200 hover:text-white hover:border-slate-600"
                                                title="Clear filter"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
                <div className="control-pane mt-6">
                    <GridComponent
                        dataSource={clients}
                        allowPaging
                        allowSorting
                        allowFiltering
                        pageSettings={pageSettings}
                        height={420}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field="id" visible={false} isPrimaryKey={true} />
                            <ColumnDirective field="clientName" headerText="Client Name" />
                            <ColumnDirective field="clientCode" headerText="Client Code" />
                            <ColumnDirective field="phone" headerText="Client Phone" />
                            <ColumnDirective field="email" headerText="Client Email" />
                            <ColumnDirective field="description" headerText="Description" />
                            <ColumnDirective field="clientType" headerText="Client Type" />
                            <ColumnDirective field="quantityInLots" headerText="Quantity In Lots" />
                            <ColumnDirective field="strategyName" headerText="Strategy Name" />
                            <ColumnDirective
                                field="status"
                                headerText="Status"
                                template={StatusBadge}
                            />
                        </ColumnsDirective>
                        <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
                    </GridComponent>
                </div>
            </SectionBlurLoader>
        </>
    );
}

export default ViewStrategy;
