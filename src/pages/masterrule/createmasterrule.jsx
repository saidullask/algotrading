import react, { useState, useEffect, useCallback } from "react";
import ComboBox from "../../components/formcomponents/comboboxcomponent";
import { errCls } from "../../components/formcomponents/errorhandling";
import { Field, Input } from "../../components/formcomponents/input";
import { TradeRuleServices } from "../../services/traderuleservices";
import { Authservices } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import Config from "../../config";
import SectionBlurLoader from "../../components/SectionBlurLoader";
import { useToast } from "../../components/ToastHost";
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
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function validate(values) {
  const e = {};
  if (!values.ruleName?.trim()) e.ruleName = "Rule name is required.";
  else if (values.ruleName.length < 3) e.ruleName = "Min 3 characters.";

  if (!values.instrument) e.instrument = "Select instrument type.";
  if (!values.symbol) e.symbol = "Select symbol.";
  if (!values.strategy) e.strategy = "Select strategy.";
  if (!values.expiry) e.expiry = "Select expiry date.";

  if (values.isLimit && (!values.limitPrice || Number(values.limitPrice) <= 0)) {
    e.limitPrice = "Enter a valid limit price.";
  }
  if (values.isTrigger && (!values.triggerPrice || Number(values.triggerPrice) <= 0)) {
    e.triggerPrice = "Enter a valid trigger price.";
  }
  return e;
}

