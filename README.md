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

Or you can use `useAppointment` hook with your own custom components and even mix some of the provided components like `CalenderCard`.

### Components

### `AppointmentCalenderProvider`

This is a Wrapper for the appointment state management and pre-configurations.

| Prop         | Type    | Description                                                                              | Default |
| ------------ | ------- | ---------------------------------------------------------------------------------------- | ------- |
| dates        | IDate[] | Provide custom dates list _(you can use provided helper functions to create dates list)_ | -       |
| formats      | Object  | Provide the custom format for `Date` and `Time`                                          | -       |
| durationStep | number  | Number by which duration should increase or decrease                                     | 30      |
| minDuration  | number  | Minimum that the duration can be                                                         | 30      |
| maxDuration  | number  | Maximum that the duration can be                                                         | 120     |
| token        | number  | Style Tokens for the calender components                                                 | -       |

```ts
interface IDate = {
  dates: Dayjs;
  closed: boolean;
}
```

```ts
interface Formats = {
  date: string; /** @default "DD, MMMM YYYY" */
  time: string; /** @default "h:mm a" */
}
```

### `CalendarAppointment`

This is the main component and can be used as is with `useAppointment`, or can be used as a controlled component.

| Prop                    | Type                                        | Description                                          | Default |
| ----------------------- | ------------------------------------------- | ---------------------------------------------------- | ------- |
| dates                   | IDate[]                                     | Provide custom dates list if not using Provider      | -       |
| durationStep            | number                                      | Amount by which duration should increase or decrease | 30      |
| minDuration             | number                                      | Minimum time the duration can be                     | 30      |
| maxDuration             | number                                      | Maximum time the duration can be                     | 120     |
| formats                 | Object                                      | Provide the custom format for `Date` and `Time`      | -       |
| timeComponent           | ReactElement                                | Custom component for time panel                      | -       |
| calenderComponent       | ReactElement                                | Custom component for calender panel                  | -       |
| durationComponent       | ReactElement                                | Custom component for duration panel                  | -       |
| containerStyle          | CSSProperties                               | Component container styles object                    | -       |
| collapseContainerStyle  | CSSProperties                               | Collapse container styles object                     | -       |
| durationContainerStyles | CSSProperties                               | Duration panel container styles object               | -       |
| cardStyles              | {head?: CSSProperties, body: CSSProperties} | CalenderCard component styles object                 | -       |
| onChange                | ({dateTime, duration}) => void              | callback each time any value is changed              | -       |

### `CalendarCarousel`

This is the default calender component used in `CalendarAppointment`.

| Prop           | Type                                        | Description                                                  | Default    |
| -------------- | ------------------------------------------- | ------------------------------------------------------------ | ---------- |
| dates          | IDate[]                                     | Provide custom dates list if not using Provider              | -          |
| containerWidth | number                                      | Custom width of the container (recommended to leave default) | calculated |
| cardStyles     | {head?: CSSProperties, body: CSSProperties} | CalenderCard component styles object                         | -          |
| onSelectDate   | (date: Dayjs) => void                       | Callback when date is selected                               | -          |

### `CalenderCard`

This is the default calender card component used in `CalendarCarousel` component.

| Prop      | Type                    | Description                                      | Default |
| --------- | ----------------------- | ------------------------------------------------ | ------- |
| date      | Dayjs                   | Date to be displayed on the card                 | -       |
| closed    | boolean                 | If `true`, card will be grayed and un-selectable | false   |
| onClick   | (e: MouseEvent) => void | Callback on click                                | -       |
| headStyle | CSSProperties           | Styles object for head part of the card          | -       |
| bodyStyle | CSSProperties           | Styles object for body part of the card          | -       |

### Hooks

### `useAppointmentCalender()`

This contains all the configs and state of the appointment calender.

| Values           | Type                                 | Description                                                    |
| ---------------- | ------------------------------------ | -------------------------------------------------------------- |
| dates            | IDate[]                              | List of dates to be shown in carousel                          |
| formats          | Object                               | Provided formats for date and time                             |
| values           | SelectedValues                       | Object containing currently selected values                    |
| durationStep     | number                               | Amount by which duration should increase or decrease           |
| minDuration      | number                               | Minimum time the duration can be                               |
| maxDuration      | number                               | Maximum time the duration can be                               |
| setDate          | (Dayjs): void                        | Manually set the current selected date                         |
| setDuration      | (number): void                       | Manually set the current selected duration                     |
| setDatesList     | (IDate): void                        | Manually set the list of dates                                 |
| addTime          | (value: number, type: string): Dayjs | Adds time into current selected date object and returns it     |
| subtractTime     | (value: number, type: string): Dayjs | Subtract time from current selected date object and returns it |
| increaseDuration | (number): number                     | Adds time into duration and returns updated duration           |
| decreaseDuration | (number): number                     | Subtract time from duration and returns updated duration       |
| canAddTime       | (by: 'hours' or 'minutes'): boolean  | returns true if time can be added without changing day         |
| canSubtractTime  | (by: 'hours' or 'minutes'): boolean  | returns true if time can be subtracted without changing day    |

```ts
interface SelectedValues {
  datetime: Dayjs
  duration: number
}
```

### Helper Functions

These helper functions can be used to generate a list of dates.

### `getDateList()`

| Args       | Type       | Description                                           |
| ---------- | ---------- | ----------------------------------------------------- |
| start      | number     | Start date of the list                                |
| end        | Dayjs      | Last date of the list                                 |
| closedDays | ClosedDays | Sets `closed` to `true` for selected days of the week |

```ts
type ClosedDays = Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>
```

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

### Design Token

Design token can be provided to `AppointmentCalenderProvider` for customization.

List of available tokens:

| Token                 | Description                                         | Type                 | Default    |
| --------------------- | --------------------------------------------------- | -------------------- | ---------- |
| calenderColor         | Color of the header of `CalenderCard` when active   | string               | '#ff4d4f', |
| calenderDisabledColor | Color of the header of `CalenderCard` when disabled | string               | '#8c8c8c', |
| calenderTextColor     | Color of date and day fonts in `CalenderCard`       | string               | '#8c8c8c', |
| fontSizeSM            | Small font size                                     | number               | 12,        |
| fontSize              | Standard font size                                  | number               | 14,        |
| fontSizeLG            | Large font size                                     | number               | 16,        |
| fontSizeXL            | Super large font size                               | number               | 20,        |
| fontSizeXXL           | Extra super large font size                         | number               | 24,        |
| fontSizeXXXL          | Extra super duper large font size                   | number               | 30,        |
| calenderDateFontSize  | font size of date in `CalenderCard`                 | number               | 40,        |
| calenderCardSize      | Size of the `CalenderCard`                          | number               | 170,       |
| calenderCardGap       | Gap between `CalenderCard` components               | number               | 10,        |
| calenderCardsPerView  | Number of `CalenderCard` shown per view             | number or Breakpoint | 3,         |

```ts
interface BreakPoint {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}
```

## License

[MIT Licensed](LICENSE)
Copyright (c) 2023 Muqarrab Hussain
