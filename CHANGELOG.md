# master

# 1.3.0

1. Added Design Tokens, which can be provided to `AppointmentCalenderProvider` for customization.
   | Token | Description | Type | Default |
   | --------------------- | --------------------------------------------------- | -------------------- | ---------- |
   | calenderColor | Color of the header of `CalenderCard` when active | string | '#ff4d4f', |
   | calenderDisabledColor | Color of the header of `CalenderCard` when disabled | string | '#8c8c8c', |
   | calenderTextColor | Color of date and day fonts in `CalenderCard` | string | '#8c8c8c', |
   | fontSizeSM | Small font size | number | 12, |
   | fontSize | Standard font size | number | 14, |
   | fontSizeLG | Large font size | number | 16, |
   | fontSizeXL | Super large font size | number | 20, |
   | fontSizeXXL | Extra super large font size | number | 24, |
   | fontSizeXXXL | Extra super duper large font size | number | 30, |
   | calenderDateFontSize | font size of date in `CalenderCard` | number | 40, |
   | calenderCardSize | Size of the `CalenderCard` | number | 170, |
   | calenderCardGap | Gap between `CalenderCard` components | number | 10, |
   | calenderCardsPerView | Number of `CalenderCard` shown per view | number or Breakpoint | 3, |
2. Removed style props related to some components. ( _These are moved to design token_ )

# 1.2.1

1. Added new `minDuration` and `maxDuration` props for restricting to a min/max duration time in the `CalendarAppointment` component and `useAppointmentCalender` hook.
   | Prop | Type | Description | Default |
   | --- | --- | --- | --- |
   | minDuration | number | Minimum time the duration can be | 30 |
   | maxDuration | number | Maximum time the duration can be | 120 |
2. Added capability to add custom components for `CalendarAppointment` panels.

# 1.2.0

1. Added styles props for following components:

   1. CalendarAppointment
      | Prop | Type | Description | Default |
      | --- | --- | --- | --- |
      | containerStyle | CSSProperties | Component container styles object | - |
      | collapseContainerStyle | CSSProperties | Collapse container styles object | - |
      | durationContainerStyles | CSSProperties | Duration panel container styles object | - |
      | durationContainerStyles | CSSProperties | Duration panel container styles object | - |
      | cardStyles | {head?: CSSProperties, body: CSSProperties} | `CalenderCard` component styles object | - |
   2. CalendarCarousel
      | Prop | Type | Description | Default |
      | --- | --- | --- | --- |
      | cardStyles | {head?: CSSProperties, body: CSSProperties} | `CalenderCard` component styles object | - |
   3. CalenderCard
      | Prop | Type | Description | Default |
      | --- | --- | --- | --- |
      | headStyle | CSSProperties | Styles object for head part of the card | - |
      | bodyStyle | CSSProperties | Styles object for body part of the card | - |

2. After selecting date in date panel, date panel will close and time panel will open.
3. If currently selected date is "Today", header will show text "Today" rather then the date.
4. Removed `isCurrent` from `IDate` interface as Dayjs itself provides `isToday` on its date object.
5. Added methods for checking if time can be added/subtracted from selected datetime object without changing day
   | Values | Type | Description |
   | --- | --- | --- |
   | canAddTime | (by: 'hours' or 'minutes'): boolean | returns true if time can be added without changing day |
   | canSubtractTime | (by: 'hours' or 'minutes'): boolean | returns true if time can be subtracted without changing day |
