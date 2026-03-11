import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MONTHS_PT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const MONTHS_SHORT_PT = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

const DAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function formatDateBR(date: Date): string {
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function formatPeriodLabel(start: Date, end: Date | null): string {
    if (!end || start.toDateString() === end.toDateString()) {
        return `${start.getDate()} de ${MONTHS_SHORT_PT[start.getMonth()]} de ${start.getFullYear()}`;
    }
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${start.getDate()} a ${end.getDate()} de ${MONTHS_SHORT_PT[start.getMonth()]} de ${start.getFullYear()}`;
    }
    return `${start.getDate()} de ${MONTHS_SHORT_PT[start.getMonth()]} a ${end.getDate()} de ${MONTHS_SHORT_PT[end.getMonth()]} de ${end.getFullYear()}`;
}

interface DateRangePickerProps {
    value: string; // "YYYY-MM-DD" or "YYYY-MM-DD/YYYY-MM-DD"
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function DateRangePicker({ value, onChange, placeholder = 'Selecione a data ou período', className = '' }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [selecting, setSelecting] = useState<'start' | 'end'>('start');
    const ref = useRef<HTMLDivElement>(null);

    // Parse value on mount / value change
    useEffect(() => {
        if (!value) {
            setStartDate(null);
            setEndDate(null);
            return;
        }
        const parts = value.split('/');
        if (parts[0]) {
            const s = new Date(parts[0] + 'T12:00:00');
            if (!isNaN(s.getTime())) {
                setStartDate(s);
                // Only change current month if it's currently showing a different month
                // to avoid jarring the user if they're browsing the calendar
                const sMonth = new Date(s.getFullYear(), s.getMonth(), 1);
                if (currentMonth.getTime() !== sMonth.getTime()) {
                    setCurrentMonth(sMonth);
                }
            }
        }
        if (parts[1]) {
            const e = new Date(parts[1] + 'T12:00:00');
            if (!isNaN(e.getTime())) setEndDate(e);
        } else {
            setEndDate(null);
        }
    }, [value]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    function isSameDay(a: Date, b: Date) {
        return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
    }

    function inRange(day: Date): boolean {
        if (!startDate) return false;
        const endCompare = endDate || hoverDate;
        if (!endCompare) return false;
        const [lo, hi] = startDate <= endCompare ? [startDate, endCompare] : [endCompare, startDate];
        return day > lo && day < hi;
    }

    function handleDayClick(day: Date) {
        const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        if (selecting === 'start') {
            setStartDate(day);
            setEndDate(null);
            setSelecting('end');
            onChange(fmt(day)); // Já salva como data única no primeiro clique
        } else {
            if (startDate && day < startDate) {
                setEndDate(startDate);
                setStartDate(day);
            } else {
                setEndDate(day);
            }
            setSelecting('start');
            setIsOpen(false);

            const s = startDate && day >= startDate ? startDate : day;
            const e = startDate && day >= startDate ? day : startDate;

            if (s && e) {
                if (isSameDay(s, e)) {
                    onChange(fmt(s));
                } else {
                    onChange(`${fmt(s)}/${fmt(e)}`);
                }
            }
        }
    }

    function handleClear(e: React.MouseEvent) {
        e.stopPropagation();
        setStartDate(null);
        setEndDate(null);
        setSelecting('start');
        onChange('');
    }

    const displayLabel = (() => {
        if (startDate && endDate) return formatPeriodLabel(startDate, endDate);
        if (startDate) return formatDateBR(startDate);
        return '';
    })();

    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
        days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
    }

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-left outline-none focus:ring-2 focus:ring-brand-500 hover:border-slate-300 transition-colors"
            >
                <Calendar size={16} className="text-slate-400 shrink-0" />
                {displayLabel ? (
                    <span className="flex-1 text-slate-800 text-sm">{displayLabel}</span>
                ) : (
                    <span className="flex-1 text-slate-400 text-sm">{placeholder}</span>
                )}
                {displayLabel && (
                    <button type="button" onClick={handleClear} className="text-slate-400 hover:text-slate-600">
                        <X size={14} />
                    </button>
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 left-0 z-50 bg-white border border-slate-200 rounded-xl shadow-xl p-4 min-w-[280px]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                            className="p-1 rounded hover:bg-slate-100 text-slate-500"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-sm font-semibold text-slate-700">
                            {MONTHS_PT[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button
                            type="button"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                            className="p-1 rounded hover:bg-slate-100 text-slate-500"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Hint */}
                    <p className="text-[10px] text-brand-500 font-medium text-center mb-2">
                        {selecting === 'start' ? 'Clique para selecionar o início' : 'Clique para selecionar o fim (ou clique no mesmo dia)'}
                    </p>

                    {/* Day names */}
                    <div className="grid grid-cols-7 mb-1">
                        {DAYS_PT.map(d => (
                            <div key={d} className="text-center text-[10px] font-medium text-slate-400 py-1">{d}</div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-y-0.5">
                        {days.map((day, idx) => {
                            if (!day) return <div key={`empty-${idx}`} />;
                            const isStart = startDate && isSameDay(day, startDate);
                            const isEnd = endDate && isSameDay(day, endDate);
                            const isInRange = inRange(day);
                            const isHover = hoverDate && isSameDay(day, hoverDate);
                            let cls = 'text-center text-sm py-1.5 cursor-pointer rounded transition-colors ';
                            if (isStart || isEnd) {
                                cls += 'bg-brand-600 text-white font-bold ';
                            } else if (isInRange) {
                                cls += 'bg-brand-100 text-brand-800 ';
                            } else if (isHover) {
                                cls += 'bg-slate-100 ';
                            } else {
                                cls += 'hover:bg-slate-100 text-slate-700 ';
                            }
                            return (
                                <div
                                    key={day.toISOString()}
                                    className={cls}
                                    onClick={() => handleDayClick(day)}
                                    onMouseEnter={() => selecting === 'end' && setHoverDate(day)}
                                    onMouseLeave={() => setHoverDate(null)}
                                >
                                    {day.getDate()}
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer actions */}
                    {selecting === 'end' && startDate && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs text-slate-500">Início: {formatDateBR(startDate)}</span>
                            <button
                                type="button"
                                className="text-xs text-brand-600 font-semibold hover:underline"
                                onClick={() => {
                                    if (startDate) {
                                        const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                                        onChange(fmt(startDate));
                                        setEndDate(null);
                                        setSelecting('start');
                                        setIsOpen(false);
                                    }
                                }}
                            >
                                Confirmar só esse dia
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
