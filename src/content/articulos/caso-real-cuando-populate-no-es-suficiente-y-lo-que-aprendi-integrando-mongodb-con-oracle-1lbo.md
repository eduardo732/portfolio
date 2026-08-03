---
title: '🧠 Caso real: cuando .populate() no es suficiente (y lo que aprendí integrando
  MongoDB con Oracle)'
description: Aprende sobre los desafíos de integrar MongoDB con Oracle y las lecciones
  aprendidas en el proceso.
date: '2025-05-29'
tags:
- mongodb
- mongoose
- programming
- webdev
devToUrl: https://dev.to/eduuu_dev/caso-real-cuando-populate-no-es-suficiente-y-lo-que-aprendi-integrando-mongodb-con-oracle-1lbo
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fez9w1m0f3w9f8bkbc5ib.webp
---

Hace un tiempo me tocó un desafío interesante como backend developer.

Un cliente necesitaba extender su sistema. Era una especie de migración evolutiva: querían crear un nuevo módulo clave para el negocio, pero conservando algunos datos críticos en su base de datos legacy (Oracle).

El stack
Para el nuevo módulo se decidió trabajar con MongoDB, lo cual nos forzaba a diseñar una lógica de integración para que ambas bases pudieran coexistir mientras se realizaba la transición. El problema vino cuando uno de los requerimientos fue:

"Para los datos que vengan de Oracle, queremos mantener el mismo id como identificador en Mongo."

Parece simple, ¿no? Pero aquí es donde entra Mongoose.

---

## ¿Qué es Mongoose?
Para quienes no lo conocen, Mongoose es un ODM (Object Document Mapper) para MongoDB en el ecosistema de Node.js. Sirve para estructurar tus colecciones como si fueran modelos en un ORM, con schemas, validaciones, middlewares, y sí, relaciones entre documentos.

Es justamente ahí donde aparece .populate(), una función que simula los joins del mundo SQL, permitiéndote relacionar documentos entre colecciones.

El problema real
Cuando quisimos relacionar documentos por un campo que no era el _id de Mongo, comenzaron los problemas.

Mongoose por defecto hace .populate() usando el campo _id. Pero en este caso, queríamos hacer .populate() usando un campo llamado id que venía desde Oracle y que debíamos conservar.

Intentamos cosas como:

```
js
Copy
Edit
ref: 'User',
localField: 'userId',
foreignField: 'id',
justOne: true
```

Y aunque eso nos llevó a una solución parcial usando populate virtuales, se empezó a complicar la lectura del código y la mantenibilidad.

La solución (de compromiso)
Optamos por construir los documentos en Mongo usando ambos campos:

```
json
Copy
Edit
{
  "_id": "valor-id-legacy",
  "id": "valor-id-legacy",
  "otrosCampos": "..."
}
```

Esto nos permitió mantener compatibilidad con Mongoose sin modificar demasiadas partes del sistema, y respetar el requerimiento de mantener el mismo identificador del sistema legacy.

---

## Conclusiones

💡 Este tipo de casos son un buen ejemplo de cuando se habla de que MongoDB no está hecho para relaciones complejas. A veces es fácil subestimar estos detalles hasta que necesitas hacer cosas como .populate() con condiciones especiales.

👀 Mongoose ofrece herramientas potentes, pero también tiene sus limitaciones cuando queremos salirnos de lo estándar.

⚠️ Es importante pensar bien la estructura de los datos antes de migrar o integrar con sistemas existentes. Mongo te da flexibilidad, pero esa flexibilidad puede jugarte en contra cuando empiezas a crecer o te toca convivir con sistemas relacionales.

---

## Solución

¿Y entonces?
En nuestro caso, mantener ambos campos (_id e id) fue un compromiso aceptable. ¿Ideal? No. ¿Pragmático? Totalmente.

🔧 Si te encuentras en una situación parecida:

Evalúa si puedes mapear los datos antes de guardarlos.

Considera los límites de .populate() con campos no convencionales.

Usa virtuales con cuidado, y documenta bien su propósito.

Y si empiezas a escribir muchos .aggregate() para solucionar estos problemas… quizá Mongo no es el lugar.

---

¿Te ha pasado algo similar? ¿Has tenido que hacer convivir Mongo con sistemas legacy?

Déjamelo saber en los comentarios o comparte tu experiencia. 🙌