export default function Createmasterrule() {
  const navigate = useNavigate();
  const toast = useToast();
  const [values, setValues] = useState(() => ({
    ruleName: "",
    symbol: "",
    exchange: "",
    instrument: "",
    strategy: "",
    currentPrice: "",
    lotSize: "",
    isLimit: false,
    limitPrice: "",
    isTrigger: false,
    triggerPrice: "",
    expiry: "",
  }));

  const [errors, setErrors] = useState({});
  const [symbols, setSymbol] = useState([]);
  const [exchanges, setExchange] = useState([]);
  const [synbolstemp, setSymbolstempdata] = useState([]);
  const [instrumets, setInstrumets] = useState([]);
  const [startegytypes, setStartegytypes] = useState([]);
  const [expiryDates, setExpiryDates] = useState([])
  const [isInstrumentDisabled, setIsInstrumentDisabled] = useState(false);
  const [isExipryDisabled, setIsExpiryDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [symbolRes, exchangeRes, instrumentRes, strategyRes] = await Promise.all([
        TradeRuleServices.getSymbols(),
        TradeRuleServices.getExchangeTypes(),
        TradeRuleServices.getInstrumentTypes(),
        TradeRuleServices.getStrategyTypes(),
      ]);

      setSymbolstempdata(symbolRes.symbolData);
      setSymbol(
        symbolRes.symbolData.map((x) => ({
          label: x.name,
          value: x.name,
        }))
      );

      setExchange(
        exchangeRes.exchangeTypes.map((x) => ({
          label: x.name,
          value: x.value,
        }))
      );

      setInstrumets(
        instrumentRes.instrumentTypes.map((x) => ({
          label: x.name,
          value: x.value,
        }))
      );

      setStartegytypes(
        strategyRes.strategies.map((x) => ({
          label: x,
          value: x,
        }))
      );
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to load initial data:", err);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const currentUser = Authservices.currentUserValue ?? null;
    if (currentUser === null) {
      navigate(Config.signInPath);
      return;
    }
    loadInitialData();
  }, [navigate, loadInitialData]);

  function setField(key, v) {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (key === "symbol" && v) {
      const requestData = synbolstemp.find((x) => x.name === v);
      TradeRuleServices.getExchangeType(requestData).then(
        (res) => {
          if (res.isSuccess) {
            setValues((prev) => ({
              ...prev,
              exchange: res.exchangeType?.value ?? "",
            }));
            setIsInstrumentDisabled(true);
          } else {
            alert(res.message);
          }
        },
        (error) => {
          alert("Failed to fetch exchange type");
        }
      );
    }

    if (key === "instrument" && v) {
      const symbolData = synbolstemp.find((x) => x.name === values.symbol);
      const instrumentType = instrumets
        .filter((x) => x.value === v)
        .map((x) => ({ name: x.label, value: x.value }))[0] ?? null;
      TradeRuleServices.getPriceAndExpiry(symbolData, instrumentType).then(
        (res) => {
          if (res.isSuccess) {
            setValues((prev) => ({
              ...prev,
              lotSize: res.lotSize ?? "",
              currentPrice: res.currentPrice ?? "",
            }));
            setExpiryDates(
              res.expiryDates.map((x) => ({
                label: x,
                value: x,
              }))
            );
            setIsExpiryDisabled(true);
          } else {
            alert(res.message);
          }
        },
        (error) => {
          alert("Failed to fetch exchange type");
        }
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    let instrumentType = instrumets
      .filter((x) => x.value === values.instrument)
      .map((x) => ({ name: x.label, value: x.value }))[0] ?? null;
    let symbolData = synbolstemp.find((x) => x.name === values.symbol);
    let general = {
      isLimitPriceEnabled: values.isLimit,
      limitPrice: values.limitPrice === "" ? 0 : Number(values.limitPrice),
      isTriggerPriceEnabled: values.isTrigger,
      triggerPrice: values.triggerPrice === "" ? 0 : Number(values.triggerPrice),
    }
    TradeRuleServices.createMasterRule(
      values.ruleName,
      instrumentType,
      symbolData,
      general,
      values.expiry,
      values.strategy,
    ).then((res) => {
      if (res.isSuccess) {
        toast.success(res.message);
        navigate("/dashboard/rule/viewmasterrule");
      }
      else {
        toast.error(res.message);
        alert("error")
      }
    },
      (error) => {
        alert("error")

      }
    )
  }

  return (
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
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Create Master Rule</h1>
                <p className="mt-1 text-slate-400">Define your trading logic once — deploy across strategies with confidence.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Chip label="Symbol" value={values.symbol || "—"} tone="cyan" />
              <Chip label="LTP" value={values.currentPrice ? `₹${Number(values.currentPrice).toLocaleString("en-IN")}` : "—"} tone="emerald" />
              <Chip label="Lot" value={values.lotSize || "—"} />
              <Chip label="Expiry" value={values.expiry || "—"} />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label="Rule Name*" error={errors.ruleName}>
              <Input placeholder="Enter Rule Name" value={values.ruleName} onChange={(e) => setField("ruleName", e.target.value)} />
            </Field>

            <Field label="Select Symbol*" error={errors.symbol}>
              <ComboBox data={symbols} value={values.symbol} onChange={(v) => setField("symbol", v)} placeholder="Select symbol…" />
            </Field>

            <Field label="Exchange Type" error={errors.exchange}>
              <ComboBox data={exchanges} value={values.exchange} onChange={(v) => setField("exchange", v)} placeholder="Select exchange…" enabled={false} />
            </Field>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label="Instrument Type" error={errors.instrument}>
              <ComboBox data={instrumets} value={values.instrument} onChange={(v) => setField("instrument", v)} placeholder="Select instrument…" enabled={isInstrumentDisabled} />
            </Field>

            <Field label="Current Price">
              <Input placeholder="—" value={values.currentPrice} readOnly />
            </Field>

            <Field label="Lot Size">
              <Input placeholder="—" value={values.lotSize} readOnly />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            <Field label="Strategy Type*" error={errors.strategy}>
              <ComboBox data={startegytypes} value={values.strategy} onChange={(v) => setField("strategy", v)} placeholder="Select strategy…" />
            </Field>

            {/* Limit Price Toggle */}
            <Field>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-slate-300">
                  Is Limit Price
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const next = !values.isLimit;
                    setField("isLimit", next);
                    if (!next) setField("limitPrice", "");
                  }}
                  className={[
                    "relative inline-flex h-6 w-11 items-center rounded-full",
                    values.isLimit ? "bg-emerald-500/60" : "bg-slate-600/70",
                    "ring-1 ring-inset ring-slate-500/40 transition",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow",
                      values.isLimit ? "translate-x-5" : "translate-x-1",
                      "transition",
                    ].join(" ")}
                  />
                </button>
              </div>

              <Input
                placeholder="0.0"
                value={values.limitPrice}
                onChange={(e) => setField("limitPrice", e.target.value)}
                disabled={!values.isLimit}
                className={`flex-1 ${!values.isLimit ? "opacity-60 cursor-not-allowed" : ""}`}
              />
              {errors.limitPrice && <div className={errCls}>{errors.limitPrice}</div>}
            </Field>


            <Field>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-slate-300">
                  Is Trigger Price
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const next = !values.isTrigger;
                    setField("isTrigger", next);
                    if (!next) setField("triggerPrice", "");
                  }}
                  className={[
                    "relative inline-flex h-6 w-11 items-center rounded-full",
                    values.isTrigger ? "bg-emerald-500/60" : "bg-slate-600/70",
                    "ring-1 ring-inset ring-slate-500/40 transition",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow",
                      values.isTrigger ? "translate-x-5" : "translate-x-1",
                      "transition",
                    ].join(" ")}
                  />
                </button>
              </div>

              <Input
                placeholder="0.0"
                value={values.triggerPrice}
                onChange={(e) => setField("triggerPrice", e.target.value)}
                disabled={!values.isTrigger}
                className={`flex-1 ${!values.isTrigger ? "opacity-60 cursor-not-allowed" : ""}`}
              />
              {errors.triggerPrice && <div className={errCls}>{errors.triggerPrice}</div>}
            </Field>

          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label="Expiry Date*" error={errors.expiry}>
              <ComboBox data={expiryDates} value={values.expiry} onChange={(v) => setField("expiry", v)} placeholder="Select expiry…" enabled={isExipryDisabled} />
            </Field>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="submit" className="rounded-2xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition">
              Save Rule
            </button>
            <button
              type="button"
              onClick={() => {
                setValues({
                  ruleName: "",
                  symbol: "",
                  exchange: "",
                  instrument: "",
                  strategy: "",
                  currentPrice: "",
                  lotSize: "",
                  isLimit: false,
                  limitPrice: "",
                  isTrigger: false,
                  triggerPrice: "",
                  expiry: "",
                });
                setErrors({});
              }}
              className="rounded-2xl border border-slate-700 px-5 py-2.5 text-sm text-slate-300 hover:text-white"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </SectionBlurLoader>
  );
}
