---
title: 'Clean Code: Dates (TimeZone)'
description: Exploring best practices for handling dates and timezones in software development.
date: '2025-07-15'
tags:
  - programming
  - webdev
  - beginners
  - cleancode
devToUrl: https://dev.to/eduuu_dev/codigo-limpio-fechas-timezone-1nlp
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fhy3sgk6d632lt3ycnq3y.webp
---

**Because yes, dates are more complex than they seem…**
As developers, sooner or later we run into the challenge of handling dates correctly. What starts as a simple `new Date()` can escalate into timezone issues, inconsistencies between frontend and backend, and bugs that show up along the way.

That's why, in this article, I'll show you how to structure date handling in a professional, clean, and reusable way.

---

## Golden rule: encapsulate date operations

One of the best pieces of advice I can give you is to not work with dates directly in every part of your code. Instead, create a class or module dedicated exclusively to handling dates.

This will give you:

- Cleaner code

- Reusable operations

- Fewer bugs in production

- Better timezone handling

- Easier testing

Plus, if at some point you decide to switch the library you use (Date, Luxon, Day.js, etc.), you only have to change it in one place.

---

## Store in UTC, display in local time
**MongoDB**
MongoDB stores dates in UTC format if you use `new Date()` from Node.js.

```

await db.collection('users').insertOne({
  createdAt: new Date()
});

```

**PostgreSQL**
Use the `timestamp with time zone` column type. Even though the name sounds confusing, it stores the date in UTC.

```
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

In both cases, the data is stored in UTC, and conversion to the user's timezone should only happen when it's displayed.

---

## TypeScript class to encapsulate dates

```
import { DateTime } from "luxon";

export class DateHelper {
  private date: DateTime;

  constructor(input?: Date | string) {
    this.date = input
      ? DateTime.fromJSDate(new Date(input)).toUTC()
      : DateTime.utc();
  }

  static now(): DateHelper {
    return new DateHelper();
  }

  toUTC(): string {
    return this.date.toUTC().toISO();
  }

  toLocal(zone: string): string {
    return this.date.setZone(zone).toFormat("dd/MM/yyyy HH:mm");
  }

  isAfter(other: DateHelper): boolean {
    return this.date.toMillis() > other.date.toMillis();
  }

  isBefore(other: DateHelper): boolean {
    return this.date.toMillis() < other.date.toMillis();
  }

  isSameDay(other: DateHelper): boolean {
    return this.date.hasSame(other.date, 'day');
  }

  static compare(a: DateHelper, b: DateHelper): number {
    return a.date.toMillis() - b.date.toMillis();
  }

  static fromLocal(dateString: string, zone: string): DateHelper {
    return new DateHelper(DateTime.fromFormat(dateString, "dd/MM/yyyy HH:mm", { zone }).toJSDate());
  }

  toJSDate(): Date {
    return this.date.toJSDate();
  }
}
```
**This module lets you:**

- Compare dates
- Convert to local timezone
- Convert to UTC
- Create dates from localized strings
- Export them as Date to persist

---

## Control your formats
It's good practice to define consistent formats for displaying dates throughout the application.

```
export enum TimeFormats {
  HH_MM = "HH:mm",
  HH_MM_SS = "HH:mm:ss",
}

export enum DateFormats {
  DD_MM_YYYY = "dd/MM/yyyy",
  YYYY_MM_DD = "yyyy-MM-dd",
  FULL_DATE = "dddd dd MMMM yyyy",
}

```

This way you avoid visual inconsistencies and can update every format from a single place.

---

## Conclusion

Encapsulating your date logic and always working in UTC is one of the best investments you can make — it will save you a lot of headaches.
