import type { Timetable } from "@/types/data-access/timetable";
import { useCallback } from "react";
import DesktopLessonCard from "./desktop-lesson-card";

type Props = {
    hours: string[];
    timetableData: Timetable["data"];
    weekParity: "EVEN" | "ODD";
};

const useDesktopTimetableGrid = (
    timetableData: Timetable["data"],
    weekParity: "EVEN" | "ODD",
) => {
    const getLesson = useCallback(
        (dayIndex: number, hourIndex: number) => {
            const dayData = timetableData[dayIndex];
            if (!dayData) return null;

            const classData =
                weekParity === "EVEN" ? dayData.even : dayData.odd;

            const lesson = classData.find((l) => l.rowId === hourIndex) || null;
            return lesson;
        },
        [timetableData, weekParity],
    );

    return { getLesson };
};

export default function DesktopTimetableGrid({
    hours,
    timetableData,
    weekParity,
}: Props) {
    const { getLesson } = useDesktopTimetableGrid(timetableData, weekParity);

    return (
        <div className="flex-1 pb-4">
            <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] gap-4">
                {/* Time column */}
                <div className="flex flex-col">
                    {hours.map((hour, index) => (
                        <div
                            key={`time-${index}`}
                            className="border-border-muted text-foreground flex min-h-20 items-center justify-center border-b text-sm font-normal first:border-t"
                        >
                            {hour.replace(/\s+/g, "")}
                        </div>
                    ))}
                </div>

                {/* Days columns */}
                {Array.from({ length: 5 }, (_, dayIndex) => (
                    <div
                        key={`day-${dayIndex}`}
                        className="flex h-full flex-col"
                    >
                        {hours.map((hour, hourIndex) => (
                            <div
                                key={`cell-${dayIndex}-${hourIndex}`}
                                className="border-border-muted min-h-20 border-b p-1 first:border-t"
                            >
                                <DesktopLessonCard
                                    lesson={getLesson(dayIndex, hourIndex)}
                                    hour={hour}
                                    weekDayIndex={dayIndex}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
