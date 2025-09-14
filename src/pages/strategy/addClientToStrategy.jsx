import React, { useCallback, useEffect, useMemo, useState } from "react";
import ComboBox from "../../components/formcomponents/comboboxcomponent";
import { Field, Input } from "../../components/formcomponents/input";
import SectionBlurLoader from "../../components/SectionBlurLoader";
import { Clientservices } from "../../services/clientservices";
import { Authservices } from "../../services/AuthServices";
import { useToast } from "../../components/ToastHost";
import { useNavigate } from "react-router-dom";
import Config from "../../config";

function Chip({ label, value, tone = "slate" }) {
    const toneCls =
        tone === "emerald"
            ? "text-emerald-300 border-emerald-700/40"
            : tone === "cyan"
                ? "text-cyan-300 border-cyan-700/40"
                : "text-slate-300 border-slate-700/40";
    return (
        <div className={`rounded-xl border ${toneCls} bg-slate-900/50 px-3 py-2`}>
            <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
            <div className="text-sm font-semibold">{value || "—"}</div>
        </div>
    );
}

function validate(values) {
    const e = {};
    if (!values.strategyId) e.strategyId = "Select a strategy.";
    if (!values.clientId) e.clientId = "Select a client.";
    if (!values.quantity || Number(values.quantity) <= 0) e.quantity = "Enter a positive quantity.";
    if (!values.expiryDate) e.expiryDate = "Pick an expiry date.";
    return e;
}

export default function AddAssignToClient() {
    const toast = useToast();
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const [strategyOptions, setStrategyOptions] = useState([]);
    const [clientOptions, setClientOptions] = useState([]);

    const [values, setValues] = useState({
        strategyId: "",
        strategyLabel: "",
        clientId: "",
        clientLabel: "",
        quantity: "",
        expiryDate: "", 
    });

    const [errors, setErrors] = useState({});

    const loadInitialData = useCallback(async () => {
        try {
            setLoading(true);

            const [strategiesRes, clientsRes] = await Promise.all([
                Clientservices.getClientStrategy(),
                Clientservices.getAllRegisterClient(),
            ]);

            const strategyOpts =
                (strategiesRes?.strategies ?? []).map((s) => ({
                    label: s.value,
                    value: s.id,
                })) || [];

            const clientOpts =
                (clientsRes?.clientsData ?? []).map((c) => ({
                    label: `${c.clientName} (${c.clientCode})`,
                    value: c.id,
                })) || [];

            setStrategyOptions(strategyOpts);
            setClientOptions(clientOpts);
        } catch (err) {
            toast.error(err?.message || "Failed to load data");
        } finally {
            setLoading(false);
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

    function setField(key, v, label) {
        setValues((p) => ({
            ...p,
            [key]: v,
            ...(key === "strategyId" ? { strategyLabel: label ?? p.strategyLabel } : {}),
            ...(key === "clientId" ? { clientLabel: label ?? p.clientLabel } : {}),
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = validate(values);
        setErrors(errs);
        if (Object.keys(errs).length) return;

        try {
            setLoading(true);
            const res = await Clientservices.assignClientToStrategy(
                values.clientId,
                values.strategyId,
                values.expiryDate,
                Number(values.quantity),
            );

            if (res?.isSuccess) {
                toast.success(res?.message || "Assigned successfully");
                setValues({ strategyId: "", strategyLabel: "", clientId: "", clientLabel: "", quantity: "", expiryDate: "" })
            } else {
                toast.error(res?.message || "Assignment failed");
            }
        } catch (err) {
            toast.error(err?.message || "Unexpected error");
        } finally {
            setLoading(false);
        }
    }

    const chips = useMemo(
        () => [
            { label: "Strategy", value: values.strategyLabel, tone: "cyan" },
            { label: "Client", value: values.clientLabel },
            { label: "Qty", value: values.quantity, tone: "emerald" },
            { label: "Expiry", value: values.expiryDate ? values.expiryDate.split("-").reverse().join("-") : "" },
        ],
        [values]
    );

    return (
        <SectionBlurLoader loading={isLoading} text="loading…">
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
                                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Assign Strategy to Client</h1>
                                <p className="mt-1 text-slate-400">Bind client positions to a trading strategy with quantity and expiry.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {chips.map((c) => (
                                <Chip key={c.label} label={c.label} value={c.value} tone={c.tone} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 md:p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            <Field label="Select Strategy*" error={errors.strategyId}>
                                <ComboBox
                                    data={strategyOptions}
                                    value={values.strategyId}
                                    onChange={(v, meta) => setField("strategyId", v, meta?.label)}
                                    placeholder="Select strategy…"
                                />
                            </Field>

                            <Field label="Select Client*" error={errors.clientId}>
                                <ComboBox
                                    data={clientOptions}
                                    value={values.clientId}
                                    onChange={(v, meta) => setField("clientId", v, meta?.label)}
                                    placeholder="Select client…"
                                />
                            </Field>

                            <Field label="Enter Quantity*" error={errors.quantity}>
                                <Input
                                    type="number"
                                    min={1}
                                    placeholder="0"
                                    value={values.quantity}
                                    onChange={(e) => setField("quantity", e.target.value)}
                                />
                            </Field>

                            <Field label="Expiry Date*" error={errors.expiryDate}>
                                <input
                                    type="date"
                                    className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                    value={values.expiryDate}
                                    onChange={(e) => setField("expiryDate", e.target.value)}
                                />
                                {!values.expiryDate && <div className="text-[11px] text-slate-400 mt-1">Format: dd-mm-yyyy</div>}
                            </Field>
                        </div>

                        <div className="mt-8 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setValues({ strategyId: "", strategyLabel: "", clientId: "", clientLabel: "", quantity: "", expiryDate: "" })
                                }
                                className="rounded-2xl border border-slate-700 px-5 py-2.5 text-sm text-slate-300 hover:text-white"
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                className={[
                                    "rounded-2xl px-5 py-2.5 text-sm font-semibold text-white transition",
                                    values.strategyId && values.clientId && values.quantity && Number(values.quantity) > 0 && values.expiryDate
                                        ? "bg-emerald-500 hover:bg-emerald-600"
                                        : "bg-emerald-700/40 cursor-not-allowed",
                                ].join(" ")}
                                disabled={
                                    !values.strategyId || !values.clientId || !values.quantity || Number(values.quantity) <= 0 || !values.expiryDate
                                }
                            >
                                Assign
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </SectionBlurLoader>
    );
}
