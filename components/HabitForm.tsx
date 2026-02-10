"use client";

import { useState } from "react";
import type { HabitInput } from "../lib/types";

type HabitFormProps = {
  onCreate: (habit: HabitInput) => void;
};

const palette = [
  "#4F46E5",
  "#6366F1",
  "#22D3EE",
  "#14B8A6",
  "#F97316",
  "#F43F5E",
  "#8B5CF6"
];

export const HabitForm = ({ onCreate }: HabitFormProps) => {
  const [form, setForm] = useState<HabitInput>({
    name: "",
    icon: "🔥",
    color: palette[0],
    reminderEnabled: false,
    reminderTime: "08:00",
    notes: ""
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    onCreate(form);
    setForm({
      name: "",
      icon: "🔥",
      color: palette[0],
      reminderEnabled: false,
      reminderTime: "08:00",
      notes: ""
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-slate-900/70 p-6 shadow-lg backdrop-blur-md"
    >
      <h2 className="text-lg font-semibold text-slate-100">Add a habit</h2>
      <div className="mt-4 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-300">Habit name</span>
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            placeholder="Drink water"
            className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-300">Emoji</span>
          <input
            value={form.icon}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, icon: event.target.value }))
            }
            maxLength={2}
            className="w-20 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-center text-2xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </label>

        <div className="grid gap-2">
          <span className="text-sm font-medium text-slate-300">Accent color</span>
          <div className="flex flex-wrap gap-2">
            {palette.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, color }))}
                className={`h-10 w-10 rounded-full border-2 transition ${
                  form.color === color
                    ? "border-white scale-110"
                    : "border-transparent opacity-80"
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color}`}
              />
            ))}
          </div>
        </div>

        <label className="flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-slate-200">Reminders</p>
            <p className="text-xs text-slate-400">
              Get nudged when it&apos;s time to complete the habit
            </p>
          </div>
          <input
            type="checkbox"
            checked={form.reminderEnabled}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, reminderEnabled: event.target.checked }))
            }
            className="h-5 w-5 accent-accent"
          />
        </label>

        {form.reminderEnabled && (
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-300">
              Reminder time
            </span>
            <input
              type="time"
              value={form.reminderTime}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, reminderTime: event.target.value }))
              }
              className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </label>
        )}

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-300">Notes</span>
          <textarea
            value={form.notes}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, notes: event.target.value }))
            }
            placeholder="Optional context or goal"
            rows={3}
            className="resize-none rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-[0.99]"
      >
        Add habit
      </button>
    </form>
  );
};
