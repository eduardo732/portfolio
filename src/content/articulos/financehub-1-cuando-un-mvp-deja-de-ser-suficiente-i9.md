---
title: 'FinanceHub #1: Cuando un MVP deja de ser suficiente'
description: Lo que aprendimos al migrar FinanceHub de una plataforma no-code
  a un backend propio con Spring Boot, y por qué la parte difícil no fue
  escribir código.
date: '2026-08-05'
tags:
  - architecture
  - programming
  - ai
  - discuss
devToUrl: https://dev.to/eduuu_dev/financehub-1-cuando-un-mvp-deja-de-ser-suficiente-i9
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fjwme82o2ksezps4y167p.png
---

## Introducción

Hace un tiempo, junto a un compañero, comenzamos a desarrollar FinanceHub.

La idea era simple: construir una aplicación que nos ayudara a entender mejor nuestras finanzas personales.

Como ocurre con muchos proyectos, queríamos validar la idea lo antes posible, así que decidimos comenzar utilizando una plataforma no-code.

Y funcionó.

En poco tiempo teníamos una aplicación usable. Podíamos registrar ingresos, gastos y visualizar parte de nuestra información financiera.

Para un MVP, era exactamente lo que necesitábamos.

---

## Pero apareció una pregunta

Con el paso del tiempo empezamos a imaginar nuevas funcionalidades.

Más reglas de negocio. Mayor personalización. Una API propia. Integraciones. Mejor seguridad. Mayor control sobre la infraestructura.

Y ahí apareció una pregunta que probablemente muchos desarrolladores se han hecho alguna vez:

> ¿Seguimos construyendo sobre la plataforma actual o es momento de crear nuestra propia base tecnológica?

---

## La decisión

Finalmente decidimos dar el salto.

Mantener la idea. Mantener el producto. Pero reconstruir completamente la plataforma.

Mi desafío fue liderar esa migración técnica: pasar de una solución no-code a un backend desarrollado con Spring Boot, PostgreSQL y una arquitectura pensada para crecer.

---

## Lo curioso

Pensé que la parte difícil sería escribir el nuevo sistema.

No lo fue.

La parte difícil fue decidir cómo construirlo.

Porque cuando dejas de depender de una plataforma, todas las decisiones pasan a ser tuyas: la autenticación, la arquitectura, la infraestructura, la seguridad, los contratos, la base de datos, las migraciones, los despliegues, la observabilidad.

Todo.

---

## La primera decisión importante

Antes de escribir una sola línea de código decidí hacer algo diferente.

No empezar por el código. Empezar por el diseño.

Así nació una metodología basada en especificaciones. Antes de pedirle cualquier tarea a Claude Code, definí:

- la arquitectura,
- el modelo de datos,
- el contrato OpenAPI,
- las reglas del proyecto,
- y un plan dividido en pequeñas fases verificables.

Ese proceso terminó siendo mucho más importante que cualquier prompt.

---

## Lo que más me sorprendió

Durante esta migración entendí algo.

La IA puede escribir muchísimo código. Pero no puede decidir qué sistema quieres construir. Eso sigue siendo trabajo del ingeniero.

Y cuanto más complejo es el proyecto, más importante se vuelve definir reglas claras antes de empezar.

---

## Lo que viene

En los próximos artículos quiero compartir cómo fuimos tomando esas decisiones. No para enseñar un framework en particular, sino para mostrar cómo estamos abordando la construcción de un producto real desde una perspectiva de ingeniería.

Porque al final, FinanceHub dejó de ser solo una aplicación para administrar finanzas.

Se convirtió en un laboratorio donde estamos aprendiendo sobre arquitectura, cloud, agentes de IA y diseño de software.
