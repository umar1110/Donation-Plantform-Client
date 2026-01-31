"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Plus,
  Trash2,
  Send,
  Receipt,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import api from "@/src/lib/axios";

type PaymentMethod = "cash" | "eft";

interface DonationRow {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: string;
  donationDate: string;
  paymentMethod: PaymentMethod;
  taxDeductible: boolean;
}

const emptyRow = (): DonationRow => ({
  id: crypto.randomUUID(),
  donorName: "",
  donorEmail: "",
  amount: "",
  donationDate: new Date().toISOString().slice(0, 10),
  paymentMethod: "cash",
  taxDeductible: true,
});

export default function ReceiptsPage() {
  const [rows, setRows] = useState<DonationRow[]>([emptyRow()]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    type: "success" | "error";
    message: string;
    results?: { receiptNumber: string; donorEmail: string; sent: boolean; error?: string }[];
  } | null>(null);

  const addRow = () => setRows((r) => [...r, emptyRow()]);

  const removeRow = (id: string) => {
    if (rows.length <= 1) return;
    setRows((r) => r.filter((row) => row.id !== id));
  };

  const updateRow = (id: string, field: keyof DonationRow, value: string | boolean) => {
    setRows((r) =>
      r.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const validate = (): string | null => {
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (!r.donorName?.trim()) return `Row ${i + 1}: Donor name is required`;
      if (!r.donorEmail?.trim()) return `Row ${i + 1}: Donor email is required`;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(r.donorEmail)) return `Row ${i + 1}: Invalid email`;
      const amount = parseFloat(r.amount);
      if (Number.isNaN(amount) || amount <= 0) return `Row ${i + 1}: Enter a valid amount`;
      if (!r.donationDate?.trim()) return `Row ${i + 1}: Donation date is required`;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);
    const err = validate();
    if (err) {
      setSubmitResult({ type: "error", message: err });
      return;
    }

    setIsSubmitting(true);
    try {
      const donations = rows.map((r) => ({
        donorName: r.donorName.trim(),
        donorEmail: r.donorEmail.trim(),
        amount: parseFloat(r.amount),
        donationDate: r.donationDate,
        paymentMethod: r.paymentMethod,
        taxDeductible: r.taxDeductible,
      }));

      const res = await api.post<{
        results: { receiptNumber: string; donorEmail: string; sent: boolean; error?: string }[];
      }>("/receipts", { donations });

      const results = res.data?.results ?? [];
      setSubmitResult({
        type: "success",
        message: results?.every((x) => x.sent)
          ? "All receipts have been sent to the donors’ emails."
          : "Receipts issued. Some emails may not have been sent (see details).",
        results: results ?? [],
      });
      setRows([emptyRow()]);
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { message?: string; errors?: unknown } } };
      const message =
        ax.response?.data?.message ||
        (Array.isArray(ax.response?.data?.errors)
          ? ax.response.data.errors.map((e: { message?: string }) => e.message).join(", ")
          : "Failed to issue receipts. Please try again.");
      setSubmitResult({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg text-foreground">
              DonationPlatform
            </span>
          </Link>
          <span className="text-sm text-muted">DGR Receipts</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Receipt className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Issue Donation Receipts
            </h1>
          </div>
          <p className="text-muted">
            Add donor details and donation amounts. A formatted DGR receipt will
            be emailed to each donor.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Donations
              </h2>
              <button
                type="button"
                onClick={addRow}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add another
              </button>
            </div>

            <AnimatePresence mode="popLayout">
              {rows.map((row, index) => (
                <motion.div
                  key={row.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted">
                      Donation #{index + 1}
                    </span>
                    {rows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        className="p-1.5 rounded-lg text-muted hover:text-error hover:bg-error/10 transition-colors"
                        aria-label="Remove row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Donor name *
                      </label>
                      <input
                        type="text"
                        value={row.donorName}
                        onChange={(e) =>
                          updateRow(row.id, "donorName", e.target.value)
                        }
                        placeholder="Full name"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Donor email *
                      </label>
                      <input
                        type="email"
                        value={row.donorEmail}
                        onChange={(e) =>
                          updateRow(row.id, "donorEmail", e.target.value)
                        }
                        placeholder="email@example.com"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Amount (AUD) *
                      </label>
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={row.amount}
                        onChange={(e) =>
                          updateRow(row.id, "amount", e.target.value)
                        }
                        placeholder="0.00"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Donation date *
                      </label>
                      <input
                        type="date"
                        value={row.donationDate}
                        onChange={(e) =>
                          updateRow(row.id, "donationDate", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Type
                      </label>
                      <select
                        value={row.paymentMethod}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            "paymentMethod",
                            e.target.value as PaymentMethod
                          )
                        }
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="cash">Cash</option>
                        <option value="eft">EFT</option>
                      </select>
                    </div>
                    <div className="flex flex-col justify-end">
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Tax deductible
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={row.taxDeductible}
                          onChange={(e) =>
                            updateRow(row.id, "taxDeductible", e.target.checked)
                          }
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
                        />
                        <span className="text-sm text-foreground">Yes</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {submitResult && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl flex items-start gap-3 ${
                submitResult.type === "success"
                  ? "bg-success/10 border border-success/30 text-success"
                  : "bg-error/10 border border-error/30 text-error"
              }`}
            >
              {submitResult.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium">{submitResult.message}</p>
                {submitResult.results && submitResult.results.length > 0 && (
                  <ul className="mt-2 text-sm opacity-90 space-y-1">
                    {submitResult.results.map((r, i) => (
                      <li key={i}>
                        Receipt {r.receiptNumber} → {r.donorEmail}
                        {r.sent ? " ✓" : r.error ? ` (${r.error})` : ""}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Issue receipt(s) & email
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs text-muted text-center max-w-xl mx-auto">
          Organization: PKC FRIENDS INCORPORATED • ABN 16 536 715 946 • 11 East
          Gateway, Wyndham Vale, VIC 3024
        </p>
      </main>
    </div>
  );
}
