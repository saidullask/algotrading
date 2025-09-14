import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DropDownList as EJ2DropDownList } from "@syncfusion/ej2-dropdowns";
import { Clientservices } from "../../services/clientservices";
import { Authservices } from "../../services/AuthServices";
import Config from "../../config";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ToastHost";
import SectionBlurLoader from "../../components/SectionBlurLoader";
const DialogThemeStyles = () => (
    <style>{`
  .ctech-dialog-dark.e-dialog {
    border-radius: 16px !important;
    overflow: hidden;
    background: #0b1220;
    box-shadow: 0 12px 36px rgba(0,0,0,.65);
  }
  .ctech-dialog-dark .e-dlg-header-content {
    background: linear-gradient(180deg, #0f172a 0%, #0b1220 100%) !important;
    color: #e2e8f0;
    border-bottom: 1px solid rgba(148, 163, 184, .15);
    padding-top: 14px; padding-bottom: 14px;
  }
  .ctech-dialog-dark .e-dlg-header, .ctech-dialog-dark .e-dlg-header * {
    color: #e2e8f0 !important; font-weight: 700; letter-spacing: .2px;
  }
  .ctech-dialog-dark .e-dlg-closeicon-btn .e-btn-icon { color: #94a3b8 !important; }
  .ctech-dialog-dark .e-dlg-closeicon-btn:hover .e-btn-icon { color: #22c55e !important; }
  .ctech-dialog-dark .e-dlg-content { background: #0b1220; padding: 16px 18px 18px 18px !important; }
  `}</style>
);

