---
title: El principio de menor sorpresa y cómo el vibe coding puede romperlo
description: Analizando el principio de menor sorpresa en el desarrollo de software
  y cómo el vibe coding puede afectar la experiencia del usuario.
date: '2025-07-19'
tags:
- programming
- coding
- vibecoding
- discuss
devToUrl: https://dev.to/eduuu_dev/el-principio-de-menor-sorpresa-y-como-el-vibe-coding-puede-romperlo-3nlj
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fym4te4u1rwk9i4ez6u8x.png
---

> El mejor código es el que no te sorprende.

---

Cuando hablamos de buenas prácticas en desarrollo de software, uno de los principios más importantes y a veces ignorado, es el **Principio de Menor Sorpresa**. Este principio establece que el comportamiento del código debería ser el que cualquier desarrollador razonable esperaría.

Es decir: _tu código debería comportarse de forma predecible._

**¿Qué significa esto en la práctica?**
Veamos un ejemplo sencillo:

```
// ¿Qué hace esta función?
function getUser(id: string): any {
  return fetch(`/api/users/${id}`);
}

```

Si lees este código por primera vez, podrías pensar que getUser devuelve un usuario. Pero en realidad devuelve una promesa, no un objeto User.

Un enfoque más alineado con el principio de menor sorpresa sería:

```
async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return await response.json();
}

```
O incluso nombrar la función como fetchUser o getUserAsync, si se desea enfatizar aún más el comportamiento asíncrono.

---

Romper este principio genera fricción entre el desarrollador y el sistema. Cuando te topas con código que no hace lo que esperas, te obliga a perder tiempo leyendo la implementación en lugar de enfocarte en resolver el problema de negocio.

Esto se puede convertir en un efecto dominó: pérdida de tiempo, bugs difíciles de encontrar, o peor aún… errores en producción.

---

**¿Qué tiene que ver el vibe coding?**

Con el interés de herramientas de inteligencia artificial que pueden generar código de forma automática a partir de prompts o ideas generales, muchos desarrolladores están adoptando una nueva forma de programar: escribir por impulso, sin pensar demasiado en la intención o el diseño, dejando que la IA tome decisiones por ellos.

Esta forma de trabajar puede resultar productiva en el corto plazo, pero también puede romper completamente el Principio de Menor Sorpresa.

**¿Por qué el código generado impulsivamente por IA puede sorprender?**

1. Inconsistencia de estilo o paradigmas:
A veces la IA genera código funcional, otras veces imperativo, otras veces reactivo... todo en el mismo proyecto. Esto confunde a quien lee o mantiene el código después.

2. Decisiones mágicas que no se documentan:
El desarrollador que usa IA puede no entender del todo lo que se generó. El código funciona, pero su intención y contexto quedan ocultos.

3. Abstracciones que no se alinean con el dominio del problema:
Es común ver clases, funciones o estructuras que no tienen un nombre claro o una responsabilidad definida, simplemente porque la IA respondió a un prompt mal planteado.

4. Pérdida de convenciones del equipo o del lenguaje:
Lo que antes era una convención interna del equipo, ahora puede romperse con un simple "copiar y pegar" desde la IA.

**¿Cómo respetar el Principio de Menor Sorpresa usando IA?**

- No se trata de no usar IA. Al contrario, es una herramienta poderosa. Pero debemos usarla con intención, con criterio y con responsabilidad:
- Sé el diseñador, no solo el consumidor: guía a la IA con prompts claros y evalúa críticamente lo que produce.
- Refactoriza lo generado: dale tu toque, adáptalo al estilo de tu equipo y asegúrate de que no sorprenda a quien lo lea.
- Prefiere estructuras familiares: nombres de variables, funciones y clases que reflejen el dominio del problema.
- Evita la magia: si algo parece funcionar "porque sí", probablemente merezca una revisión.

---

**Conclusión**

El código que sorprende es difícil de mantener, probar y escalar. Y eso es lo que queremos evitar.

Por muy avanzado que sea el código generado por inteligencia artificial, sigue siendo nuestra responsabilidad garantizar su claridad, coherencia y previsibilidad.

Así que la próxima vez que generes código con ayuda de una IA, recuerda:
El mejor código no es el más creativo… es el que menos sorprende.
