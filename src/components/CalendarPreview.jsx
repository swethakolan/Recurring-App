import { format, parseISO, isValid } from 'date-fns';

const CalendarPreview = ({ dates }) => {
  if (!dates.length) return <p className="text-gray-400">No dates selected</p>;

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2">🗓️ Mini Calendar Preview:</h3>
      <ul className="grid grid-cols-2 gap-2 text-sm">
        {dates.map((date) => {
          const parsed = parseISO(date);
          return (
            <li key={date} className="bg-white text-black p-2 rounded-lg shadow">
              {isValid(parsed) ? format(parsed, 'PPPP') : 'Invalid date'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CalendarPreview;

