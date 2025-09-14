import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import SectionBlurLoader from "../components/SectionBlurLoader";
import { useToast } from "../components/ToastHost";
import { useNavigate } from "react-router-dom";
import { Authservices } from "../services/AuthServices";
import { AnalysisServices } from "../services/AnalysisServices";
import Config from "../config";

const filterSettings = { type: "Excel" };
const pageSettings = { pageCount: 5 };
const toolbarOptions = ["Search"];

const SyncDarkStyles = () => (
  <style>{`
    .panel-card {
      border-radius: 1.25rem;
      background: linear-gradient(180deg,#0b1220 0%, #0a1020 100%);
      border: 1px solid rgba(51,65,85,.5);
    }
    .e-date-wrapper {
      background: #0f172a !important;
      border-color: #334155 !important;
      color: #e5e7eb !important;
    }
    .e-input-group input.e-input,
    .e-input-group.e-control-wrapper input.e-input {
      background: transparent !important;
      color: #e5e7eb !important;
    }
    .e-input-group:not(.e-disabled):hover { border-color: #475569 !important; }
    .e-input-group-icon, .e-control-wrapper .e-input-group-icon { color: #93c5fd !important; }

    .e-grid { background: #0b1220 !important; color: #e5e7eb !important; border-color: #1f2937 !important; }
    .e-grid .e-headercell, .e-grid .e-gridheader { background: #0f172a !important; border-color: #1f2937 !important; color: #cbd5e1 !important; }
    .e-grid .e-rowcell { border-color: #1f2937 !important; }
    .e-grid .e-altrow { background: rgba(30,41,59,.45) !important; }
    .e-grid .e-toolbar { background: transparent !important; border-color: transparent !important; }
    .e-search .e-input-group input { background: #0f172a !important; border-color: #334155 !important; color: #e5e7eb !important; }

    .btn-go {
      background: #2dd4bf;
      color: #0b1220;
      border-radius: 0.5rem;
      padding: 0.55rem 0.9rem;
      font-weight: 700;
      border: 1px solid rgba(45,212,191,.25);
    }
    .btn-go:hover { filter: brightness(0.95); }
  `}</style>
);

function toDateOnlyYYYYMMDD(d) {
  if (!(d instanceof Date) || Number.isNaN(+d)) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function ProfitLoss() {
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const canSearch = useMemo(
    () =>
      start instanceof Date &&
      !Number.isNaN(+start) &&
      end instanceof Date &&
      !Number.isNaN(+end) &&
      start <= end,
    [start, end]
  );

  const requireAuth = useCallback(() => {
    const u = Authservices.currentUserValue ?? null;
    if (!u) {
      Authservices.logout();
      navigate(Config.signInPath);
      return false;
    }
    return true;
  }, [navigate]);

  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  const fetchReport = useCallback(async () => {
    if (!canSearch) {
      toast.error("Pick a valid start and end date.");
      return;
    }
    try {
      setIsLoading(true);
      const startDate = toDateOnlyYYYYMMDD(start);
      const endDate = toDateOnlyYYYYMMDD(end);
      const res = await AnalysisServices.getProfit(startDate, endDate);
      if (res?.isSuccess) {
        const data = (res.data ?? []).map((x, i) => ({
          id: x.id ?? i,
          clientCode: x.clientCode,
          clientName: x.clientName,
          quantity: x.quantity,
          profitLoss: x.profitLoss,
          marketStart: x.marketStartingPrice,
          marketClose: x.marketClosingPrice,
          marketDiff: x.marketPriceDifference,
          strategyDiff: x.strategyPointsDifference,
        }));
        setRows(data);
      } else {
        setRows([]);
        toast.error(res?.message || "Failed to load report");
      }
    } catch (err) {
      setRows([]);
      toast.error(err?.message || "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }, [canSearch, start, end, toast]);

  return (
    <>
      <SyncDarkStyles />
      <SectionBlurLoader loading={isLoading} text="loading…">
        <div className="space-y-6">
          <div className="panel-card p-4 md:p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2">
                  <DatePickerComponent
                    value={start}
                    change={(e) => setStart(e?.value ?? null)}
                    placeholder="Start Date"
                    format="dd-MMM-yyyy"
                    strictMode
                  />
                  <span className="text-slate-400">→</span>
                  <DatePickerComponent
                    value={end}
                    min={start || undefined}
                    change={(e) => setEnd(e?.value ?? null)}
                    placeholder="End Date"
                    format="dd-MMM-yyyy"
                    strictMode
                  />
                </div>

                <button
                  type="button"
                  className={`btn-go ${!canSearch ? "opacity-60 cursor-not-allowed" : ""}`}
                  disabled={!canSearch}
                  onClick={fetchReport}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 overflow-hidden">
            <GridComponent
              dataSource={rows}
              allowPaging
              allowSorting
              allowFiltering
              filterSettings={filterSettings}
              pageSettings={pageSettings}
              toolbar={toolbarOptions}
              height={420}
            >
              <ColumnsDirective>
                <ColumnDirective field="id" headerText="ID" visible={false} isPrimaryKey={true} />
                <ColumnDirective field="clientCode" headerText="Client Code" width="140" />
                <ColumnDirective field="clientName" headerText="Client Name" width="200" />
                <ColumnDirective field="quantity" headerText="Quantity" textAlign="Right" width="120" format="N0" />
                <ColumnDirective field="profitLoss" headerText="Profit Loss" textAlign="Right" width="140" format="N2" />
                <ColumnDirective field="marketStart" headerText="Market Starting Price" textAlign="Right" width="180" format="N2" />
                <ColumnDirective field="marketClose" headerText="Market Closing Price" textAlign="Right" width="180" format="N2" />
                <ColumnDirective field="marketDiff" headerText="Market Price Difference" textAlign="Right" width="190" format="N2" />
                <ColumnDirective field="strategyDiff" headerText="Strategy Points Difference" textAlign="Right" width="200" format="N2" />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
            </GridComponent>
          </div>
        </div>
      </SectionBlurLoader>
    </>
  );
}
