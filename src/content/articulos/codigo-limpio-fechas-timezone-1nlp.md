---
title: 'Código Limpio: Fechas (TimeZone)'
description: Explorando las mejores prácticas para manejar fechas y zonas horarias
  en el desarrollo de software.
date: '2025-07-15'
tags:
- programming
- webdev
- beginners
- cleancode
devToUrl: https://dev.to/eduuu_dev/codigo-limpio-fechas-timezone-1nlp
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fhy3sgk6d632lt3ycnq3y.webp
---

**Porque sí, las fechas son más complejas de lo que parece…**
Como desarrolladores, tarde o temprano nos encontramos con el dilema de manejar fechas correctamente. Lo que comienza como un simple new Date() puede escalar a problemas de zonas horarias, inconsistencias entre frontend y backend, y bugs que aparecen en el camino.

Por eso, en este artículo te muestro cómo estructurar el manejo de fechas de forma profesional, limpia y reutilizable.

---

## Regla de oro: encapsula las operaciones de fecha

Uno de los mejores consejos que puedo darte es que no trabajes con fechas directamente en cada parte de tu código. En lugar de eso, crea una clase o módulo que se encargue exclusivamente del manejo de fechas.

Esto te dará:

- Código más limpio

- Operaciones reutilizables

- Menos bugs en producción

- Mejor manejo de zonas horarias

- Más facilidad para testear

Además, si en algún momento decides cambiar la librería que usas (Date, Luxon, Day.js, etc.), solo tienes que cambiarlo en un solo lugar.

---

## Guardar en UTC, mostrar en zona local
**MongoDB**
MongoDB guarda fechas en formato UTC si usas new Date() desde Node.js.

```

await db.collection('users').insertOne({
  createdAt: new Date()
});

```

**PostgreSQL**
Usa el tipo de columna timestamp with time zone. Aunque el nombre suene confuso, guarda la fecha en UTC.

```
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

En ambos casos, el dato se guarda en UTC, y la conversión a la zona del usuario debe hacerse solo cuando se va a mostrar.

---

## Clase TypeScript para encapsular fechas

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
**Este módulo te permitirá:**

- Comparar fechas
- Convertir a zona local
- Convertir a UTC
- Crear fechas desde strings localizados
- Exportarlas como Date para persistirlas

---

## Controla los formatos
Es una buena práctica definir formatos únicos para mostrar las fechas en toda la aplicación.

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

Así evitas inconsistencias visuales y puedes modificar todos los formatos desde un solo lugar.

---

## Conclusión

Encapsular tu lógica de fechas y trabajar siempre en UTC es una de las mejores inversiones que puedes hacer, te ahorarás dolores de cabeza.
