"use client";

import { format, parseISO } from "date-fns";
import { clsx } from "clsx";
import type { Habit } from "../lib/types";

type HabitCardProps = {
  habit: Habit & {
    streak: number;
    completedToday: boolean;
  };
  onToggleToday: (habitId: string) => void;
  onSelect: (habitId: string) => void;
  isSelected: boolean;
};

const formatLastCompletion = (habit: Habit) => {
  if (!habit.completions.length) return "no completions yet";
  const latest = habit.completions
    .map((date) => parseISO(date))
    .sort((a, b) => b.getTime() - a.getTime())[0];
  return `last done ${format(latest, "MMM d")}`;
};

export const HabitCard = ({
  habit,
  onToggleToday,
  onSelect,
  isSelected
}: HabitCardProps) => {
  const completionLabel = habit.completedToday ? "Completed" : "Tap to complete";
  return (
    <button
      onClick={() => onSelect(habit.id)}
      className={clsx(
        "relative flex w-full items-center gap-4 rounded-3xl border px-4 py-4 text-left transition",
        isSelected
          ? "border-white/60 bg-white/10 shadow-lg shadow-black/30"
          : "border-white/5 bg-white/5 hover:bg-white/10"
      )}
      style={{ borderColor: isSelected ? habit.color : "rgba(255,255,255,0.12)" }}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
        style={{ background: `${habit.color}20` }}
      >
        <span className="drop-shadow-sm">{habit.icon}</span>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">{habit.name}</h3>
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {habit.streak} day streak
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400">{formatLastCompletion(habit)}</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: habit.completedToday ? "100%" : `${Math.min(habit.streak * 10, 100)}%`,
                backgroundColor: habit.color
              }}
            />
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleToday(habit.id);
            }}
            className={clsx(
              "min-w-[110px] rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide shadow transition",
              habit.completedToday
                ? "bg-slate-900 text-slate-200"
                : "bg-white text-slate-900"
            )}
          >
            {completionLabel}
          </button>
        </div>
      </div>
    </button>
  );
};
