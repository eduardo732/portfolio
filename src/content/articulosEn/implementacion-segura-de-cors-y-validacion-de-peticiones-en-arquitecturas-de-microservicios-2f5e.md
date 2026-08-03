---
title: Secure CORS Implementation and Request Validation in Microservices Architectures
description: A guide to implementing CORS securely and validating requests in microservices architectures, keeping your applications safe and reliable.
date: '2025-10-24'
tags:
  - microservices
  - security
  - backend
  - programming
devToUrl: https://dev.to/eduuu_dev/implementacion-segura-de-cors-y-validacion-de-peticiones-en-arquitecturas-de-microservicios-2f5e
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fx5k8wo9r40akw6fvnyxf.jpg
---

## 1. Introduction

When we design an API that will be consumed by different clients — web apps, mobile apps, or internal microservices — it's essential to control who can access it and under what conditions.
One of the most important mechanisms for protecting endpoints exposed on the web is CORS (Cross-Origin Resource Sharing).

**What is CORS?**
CORS is a security policy implemented by browsers that prevents a website on one domain (https://app.com) from making requests to another domain (https://api.com) unless the server explicitly authorizes it.

This prevents attacks like Cross-Site Request Forgery (CSRF) or data leakage between unrelated origins.

**Why it matters**
An incorrect CORS configuration can leave an API open to requests from any origin, exposing sensitive data.
Example:
```
Access-Control-Allow-Origin: *
```

This header, used without control, lets any site in the world interact with your API.

**Difference between browser requests and server-to-server requests**

| Type                  | Includes Origin? | Requires CORS? | Example                             |
| --------------------- | ---------------- | --------------- | ------------------------------------ |
| Browser (frontend)    | Yes               | Yes              | Request from React, Angular, etc.   |
| Internal microservice | No                | No               | Communication between internal APIs |
| CLI client            | No                | No               | curl, Postman, etc.                 |

---

## 2. The problem

Many default configurations or examples online apply generic solutions, like allowing all origins or using wildcards.
While this simplifies testing, in production it can create serious vulnerabilities.

Common risks:

1. Allowing all origins (`*`): Fine for development, dangerous in production.

2. Validating with `endsWith()` or weak expressions: Allows fake subdomains like `evil.myapp.com`.

3. Not distinguishing between browsers and services: CORS policies get applied even to internal requests that don't need them.

4. Skipping token validation: APIs that accept any Origin but don't require valid authentication.

---

## 3. Dual security strategy

The safest way to approach this problem is to combine two complementary levels of validation:
- Origin validation (CORS) for requests coming from browsers.
- Authorization validation (token or API key) for requests coming from other servers or internal services.

**In other words:**
Browsers are validated by who they are (their domain).
Services are validated by what they know (their credentials).

---

## 4. Recommended validation logic

**1. Validate the origin (CORS)**
- Only allow known domains (no wildcards).
- Verify the scheme is HTTPS.
- Avoid simple comparisons like `endsWith()`; use exact matches or allowlists.
- Include an explicit list of trusted origins: `https://app.mycompany.com`, `https://admin.mycompany.com`

**2. Validate authorization**
- Accept JWT tokens or API keys only over secure channels (HTTPS).
- Reject requests without valid credentials.
- Allow exceptions only for documented public endpoints.

**3. Decision logic (summary)**

| Request type           | `Origin` header | Token/API Key | Result           | Typical use                    |
| ----------------------- | ----------------- | -------------- | ----------------- | -------------------------------- |
| Trusted browser         | Valid              | -              | Allow + CORS      | Web frontend                     |
| Disallowed browser      | Invalid            | -              | Reject 403        | External site                    |
| Internal microservice   | Null               | Valid          | Allow             | Internal communication           |
| Anonymous request       | Null               | Null           | Reject 403        | Postman/curl without token       |
| Preflight OPTIONS       | Valid              | -              | Allow 200         | Browser pre-check                |


---

## 5. Conclusion

Security in modern APIs doesn't depend only on authentication, but also on controlling the context requests come from.
Implementing a strict CORS policy along with solid token validation ensures that:
- Only authorized clients can interact with the endpoints.
- Internal communications remain secure and verified.
- Unauthorized access from external or malicious sites is prevented.

In any language or framework, the key is applying a coherent, auditable dual strategy — instead of relying on generic configurations or shortcuts.
