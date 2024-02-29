import React, { useState, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  Calendar,
  utils,
  Day,
  CalendarDigit,
} from "react-modern-calendar-datepicker";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  interface BookedHour {
    date: string;
    hour: string;
  }
  type DateObject = {
    year: number;
    month: number;
    day: number;
  };
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedHours, setBookedHours] = useState<BookedHour[]>([]);
  const [resetSelect, setResetSelect] = useState(false); // Estado para reiniciar el select
  const hours = Array.from({ length: 10 }, (_, i) => 9 + i);
  const allHoursBooked = hours.every((hour) => {
    const time24 = hour < 10 ? `0${hour}:00:00` : `${hour}:00:00`;
    const date = selectedDay
      ? `${selectedDay.year}-${
          selectedDay.month < 10 ? "0" + selectedDay.month : selectedDay.month
        }-${selectedDay.day < 10 ? "0" + selectedDay.day : selectedDay.day}`
      : "";
    return bookedHours.some((bh) => bh.date === date && bh.hour === time24);
  });
  const title = allHoursBooked
    ? "No hay horario disponible"
    : "Selecciona una hora";
  const myCustomLocale = {
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],

    // week days by order
    weekDays: [
      {
        name: "Domingo", // used for accessibility
        short: "D", // displayed at the top of days' rows
        isWeekend: true, // is it a formal weekend or not?
      },
      {
        name: "Lunes",
        short: "L",
      },
      {
        name: "Martes",
        short: "M",
      },
      {
        name: "Miércoles",
        short: "M",
      },
      {
        name: "Jueves",
        short: "J",
      },
      {
        name: "Viernes",
        short: "V",
      },
      {
        name: "Sabado",
        short: "S",
        isWeekend: false,
      },
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 0,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject: DateObject): DateObject {
      return gregorainTodayObject;
    },

    toNativeDate(date: DateObject): Date {
      return new Date(date.year, date.month - 1, date.day);
    },

    getMonthLength(date: DateObject): number {
      return new Date(date.year, date.month, 0).getDate();
    },

    transformDigit(digit: number): number {
      return digit;
    },

    // texts in the date picker
    nextMonth: "Next Month",
    previousMonth: "Previous Month",
    openMonthSelector: "Open Month Selector",
    openYearSelector: "Open Year Selector",
    closeMonthSelector: "Close Month Selector",
    closeYearSelector: "Close Year Selector",
    defaultPlaceholder: "Select...",

    // for input range value
    from: "from",
    to: "to",

    // used for input value when multi dates are selected
    digitSeparator: ",",

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isNumeric = /^\d+$/.test(phone);

    if (!isNumeric || phone.length !== 10) {
      alert(
        "El teléfono debe contener solo números y tener exactamente 10 dígitos"
      );
      return;
    }

    let timeIn24HourFormat = parseInt(selectedTime);
    if (timeIn24HourFormat >= 1 && timeIn24HourFormat <= 6) {
      timeIn24HourFormat += 12;
    }

    const BookingData = {
      name,
      email,
      phone,
      date: selectedDay
        ? `${selectedDay.year}-${selectedDay.month}-${selectedDay.day} ${timeIn24HourFormat}:00:00`
        : "",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/booking`,
        BookingData
      );
      console.log(response);
      toast.success("Reservación exitosa");
      setName("");
      setEmail("");
      setPhone("");
      setSelectedTime("");
      setResetSelect((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getBookedHours() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST_URL}/bookedHours`
        );
        setBookedHours(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getBookedHours();
  }, [resetSelect]);

  return (
    <div className="flex justify-center md:flex-row flex-col items-center h-screen gap-4">
      <Calendar
        value={selectedDay}
        colorPrimary="#EC4988"
        minimumDate={utils("en").getToday()}
        onChange={(value: Day) => setSelectedDay(value)}
        calendarClassName="border-2 border-gray-800 rounded-xl"
        locale={{
          ...myCustomLocale,
          transformDigit: (digit: CalendarDigit) => digit,
        }}
        shouldHighlightWeekends
      />
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex gap-4 flex-col items-center"
          >
            <input
              type="text"
              className="border-2 border-gray-300 p-2 rounded-md text-center focus:outline-none w-80"
              value={`${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`}
              readOnly
            />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              className="border-2 border-gray-300 p-2 rounded-md text-center focus:outline-none w-80"
            >
              <option value="">{title}</option>
              {hours.map((hour) => {
                const time =
                  hour <= 11
                    ? `${hour}:00 AM`
                    : hour === 12
                    ? `12:00 PM`
                    : `${hour - 12}:00 PM`;
                const time24 = hour < 10 ? `0${hour}:00:00` : `${hour}:00:00`; // Asegúrate de que la hora esté formateada como HH:00:00
                const date = selectedDay
                  ? `${selectedDay.year}-${
                      selectedDay.month < 10
                        ? "0" + selectedDay.month
                        : selectedDay.month
                    }-${
                      selectedDay.day < 10
                        ? "0" + selectedDay.day
                        : selectedDay.day
                    }`
                  : ""; // Asegúrate de que la fecha esté formateada como YYYY-MM-DD
                if (
                  bookedHours.some(
                    (bh) => bh.date === date && bh.hour === time24
                  )
                ) {
                  // Esta hora ya está reservada para el día seleccionado, así que no la mostramos
                  return null;
                }
                return (
                  <option key={hour} value={time}>
                    {time}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              className="border-2 border-gray-300 p-2 rounded-md text-center focus:outline-none w-80"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="border-2 border-gray-300 p-2 rounded-md text-center focus:outline-none w-80"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              className="border-2 border-gray-300 p-2 rounded-md text-center focus:outline-none w-80"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={10}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md w-80 focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
              type="submit"
            >
              Agendar
            </button>
          </form>
          <Toaster position="top-right" />
        </motion.div>
      )}
    </div>
  );
};

export default App;
