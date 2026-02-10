"use client";

import { format, isSameDay, parseISO, subDays } from "date-fns";
import type { Habit } from "../lib/types";

type HabitDetailProps = {
  habit: Habit & {
    streak: number;
    completedToday: boolean;
  };
  onClose: () => void;
  onUpdate: (habitId: string, patch: Partial<Habit>) => void;
  onClearHistory: (habitId: string) => void;
  onDelete: (habitId: string) => void;
};

const recentDays = Array.from({ length: 7 }, (_, index) => subDays(new Date(), index));

export const HabitDetail = ({
  habit,
  onClose,
  onUpdate,
  onClearHistory,
  onDelete
}: HabitDetailProps) => {
  const isReminderEnabled = habit.reminderEnabled;
  const reminderTime = habit.reminderTime;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-slate-950 p-6 shadow-2xl">
      <div className="mx-auto h-1 w-12 rounded-full bg-slate-800" />
      <div className="mt-4 flex items-start justify-between">
        <div>
          <div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
            style={{ background: `${habit.color}30` }}
          >
            <span>{habit.icon}</span>
          </div>
          <h3 className="mt-3 text-xl font-semibold text-white">{habit.name}</h3>
          <p className="text-sm text-slate-400">{habit.streak} day streak</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
        >
          Close
        </button>
      </div>

      <section className="mt-6">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Recent progress
        </h4>
        <div className="mt-3 flex gap-2">
          {recentDays.map((day) => {
            const short = format(day, "EEE");
            const dateKey = day.toISOString().split("T")[0];
            const completed = habit.completions.some((date) =>
              isSameDay(parseISO(date), day)
            );
            return (
              <div
                key={dateKey}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs text-slate-500">{short}</span>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{
                    background: completed ? habit.color : "rgba(148, 163, 184, 0.2)"
                  }}
                >
                  {format(day, "d")}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-3xl bg-slate-900/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-200">Reminders</p>
            <p className="text-xs text-slate-400">
              {isReminderEnabled ? `Every day at ${reminderTime}` : "Off"}
            </p>
          </div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={isReminderEnabled}
              onChange={(event) =>
                onUpdate(habit.id, { reminderEnabled: event.target.checked })
              }
              className="h-5 w-5 accent-accent"
            />
          </label>
        </div>
        {isReminderEnabled && (
          <div className="mt-4">
            <input
              type="time"
              value={reminderTime}
              onChange={(event) => onUpdate(habit.id, { reminderTime: event.target.value })}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        )}
      </section>

      {habit.notes && (
        <section className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Notes
          </h4>
          <p className="mt-2 whitespace-pre-wrap rounded-2xl bg-slate-900/60 p-4 text-sm text-slate-200">
            {habit.notes}
          </p>
        </section>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => onClearHistory(habit.id)}
          className="flex-1 rounded-2xl border border-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-900/80"
        >
          Reset streak
        </button>
        <button
          type="button"
          onClick={() => onDelete(habit.id)}
          className="flex-1 rounded-2xl bg-red-500/20 px-4 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/30"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