function ViewClient() {
    const toast = useToast();
    const navigate = useNavigate();

    const [clientDetails, setClientDetails] = useState([]);
    const [clientTypes, setClientTypes] = useState([]);

    const filterSettings = { type: "Excel" };
    const toolbarOptions = ["Add", "Edit", "Search"];
    const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: "Dialog" };
    const pageSettings = { pageCount: 5 };
    const clientIdRules = { required: true };

    const gridWrapRef = useRef(null);
    const [dialogTarget, setDialogTarget] = useState(null);

    const gridRef = useRef(null);
    const [gridKey, setGridKey] = useState(0);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isStrategyOpen, setStrategyOpen] = useState(false);
    const [savingStrategy, setSavingStrategy] = useState(false);
    const [strategyOptions, setStrategyOptions] = useState([]);
    const [strategyForm, setStrategyForm] = useState({
        strategyId: 0,
        clientStrategyStatusId: null,
        quantityInLots: "",
        expiryDate: "",
    });

    const [isAddOpen, setAddOpen] = useState(false);
    const [savingNew, setSavingNew] = useState(false);
    const [addForm, setAddForm] = useState({
        clientName: "",
        clientCode: "",
        description: "",
        clientTypeId: null,
        clientType: "",
        email: "",
        phoneNumber: "",
        status: "Registered",
    });

    const gridAreaStyle = {
        position: "relative",
        minHeight: 520,
    };

    const mapClientRow = (x) => ({
        id: x.id,
        clientTypeId: x.clientTypeId,
        clientCode: x.clientCode,
        clientName: x.clientName,
        description: x.description,
        status: x.status,
        clientType: x.clientType,
    });

    const loadInitialData = useCallback(async () => {
        try {
            setIsLoading(true);
            const [clients, clientTyps] = await Promise.all([
                Clientservices.getClientBasicDetails(),
                Clientservices.getClientType(),
            ]);

            setClientDetails((clients?.clients ?? []).map(mapClientRow));
            setClientTypes(
                (clientTyps?.clientTypes ?? []).map((x) => ({
                    label: x.name,
                    value: x.id,
                }))
            );
            setIsLoading(false);
            return true;
        } catch (err) {
            toast.error(err);
            setIsLoading(false);
            return false;
        }
    }, []);

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

    useEffect(() => {
        setDialogTarget(gridWrapRef.current ?? document.body);
    }, []);

    const clientTypesRef = useRef(clientTypes);
    useEffect(() => {
        clientTypesRef.current = clientTypes;
    }, [clientTypes]);

    const renderClientTypeCell = (props) => {
        const label =
            clientTypesRef.current.find((x) => x.value === props.clientTypeId)?.label ?? "—";
        return <span>{label}</span>;
    };

    const clientTypeEditorInst = useRef(null);

    const clientTypeCustomEditor = {
        create: () => {
            const input = document.createElement("input");
            input.className = "e-input";
            return input;
        },
        write: (args) => {
            const currentValue =
                args?.rowData?.clientTypeId ?? args?.value ?? null;

            clientTypeEditorInst.current = new EJ2DropDownList({
                dataSource: clientTypesRef.current,
                fields: { text: "label", value: "value" },
                value: currentValue,
                placeholder: "Select client type",
                allowFiltering: true,
                popupHeight: "300px",
            });

            clientTypeEditorInst.current.appendTo(args.element);
        },
        read: () => {
            return clientTypeEditorInst.current ? clientTypeEditorInst.current.value : null;
        },
        destroy: () => {
            if (clientTypeEditorInst.current) {
                clientTypeEditorInst.current.destroy();
                clientTypeEditorInst.current = null;
            }
        },
    };
    const onClientTypeChange = (e) => {
        const id = typeof e.value === "string" ? Number(e.value) : e.value;
        const labelFromEvent = e?.itemData?.label ?? e?.itemData?.text;
        const fallbackLabel =
            (Array.isArray(clientTypes)
                ? clientTypes.find((x) => x.value === id)?.label
                : "") || "";
        setAddForm((p) => ({
            ...p,
            clientTypeId: id,
            clientType: labelFromEvent || fallbackLabel,
        }));
    };

    const StatusBadge = (props) => {
        const v = String(props.status || "");
        let cls =
            "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ";
        switch (v) {
            case "Registered":
                cls += "bg-emerald-600/10 text-emerald-400 border-emerald-700/30";
                break;
            case "NotRegistered":
                cls += "bg-amber-500/10 text-amber-400 border-amber-700/30";
                break;
            case "Suspended":
                cls += "bg-rose-600/10 text-rose-400 border-rose-700/30";
                break;
            case "PaymentPending":
                cls += "bg-blue-600/10 text-blue-400 border-blue-700/30";
                break;
            case "DeActivated":
                cls += "bg-slate-600/10 text-slate-300 border-slate-700/30";
                break;
            default:
                cls += "bg-slate-600/10 text-slate-300 border-slate-700/30";
                break;
        }
        return <span className={cls}>{v || "UNKNOWN"}</span>;
    };

    const DetailsButton = (props) => {
        return (
            <button
                type="button"
                className="px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 ring-1 ring-emerald-400/20 shadow-sm"
                onClick={() => openDetails(props)}
            >
                Details
            </button>
        );
    };

    const openDetails = async (row) => {
        try {
            setLoadingDetails(true);
            setDialogOpen(true);
            const res = await Clientservices.getClientById(row.id);
            if (res?.isSuccess) {
                setSelectedClient(res.clientData);
            } else {
                setSelectedClient({
                    clientName: row.clientName,
                    clientCode: row.clientCode,
                    description: row.description,
                    clientType: row.clientType,
                    status: row.status,
                    email: "",
                    phoneNumber: "",
                    clientStrategies: [],
                });
            }
        } catch (e) {
            console.error(e);
            setSelectedClient({
                clientName: row.clientName,
                clientCode: row.clientCode,
                description: row.description,
                clientType: row.clientType,
                status: row.status,
                email: "",
                phoneNumber: "",
                clientStrategies: [],
            });
        } finally {
            setLoadingDetails(false);
        }
    };

    const onUpdateStrategy = async (s) => {
        try {
            const res = await Clientservices.getClientStrategyStatus();
            if (res?.isSuccess) {
                const opts = (res.strategyStatusDetails || []).map((st) => ({
                    text: st.value,
                    value: st.id,
                }));
                setStrategyOptions(opts);
            }
            setStrategyForm({
                strategyId: s.clientStrategyId ?? s.id,
                clientStrategyStatusId: s.clientStrategyStatusId ?? null,
                quantityInLots: s.quantityInLots ?? "",
                expiryDate: s.expiryDate ?? "",
            });
            setStrategyOpen(true);
        } catch (e) {
            console.error(e);
        }
    };

    const isStrategyValid = () => {
        const { clientStrategyStatusId, quantityInLots, expiryDate } = strategyForm;
        if (!clientStrategyStatusId) return false;
        const q = Number(quantityInLots);
        if (!Number.isFinite(q) || q <= 0) return false;
        if (!expiryDate) return false;
        return true;
    };

    const saveStrategy = async () => {
        if (!isStrategyValid()) return;
        const { strategyId, clientStrategyStatusId, expiryDate, quantityInLots } = strategyForm;
        setSavingStrategy(true);
        try {
            const res = await Clientservices.updateClientStrategy(
                strategyId,
                clientStrategyStatusId,
                expiryDate,
                quantityInLots
            );

            if (res?.isSuccess) {
                let freshClient = null;
                if (selectedClient?.id) {
                    const fresh = await Clientservices.getClientById(selectedClient.id, { _t: Date.now() });
                    if (fresh?.isSuccess) {
                        freshClient = fresh.clientData;
                        setSelectedClient(freshClient);
                    }
                }

                if (freshClient?.id) {
                    setClientDetails((prev) =>
                        prev.map((r) =>
                            r.id === freshClient.id
                                ? {
                                    ...r,
                                    status: freshClient.status ?? r.status,
                                    clientType: freshClient.clientType ?? r.clientType,
                                    clientTypeId: freshClient.clientTypeId ?? r.clientTypeId,
                                    description: freshClient.description ?? r.description,
                                }
                                : r
                        )
                    );
                }

                await loadInitialData();
                gridRef.current?.refresh();
                setGridKey((k) => k + 1);

                toast.success?.(res.message ?? "Updated");
                setStrategyOpen(false);
            } else {
                toast.error?.(res?.message || "Update failed");
            }
        } catch (e) {
            toast.error?.(e?.message || "Unexpected error");
        } finally {
            setSavingStrategy(false);
        }
    };


    const onActionBegin = async (args) => {
        if (args.requestType === "save" && args.action === "edit") {
            args.cancel = true;
            const grid = gridRef.current;
            const d = args.data || {};
            try {
                grid?.showSpinner?.();

                const res = await Clientservices.updateClient(
                    d.id,
                    d.clientName?.trim?.() ?? d.clientName,
                    d.description ?? "",
                    Number(d.clientTypeId) || null,
                );

                if (res?.isSuccess) {
                    setClientDetails((prev) =>
                        prev.map((r) =>
                            r.id === payload.id
                                ? {
                                    ...r,
                                    clientCode: payload.clientCode,
                                    clientName: payload.clientName,
                                    description: payload.description,
                                    clientTypeId: payload.clientType,
                                    clientType:
                                        clientTypesRef.current.find((x) => x.value === payload.clientType)?.label || r.clientType,
                                    status: payload.status,
                                }
                                : r
                        )
                    );

                    await loadInitialData();
                    grid?.refresh?.();
                    setGridKey((k) => k + 1);

                    toast.success?.(res.message ?? "Client updated");
                    grid?.closeEdit?.();
                } else {
                    toast.error?.(res?.message || "Update failed");
                }
            } catch (e) {
                console.error(e);
                toast.error?.(e?.message || "Unexpected error");
            } finally {
                grid?.hideSpinner?.();
            }
        }
    };

    const onToolbarClick = (args) => {
        const id = args?.item?.id || "";

        if (id.endsWith("_add")) {
            args.cancel = true;
            openAddDialog();
            return;
        }

        if (id.endsWith("_edit")) {
            const grid = gridRef.current;
            const selected = grid?.getSelectedRecords?.() || [];
            if (!selected.length) {
                args.cancel = true;
                toast.warning?.("Select a row to edit");
                return;
            }
            args.cancel = true;
            grid.startEdit();
            return;
        }
    };

    const openAddDialog = () => {
        setAddForm({
            clientName: "",
            clientCode: "",
            description: "",
            clientTypeId: null,
            clientType: "",
            email: "",
            phoneNumber: "",
            status: "Registered",
        });
        setAddOpen(true);
    };

    const isAddValid = () => {
        if (!addForm.clientName?.trim()) return false;
        if (!addForm.clientCode?.trim()) return false;
        if (!addForm.clientTypeId) return false;
        return true;
    };

    const saveNewClient = async () => {
        if (!isAddValid()) return;
        setSavingNew(true);
        try {
            const newClientData = [
                {
                    clientCode: addForm.clientCode,
                    clientName: addForm.clientName,
                    description: addForm.description,
                    clientType: addForm.clientTypeId,
                },
            ];

            const created = await Clientservices.addClient(newClientData);

            if (!created?.isSuccess) {
                console.error(created?.message || "Create client failed");
                toast.error?.(created?.message || "Create client failed");
                setSavingNew(false);
                return;
            }

            await loadInitialData();
            gridRef.current?.refresh();
            setGridKey((k) => k + 1);

            toast.success?.(created?.message || "Client created");
            setAddOpen(false);
        } catch (e) {
            console.error(e);
            toast.error?.(e?.message || "Unexpected error");
        } finally {
            setSavingNew(false);
        }
    };

    return (
        <>

            <SectionBlurLoader
                loading={isLoading}
                text="loading…"
            >
                <div className="flex flex-col gap-6">
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
                                        <h1 className="text-2xl md:text-3xl font-extrabold text-white">View/Add/Update Client Details</h1>
                                        <p className="mt-1 text-slate-400">Define your trading logic once — deploy across strategies with confidence.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="control-pane">
                        <DialogThemeStyles />
                        <div
                            id="client-grid-host"
                            ref={gridWrapRef}
                            className="control-section"
                            style={gridAreaStyle}
                        >
                            <GridComponent
                                key={gridKey}
                                ref={gridRef}
                                dataSource={clientDetails}
                                toolbar={toolbarOptions}
                                allowPaging
                                allowSorting
                                allowFiltering
                                filterSettings={filterSettings}
                                editSettings={editSettings}
                                pageSettings={pageSettings}
                                height={420}
                                selectionSettings={{ type: "Single", mode: "Row" }}
                                toolbarClick={onToolbarClick}
                                actionBegin={onActionBegin}
                            >
                                <ColumnsDirective>
                                    <ColumnDirective field="id" visible={false} isPrimaryKey={true} />
                                    <ColumnDirective field="clientName" headerText="Client Name" validationRules={clientIdRules} />
                                    <ColumnDirective field="clientCode" headerText="Client Code" validationRules={clientIdRules} />
                                    <ColumnDirective field="description" headerText="Description" />
                                    <ColumnDirective
                                        field="clientTypeId"
                                        headerText="Client Type"
                                        template={renderClientTypeCell}
                                        edit={clientTypeCustomEditor}
                                        validationRules={clientIdRules}
                                    />

                                    <ColumnDirective
                                        field="status"
                                        headerText="Status"
                                        template={StatusBadge}
                                        allowEditing={false}
                                    />
                                    <ColumnDirective
                                        headerText="Action"
                                        width="110"
                                        textAlign="Center"
                                        allowEditing={false}
                                        template={DetailsButton}
                                    />
                                </ColumnsDirective>

                                <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
                            </GridComponent>
                        </div>

                        <DialogComponent
                            visible={isDialogOpen}
                            isModal={true}
                            showCloseIcon={true}
                            header="Client Details"
                            width="960px"
                            position={{ X: "center", Y: "center" }}
                            target={dialogTarget || document.body}
                            overlayClick={() => setDialogOpen(false)}
                            close={() => setDialogOpen(false)}
                            cssClass="ctech-dialog-dark"
                            allowDragging={false}
                        >
                            {!selectedClient ? (
                                <div className="py-8 text-center text-slate-300">
                                    {loadingDetails ? "Loading details…" : "No details found."}
                                </div>
                            ) : (
                                <div className="space-y-5 text-slate-200">
                                    <div className="grid grid-cols-3 gap-6 text-[15px]">
                                        <div>
                                            <div><b>Client Name :</b> {selectedClient.clientName || "—"}</div>
                                            <div><b>Email :</b> {selectedClient.email || "—"}</div>
                                            <div><b>Status :</b> {selectedClient.status || "—"}</div>
                                        </div>
                                        <div>
                                            <div><b>ClientCode :</b> {selectedClient.clientCode || "—"}</div>
                                            <div><b>PhoneNumber :</b> {selectedClient.phoneNumber || "—"}</div>
                                        </div>
                                        <div>
                                            <div><b>Description :</b> {selectedClient.description || "—"}</div>
                                            <div><b>ClientType :</b> {selectedClient.clientType || "—"}</div>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <div className="text-sm font-semibold mb-2 text-slate-300">Strategies</div>
                                        <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/40">
                                            <table className="w-full text-sm">
                                                <thead className="bg-slate-800/80 text-slate-200">
                                                    <tr>
                                                        <th className="text-left p-3">Strategy Name</th>
                                                        <th className="text-right p-3">QuantityInLots</th>
                                                        <th className="text-left p-3">ExpiryDate</th>
                                                        <th className="text-left p-3">ClientStrategyStatus</th>
                                                        <th className="text-center p-3">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(selectedClient.clientStrategies) && selectedClient.clientStrategies.length ? (
                                                        selectedClient.clientStrategies.map((s) => (
                                                            <tr key={s.id} className="border-t border-slate-800">
                                                                <td className="p-3">{s.strategyType}</td>
                                                                <td className="p-3 text-right">{s.quantityInLots}</td>
                                                                <td className="p-3">{s.expiryDate}</td>
                                                                <td className="p-3">{s.clientStrategyStatus}</td>
                                                                <td className="p-3 text-center">
                                                                    <button
                                                                        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 ring-1 ring-emerald-400/20 shadow-sm"
                                                                        onClick={() => onUpdateStrategy(s)}
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className="p-4 text-center text-slate-400" colSpan={5}>
                                                                No strategy data
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </DialogComponent>

                        <DialogComponent
                            visible={isStrategyOpen}
                            isModal={true}
                            showCloseIcon={true}
                            header="Update Strategy"
                            width="560px"
                            position={{ X: "center", Y: "center" }}
                            target={dialogTarget || document.body}
                            overlayClick={() => setStrategyOpen(false)}
                            close={() => setStrategyOpen(false)}
                            cssClass="ctech-dialog-dark"
                            allowDragging={false}
                        >
                            <div className="space-y-5 text-slate-200">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-400 mb-1">Client Strategy Status</label>
                                        <DropDownListComponent
                                            dataSource={strategyOptions}
                                            fields={{ text: "text", value: "value" }}
                                            placeholder="Select status"
                                            popupHeight="240px"
                                            value={strategyForm.clientStrategyStatusId}
                                            change={(e) =>
                                                setStrategyForm((p) => ({ ...p, clientStrategyStatusId: e.value }))
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs text-slate-400 mb-1">Quantity In Lots</label>
                                        <input
                                            type="number"
                                            min={1}
                                            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                            value={strategyForm.quantityInLots}
                                            onChange={(e) =>
                                                setStrategyForm((p) => ({ ...p, quantityInLots: e.target.value }))
                                            }
                                            placeholder="0"
                                        />
                                        {Number(strategyForm.quantityInLots) <= 0 && (
                                            <div className="mt-1 text-[11px] text-rose-400">Enter a valid positive quantity.</div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs text-slate-400 mb-1">Expiry Date</label>
                                        <input
                                            type="date"
                                            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                            value={strategyForm.expiryDate}
                                            onChange={(e) =>
                                                setStrategyForm((p) => ({ ...p, expiryDate: e.target.value }))
                                            }
                                        />
                                        {!strategyForm.expiryDate && (
                                            <div className="mt-1 text-[11px] text-rose-400">Pick an expiry date.</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-2">
                                    <button
                                        className="px-4 py-2 rounded-md bg-slate-700 text-white hover:bg-slate-600"
                                        onClick={() => setStrategyOpen(false)}
                                        disabled={savingStrategy}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={[
                                            "px-4 py-2 rounded-md text-white font-medium",
                                            isStrategyValid() && !savingStrategy
                                                ? "bg-emerald-600 hover:bg-emerald-500"
                                                : "bg-emerald-700/40 cursor-not-allowed",
                                        ].join(" ")}
                                        onClick={saveStrategy}
                                        disabled={!isStrategyValid() || savingStrategy}
                                    >
                                        {savingStrategy ? (
                                            <span className="inline-flex items-center gap-2">
                                                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                Saving…
                                            </span>
                                        ) : (
                                            "Save"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </DialogComponent>

                        <DialogComponent
                            visible={isAddOpen}
                            isModal={true}
                            showCloseIcon={true}
                            header="Add Client"
                            width="640px"
                            position={{ X: "center", Y: "center" }}
                            target={dialogTarget || document.body}
                            overlayClick={() => setAddOpen(false)}
                            close={() => setAddOpen(false)}
                            cssClass="ctech-dialog-dark"
                            allowDragging={false}
                        >
                            <div className="space-y-5 text-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-400 mb-1">Client Name *</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                            value={addForm.clientName}
                                            onChange={(e) => setAddForm((p) => ({ ...p, clientName: e.target.value }))}
                                            placeholder="Client Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400 mb-1">Client Code *</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                            value={addForm.clientCode}
                                            onChange={(e) => setAddForm((p) => ({ ...p, clientCode: e.target.value }))}
                                            placeholder="e.g., C001"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-xs text-slate-400 mb-1">Description</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                            value={addForm.description}
                                            onChange={(e) => setAddForm((p) => ({ ...p, description: e.target.value }))}
                                            placeholder="Optional notes"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs text-slate-400 mb-1">Client Type *</label>
                                        <DropDownListComponent
                                            dataSource={clientTypes}
                                            fields={{ text: "label", value: "value" }}
                                            placeholder="Select client type"
                                            popupHeight="260px"
                                            value={addForm.clientTypeId}
                                            change={onClientTypeChange}
                                        />
                                    </div>
                                </div>

                                {!isAddValid() && (
                                    <div className="text-[11px] text-rose-400">Client Name, Client Code and Client Type are required.</div>
                                )}

                                <div className="flex items-center justify-end gap-2 pt-2">
                                    <button
                                        className="px-4 py-2 rounded-md bg-slate-700 text-white hover:bg-slate-600"
                                        onClick={() => setAddOpen(false)}
                                        disabled={savingNew}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={[
                                            "px-4 py-2 rounded-md text-white font-medium",
                                            isAddValid() && !savingNew
                                                ? "bg-emerald-600 hover:bg-emerald-500"
                                                : "bg-emerald-700/40 cursor-not-allowed",
                                        ].join(" ")}
                                        onClick={saveNewClient}
                                        disabled={!isAddValid() || savingNew}
                                    >
                                        {savingNew ? (
                                            <span className="inline-flex items-center gap-2">
                                                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                Saving…
                                            </span>
                                        ) : (
                                            "Save"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </DialogComponent>
                    </div>
                </div>
            </SectionBlurLoader>
        </>
    );
}

export default ViewClient;
