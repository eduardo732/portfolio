---
title: Implementación segura de CORS y validación de peticiones en arquitecturas de
  microservicios
description: Una guía para implementar CORS de manera segura y validar peticiones
  en arquitecturas de microservicios, asegurando la integridad y seguridad de tus
  aplicaciones.
date: '2025-10-24'
tags:
- microservices
- security
- backend
- programming
devToUrl: https://dev.to/eduuu_dev/implementacion-segura-de-cors-y-validacion-de-peticiones-en-arquitecturas-de-microservicios-2f5e
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fx5k8wo9r40akw6fvnyxf.jpg
---

## 1. Introducción

Cuando diseñamos una API que será consumida por diferentes clientes como aplicaciones web, móviles o microservicios internos, es esencial controlar quién puede acceder a ella y bajo qué condiciones.
Uno de los mecanismos más importantes para proteger los endpoints expuestos en la web es CORS (Cross-Origin Resource Sharing).

**¿Qué es CORS?**
CORS es una política de seguridad implementada por los navegadores que impide que un sitio web en un dominio (https://app.com) realice solicitudes a otro dominio (https://api.com) a menos que el servidor lo autorice explícitamente.

Esto evita ataques como el Cross-Site Request Forgery (CSRF) o el data leakage entre orígenes no relacionados.

**Por qué es importante**
Una configuración incorrecta de CORS puede dejar una API abierta a solicitudes desde cualquier origen, exponiendo datos sensibles.
Ejemplo:
```
Access-Control-Allow-Origin: *
```

Esta cabecera, usada sin control, permite que cualquier sitio del mundo interactúe con tu API.

**Diferencia entre peticiones desde navegador y server-to-server**

| Tipo                  | ¿Incluye Origin? | ¿Requiere CORS? | Ejemplo                             |
| --------------------- | ---------------- | --------------- | ----------------------------------- |
| Navegador (frontend)  | Sí             | Sí            | Petición desde React, Angular, etc. |
| Microservicio interno |  No             |  No            | Comunicación entre APIs internas    |
| Cliente CLI           |  No             |  No            | curl, Postman, etc.             |

---

## 2. El problema

Muchas configuraciones por defecto o ejemplos en internet aplican soluciones genéricas, como permitir todos los orígenes o usar comodines.
Aunque simplifican las pruebas, en producción pueden generar vulnerabilidades serias.

Riesgos comunes:

1. Permitir todos los orígenes (*): Ideal para desarrollo, peligroso en producción.

2. Validar con endsWith() o expresiones débiles: Permite subdominios falsos: evil.miapp.com.

3. No diferenciar entre navegadores y servicios: Se aplican políticas de CORS incluso a peticiones internas que no las requieren.

4. Omitir la validación de tokens: APIs que aceptan cualquier Origin pero no exigen autenticación válida.

---

## 3. Estrategia de seguridad dual

La forma más segura de abordar el problema es combinar dos niveles de validación complementarios:
- Validación de origen (CORS) para peticiones que provienen de navegadores.
- Validación de autorización (token o clave API) para peticiones que provienen de otros servidores o servicios internos.

**En otras palabras:**
Los navegadores se validan por quiénes son (su dominio).
Los servicios se validan por lo que saben (sus credenciales).

---

## 4. Lógica de validación recomendada

**1. Validar el origen (CORS)**
- Solo permitir dominios conocidos (no comodines).
- Verificar que el esquema sea HTTPS.
- Evitar comparaciones simples como endsWith(), usar validaciones exactas o listas blancas.
- Incluir una lista explícita de orígenes confiables: https://app.miempresa.com, https://admin.miempresa.com

**2. Validar autorización**
- Aceptar tokens JWT o API Keys solo en canales seguros (HTTPS).
- Rechazar peticiones sin credenciales válidas.
- Permitir excepciones únicamente para endpoints públicos documentados.

**3. Lógica de decisión (resumen)**

| Tipo de petición       | Cabecera `Origin` | Token/API Key | Resultado       | Uso típico                       |
| ---------------------- | ----------------- | ------------- | --------------- | -------------------------------- |
| Navegador confiable    |  Válido          | -             | Permitir + CORS | Frontend web                     |
| Navegador no permitido |  Inválido        | -             | Rechazar 403    | Sitio externo                    |
| Microservicio interno  |  Null            |  Válido      | Permitir        | Comunicación interna             |
| Petición anónima       |  Null            |  Null        | Rechazar 403    | Postman/curl sin token           |
| Preflight OPTIONS      |  Válido          | -             | Permitir 200    | Verificación previa de navegador |


---

## 5. Conclusión

La seguridad en APIs modernas no depende solo de la autenticación, sino también del control del contexto desde donde se realizan las peticiones.
Implementar una política de CORS estricta y validación de tokens sólida garantiza que:
- Solo los clientes autorizados puedan interactuar con los endpoints.
- Las comunicaciones internas permanezcan seguras y verificadas.
- Se evite el acceso indebido desde sitios externos o maliciosos.

En cualquier lenguaje o framework, la clave es aplicar una estrategia dual coherente y auditable, en lugar de confiar en configuraciones genéricas o atajos.
