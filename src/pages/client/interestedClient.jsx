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
import { Clientservices } from "../../services/clientservices";
import { Authservices } from "../../services/AuthServices";
import Config from "../../config";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ToastHost";
import SectionBlurLoader from "../../components/SectionBlurLoader";
function InterestedClient() {
    const toast = useToast();
    const navigate = useNavigate();
    const [clientDetails, setClientDetails] = useState([]);
    const pageSettings = { pageCount: 5 };
    const [addingIds, setAddingIds] = useState(new Set());
    const [isLoading, setLoading] = useState(false);
    const loadInitialData = useCallback(async () => {
        try {
            setLoading(true);
            const [requestedClients] = await Promise.all([
                Authservices.getRequestedClient()
            ]);

            setClientDetails(
                (requestedClients?.userDetails ?? []).map((x) => ({
                    id: x.id,
                    clientName: x.name,
                    clientCode: x.clientCode,
                    email: x.email,
                    phone: x.phone,
                    address: x.address,
                }))
            );
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

    const addInterestedClient = async (row) => {
        const rowId = row?.id ?? row?.clientCode;
        setAddingIds((prev) => {
            const next = new Set(prev);
            next.add(rowId);
            return next;
        });
        try {
            const payload = [
                {
                    clientCode: row.clientCode,
                    clientName: row.clientName,
                    description: "",
                    quantity: 0,
                    email: row.email,
                    phoneNumber: row.phone
                }
            ];

            const res = await Clientservices.addClient(payload);

            if (res?.isSuccess) {
                toast.success?.(res?.message || "Client added");
                await loadInitialData();
            } else {
                toast.error?.(res?.message || "Failed to add client");
            }
        } catch (e) {
            toast.error?.(e?.message || "Unexpected error");
        } finally {
            setAddingIds((prev) => {
                const next = new Set(prev);
                next.delete(rowId);
                return next;
            });
        }
    };

    const DetailsButton = (props) => {
        const isLoading = addingIds.has(props?.id ?? props?.clientCode);
        return (
            <button
                type="button"
                className={[
                    "px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 ring-1 ring-emerald-400/20 shadow-sm",
                    isLoading ? "opacity-70 cursor-wait" : ""
                ].join(" ")}
                onClick={() => addInterestedClient(props)}
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Adding…
                    </span>
                ) : (
                    "Add To Client List"
                )}
            </button>
        );
    };

    return (

        <>
            <SectionBlurLoader
                loading={isLoading}
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
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-white">View Requested Client</h1>
                                    <p className="mt-1 text-slate-400">Define your trading logic once — deploy across strategies with confidence.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="control-pane mt-6" >
                    <GridComponent
                        dataSource={clientDetails}
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
                            <ColumnDirective field="email" headerText="Client Email" />
                            <ColumnDirective field="phone" headerText="Client Phone" />
                            <ColumnDirective field="address" headerText="Client Address" />
                            <ColumnDirective
                                headerText="Action"
                                textAlign="Center"
                                allowEditing={false}
                                template={DetailsButton}
                            />
                        </ColumnsDirective>
                        <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
                    </GridComponent>
                </div>
            </SectionBlurLoader>
        </>
    );
}

export default InterestedClient;
