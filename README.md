# appointment-calendar-carousal

React components for creating carousel based calendar appointments.

[![NPM version][npm]][npm-url]
[![Bundle size][size]][size-url]
[![Downloads][downloads]][downloads-url]

[npm]: https://img.shields.io/npm/v/appointment-calendar-carousal.svg
[npm-url]: https://www.npmjs.com/package/appointment-calendar-carousal
[size]: https://img.shields.io/bundlephobia/minzip/appointment-calendar-carousal
[size-url]: https://bundlephobia.com/package/appointment-calendar-carousal
[downloads]: https://img.shields.io/npm/dm/appointment-calendar-carousal.svg
[downloads-url]: https://www.npmjs.com/package/appointment-calendar-carousal

<br />
<a href="##quickstart">Quickstart</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#docs">Docs</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#license">License</a>
<br />
<hr />

## Quickstart

Install the library with peer dependencies:

```bash
# With yarn
yarn add appointment-calendar-carousal antd dayjs

# or with npm
npm i appointment-calendar-carousal antd dayjs
```

**Note:** `antd` and `dayjs` are required for this package to work.
It is recommended to use `antd@^5.0.0` and `dayjs@1.11.0`

Then, import the `AppointmentCalenderProvider` and wrap your app with it

```jsx
import { AppointmentCalenderProvider } from 'appointment-calendar-carousal'

function App() {
    return (
        <AppointmentCalenderProvider>
         {...}
        </AppointmentCalenderProvider>
    )
}
```

Lastly, import `CalendarAppointment` and `useAppointmentCalender` hook

```jsx
import CalendarAppointment, { useAppointmentCalender } from 'appointment-calendar-carousal'

function SomeComponent() {
    const { selectedDates } = useAppointment()

    return (
        {...}
         <CalendarAppointment />
        {...}
    )
}
```

## Docs

You can use `appointment-calendar-carousal` as is by just wrapping the app with `AppointmentCalenderProvider` and placing the `CalendarAppointment` component where needed. Then You can get values from the provided `useAppointment` hook.

Or you can even use it with your own custom components and even mix some of the provided components like `CalenderCard` as all the components are importable and reuseable for better customization.

### **Components**

---

### `AppointmentCalenderProvider`

This is a Wrapper for the appointment state management and pre-configurations.

| Prop          | Type    | Description                                                                              | Default |
| ------------- | ------- | ---------------------------------------------------------------------------------------- | ------- |
| dates         | IDate[] | Provide custom dates list _(you can use provided helper functions to create dates list)_ | -       |
| formats       | Object  | Provide the custom format for `Date` and `Time`                                          | -       |
| stylesConfigs | Object  | Provide some basic configs to the calender carousel                                      | -       |
| durationStep  | number  | Amount by which duration should increase or decrease                                     | 30      |

```ts
interface IDate = {
  dates: Dayjs;
  isCurrent: boolean; /** wether date is today */
  closed: boolean;
}
```

```ts
interface Formats = {
  date: string; /** @default "DD, MMMM YYYY" */
  time: string; /** @default "h:mm a" */
}
```

```ts
interface StyleConfigs = {
  cardWidth?: number; /** @default 170 */
  gap?: number; /** @default 10 */
  cardsPerView?: number; /** @default 3 */
}
```

### `CalendarAppointment`

This is the main component and can be used as is with `useAppointment`, or can be used as a controlled component.

| Prop         | Type                           | Description                                          | Default |
| ------------ | ------------------------------ | ---------------------------------------------------- | ------- |
| data         | IDate[]                        | Provide custom dates list if not using Provider      | -       |
| formats      | Object                         | Provide the custom format for `Date` and `Time`      | -       |
| gap          | number                         | Space between each card within carousel              | 10      |
| cardsPerView | number                         | Number of cards shown per view in carousel           | 3       |
| cardWidth    | number                         | Width of the `CalenderCard`                          | 170     |
| durationStep | number                         | Amount by which duration should increase or decrease | 30      |
| onChange     | ({dateTime, duration}) => void | callback each time any value is changed              | -       |

### Hooks

---

### `useAppointmentCalender()`

This contains all the configs and state of the appointment calender.

| Values           | Type                                 | Description                                                        |
| ---------------- | ------------------------------------ | ------------------------------------------------------------------ |
| dates            | IDate[]                              | List of dates to be shown in carousel                              |
| formats          | Object                               | Provided formats for date and time                                 |
| stylesConfig     | Object                               | Provided style configs                                             |
| values           | SelectedValues                       | Object containing currently selected values                        |
| durationStep     | number                               | Amount by which duration should increase or decrease               |
| setDate          | (Dayjs): void                        | Manually set the current selected date                             |
| setDuration      | (number): void                       | Manually set the current selected duration                         |
| setDatesList     | (IDate): void                        | Manually set the list of dates                                     |
| setSelectedDates | (IDate): void                        | Manually set selected date _(useful if creating custom component)_ |
| addTime          | (value: number, type: string): Dayjs | Adds time into current selected date object and returns it         |
| subtractTime     | (value: number, type: string): Dayjs | Subtract time from current selected date object and returns it     |
| increaseDuration | (number): number                     | Adds time into duration and returns updated duration               |
| decreaseDuration | (number): number                     | Subtract time from duration and returns updated duration           |

```ts
interface SelectedValues {
  datetime: Dayjs
  duration: number
}
```

### Helper Functions

---

These helper functions can be used to generate a list of dates.

### `getDateList()`

| Args       | Type       | Description                                           |
| ---------- | ---------- | ----------------------------------------------------- |
| start      | number     | Start date of the list                                |
| end        | Dayjs      | Last date of the list                                 |
| closedDays | ClosedDays | Sets `closed` to `true` for selected days of the week |

### `getDatesByNumber()`

| Args       | Type           | Description                                                                         |
| ---------- | -------------- | ----------------------------------------------------------------------------------- |
| number     | number         | Number by which list items are added based on the type                              |
| type       | ManipulateType | Type by which number of items to be added are decided. for example, "day" or "month |
| closedDays | ClosedDays     | Sets `closed` to `true` for selected days of the week                               |

### `getDates()`

:no_entry: [DEPRECATED]

| Args       | Type       | Description                                                                                                        |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| radius     | number     | if no `from` and `to` are provided you can provide `radius` to let generate dates list with in the radius of _Now_ |
| from       | Dayjs      | Date from which the date list should start                                                                         |
| to         | Dayjs      | Date at which the date list should end                                                                             |
| closedDays | ClosedDays | Sets `closed` to `true` for selected days of the week                                                              |

```ts
type ClosedDays = Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>
```

## License

[MIT Licensed](LICENSE)
Copyright (c) 2023 Muqarrab Hussain
