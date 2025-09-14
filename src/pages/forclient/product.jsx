import React, { useMemo, useState } from "react";
import { Check, CreditCard, Package, ShoppingCart } from "lucide-react";
import { useToast } from "../../components/ToastHost";
import upiQR from "../../assets/QrCode.jpeg";


const PRODUCT = {
  id: "nifty-bull",
  name: "NIFTY-Bull",
  badge: "Equity Derivatives",
  pricePerLot: 4720,
  currency: "₹",
  billing: "per lot / month",
  marginNote:
    "Required cash ledger margin at the time of subscription ₹150000 per/lot. User should maintain this amount in their ledger to keep smooth functioning of the strategy.",
};

function Stepper({ step }) {
  const base =
    "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition";
  const active =
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-sm";
  const idle = "border-slate-700/60 bg-slate-900/40 text-slate-300";
  const done =
    "border-emerald-600/40 bg-emerald-600/15 text-emerald-200 ring-1 ring-emerald-500/20";

  const Item = ({ i, icon: Icon, label }) => {
    const state =
      step === i ? active : step > i ? done : idle;
    return (
      <div className={`${base} ${state}`}>
        <div className="grid h-7 w-7 place-items-center rounded-xl bg-slate-900/60 ring-1 ring-inset ring-white/5">
          {step > i ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
        </div>
        <div className="hidden sm:block">{label}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Item i={1} icon={Package} label="Select Product" />
      <Item i={2} icon={ShoppingCart} label="Choose Quantity" />
      <Item i={3} icon={CreditCard} label="Confirm & Pay" />
    </div>
  );
}

function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Product() {
  const toast = useToast?.() || { success() {}, error() {} };

  const [step, setStep] = useState(1);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [qty, setQty] = useState("");
  const qtyNum = useMemo(() => Number(qty || 0), [qty]);
  const total = useMemo(
    () => (qtyNum > 0 ? qtyNum * PRODUCT.pricePerLot : 0),
    [qtyNum]
  );

  const startSubscribe = () => {
    setQty("");
    setPickerOpen(true);
    setStep(2);
  };

  const confirmQuantity = () => {
    if (!qtyNum || qtyNum <= 0) {
      toast.error("Please select a valid quantity.");
      return;
    }
    setPickerOpen(false);
    setConfirmOpen(true);
  };

  const payNow = () => {
    setConfirmOpen(false);
    setStep(3);
    toast.success("Proceed to pay via UPI QR.");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-100">
      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Product</h1>
              <p className="mt-1 max-w-2xl text-slate-400">
                Subscribe to a strategy and let our execution engine handle the rest.
              </p>
            </div>
            <Stepper step={step} />
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-800/70 bg-slate-900/50 p-5 md:p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-lg border border-teal-700/40 bg-teal-600/15 px-2.5 py-1 text-xs tracking-wide text-teal-300">
                      {PRODUCT.badge}
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-white">
                      {PRODUCT.name}
                    </h2>
                    <div className="mt-1 text-sm text-slate-400">
                      Robust, hedged, weekly-expiry strategy.
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <div className="text-sm text-slate-400">Pricing</div>
                  <div className="mt-1 text-2xl font-extrabold text-emerald-300">
                    {PRODUCT.currency}
                    {PRODUCT.pricePerLot.toLocaleString("en-IN")}
                    <span className="ml-2 text-sm font-normal text-slate-400">
                      {PRODUCT.billing}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startSubscribe}
                  className="mt-5 w-full rounded-2xl bg-teal-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-teal-400 transition"
                >
                  Subscribe Product
                </button>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-cyan-700/30 bg-cyan-600/15 p-4 md:p-5 text-cyan-100">
                <div className="flex items-start gap-3">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-cyan-500/15 text-cyan-300">
                    i
                  </div>
                  <p className="leading-relaxed">
                    {PRODUCT.marginNote}
                  </p>
                </div>

                {qtyNum > 0 && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-400">
                        Quantity
                      </div>
                      <div className="text-lg font-bold">{qtyNum}</div>
                    </div>
                    <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-400">
                        Price / lot
                      </div>
                      <div className="text-lg font-bold">
                        {PRODUCT.currency}
                        {PRODUCT.pricePerLot.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="rounded-xl border border-emerald-700/50 bg-emerald-600/10 p-4">
                      <div className="text-xs uppercase tracking-wide text-emerald-300">
                        Total (Monthly)
                      </div>
                      <div className="text-xl font-extrabold text-emerald-300">
                        {PRODUCT.currency}
                        {total.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {step === 3 && (
                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <h3 className="text-lg font-semibold text-white">Pay via UPI QR</h3>
                  <p className="mt-1 text-slate-300">
                    Please scan the QR code with your preferred UPI app and pay{" "}
                    <span className="font-semibold text-emerald-300">
                      {PRODUCT.currency}
                      {total.toLocaleString("en-IN")}
                    </span>
                    . After payment, kindly share the transaction screenshot on{" "}
                    <span className="font-semibold text-cyan-300">+91 90386 22154</span>.
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                      <img
                        src={upiQR}
                        alt="UPI QR"
                        className="mx-auto max-h-[360px] w-auto"
                      />
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Product</span>
                          <span className="font-semibold text-slate-200">{PRODUCT.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Quantity</span>
                          <span className="font-semibold text-slate-200">{qtyNum}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Price / lot</span>
                          <span className="font-semibold text-slate-200">
                            {PRODUCT.currency}
                            {PRODUCT.pricePerLot.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="mt-3 border-t border-slate-800 pt-3 flex items-center justify-between">
                          <span className="text-emerald-300">Total</span>
                          <span className="text-xl font-extrabold text-emerald-300">
                            {PRODUCT.currency}
                            {total.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/60"
                          onClick={() => {
                            setStep(2);
                            setPickerOpen(true);
                          }}
                        >
                          Change Quantity
                        </button>
                        <button
                          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                          onClick={() => toast.success("We’ll verify your payment shortly.")}
                        >
                          I’ve Paid
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={pickerOpen}
        title="Product Subscription"
        onClose={() => {
          setPickerOpen(false);
          if (!qtyNum) setStep(1);
        }}
      >
        <div className="space-y-5">
          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Quantity <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <select
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                <option value="">Select…</option>
                {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/60"
              onClick={() => {
                setPickerOpen(false);
                if (!qtyNum) setStep(1);
              }}
            >
              Cancel
            </button>
            <button
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                qtyNum > 0
                  ? "bg-teal-500 text-slate-950 hover:bg-teal-400"
                  : "bg-teal-700/40 text-slate-400 cursor-not-allowed"
              }`}
              onClick={confirmQuantity}
              disabled={!qtyNum}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={confirmOpen}
        title="Confirm Subscription"
        onClose={() => setConfirmOpen(false)}
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <div className="text-sm text-slate-300">Service Description</div>
            <div className="mt-1 font-semibold text-slate-100">
              The price of one quantity of trade
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-400">
                Quantity
              </div>
              <div className="text-lg font-bold">{qtyNum}</div>
            </div>
            <div className="rounded-xl border border-emerald-700/50 bg-emerald-600/10 p-4">
              <div className="text-xs uppercase tracking-wide text-emerald-300">
                Total Price
              </div>
              <div className="text-xl font-extrabold text-emerald-300">
                {PRODUCT.currency}
                {total.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/60"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-400"
              onClick={payNow}
            >
              Pay
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
