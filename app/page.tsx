"use client";

import { useEffect } from "react";
import { HabitForm } from "../components/HabitForm";
import { HabitCard } from "../components/HabitCard";
import { HabitDetail } from "../components/HabitDetail";
import { ReminderPermission } from "../components/ReminderPermission";
import { useHabits } from "../lib/hooks/useHabits";
import { useReminderScheduler } from "../lib/hooks/useReminderScheduler";

const motivationalQuotes = [
  "Small steps, every day.",
  "Show up today to build tomorrow.",
  "Streaks start with a single win.",
  "Consistency compounds."
];

const getRandomQuote = () =>
  motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

export default function HomePage() {
  const {
    habits,
    hydrated,
    addHabit,
    toggleCompleteToday,
    updateHabit,
    clearHistory,
    deleteHabit,
    selectedHabitId,
    selectHabit
  } = useHabits();

  useReminderScheduler(habits);

  useEffect(() => {
    if (!hydrated || habits.length === 0) return;
    if (selectedHabitId) {
      const exists = habits.some((habit) => habit.id === selectedHabitId);
      if (!exists) selectHabit(null);
    }
  }, [habits, hydrated, selectHabit, selectedHabitId]);

  const selectedHabit = habits.find((habit) => habit.id === selectedHabitId) ?? null;

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-8 px-5 py-8">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Habit Pulse
            </p>
            <h1 className="text-2xl font-semibold text-white">Your daily rhythm</h1>
          </div>
          <span className="rounded-full bg-white/10 px-4 py-1 text-xs text-slate-300">
            {new Date().toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric"
            })}
          </span>
        </div>
        <p className="text-sm text-slate-300">{getRandomQuote()}</p>
      </header>

      <ReminderPermission />

      <HabitForm onCreate={addHabit} />

      <section className="flex flex-col gap-4 pb-24">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-200">Today&apos;s habits</h2>
          <span className="text-xs text-slate-400">
            {habits.filter((habit) => habit.completedToday).length}/{habits.length} completed
          </span>
        </div>

        {hydrated && habits.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-center text-sm text-slate-400">
            Add your first habit to start tracking streaks.
          </div>
        )}

        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleToday={toggleCompleteToday}
            onSelect={selectHabit}
            isSelected={selectedHabitId === habit.id}
          />
        ))}
      </section>

      {selectedHabit && (
        <HabitDetail
          habit={selectedHabit}
          onClose={() => selectHabit(null)}
          onUpdate={updateHabit}
          onClearHistory={clearHistory}
          onDelete={deleteHabit}
        />
      )}
    </main>
  );
}
