---
title: "Real case: when .populate() isn't enough (and what I learned integrating MongoDB with Oracle)"
description: Lessons learned integrating MongoDB with Oracle, and the challenges of building relationships across a legacy relational database and a non-relational one.
date: '2025-05-29'
tags:
  - mongodb
  - mongoose
  - programming
  - webdev
devToUrl: https://dev.to/eduuu_dev/caso-real-cuando-populate-no-es-suficiente-y-lo-que-aprendi-integrando-mongodb-con-oracle-1lbo
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fez9w1m0f3w9f8bkbc5ib.webp
---

A while back I faced an interesting challenge as a backend developer.

A client needed to extend their system. It was a kind of evolutionary migration: they wanted to build a new module that was key to the business, while keeping some critical data in their legacy database (Oracle).

The stack
For the new module we decided to work with MongoDB, which forced us to design an integration layer so both databases could coexist during the transition. The problem came when one of the requirements was:

"For data coming from Oracle, we want to keep the same id as the identifier in Mongo."

Sounds simple, right? But this is where Mongoose comes in.

---

## What is Mongoose?
For those who don't know it, Mongoose is an ODM (Object Document Mapper) for MongoDB in the Node.js ecosystem. It lets you structure your collections like models in an ORM, with schemas, validations, middlewares, and yes, relationships between documents.

That's exactly where `.populate()` comes in — a function that mimics SQL-style joins, letting you relate documents across collections.

The real problem
When we tried to relate documents by a field that wasn't Mongo's `_id`, the problems started.

By default, Mongoose does `.populate()` using the `_id` field. But in this case, we wanted to do `.populate()` using a field called `id` that came from Oracle and that we had to preserve.

We tried things like:

```
js
Copy
Edit
ref: 'User',
localField: 'userId',
foreignField: 'id',
justOne: true
```

And although that got us to a partial solution using virtual populates, the code started to become harder to read and maintain.

The (compromise) solution
We chose to build the documents in Mongo using both fields:

```
json
Copy
Edit
{
  "_id": "legacy-id-value",
  "id": "legacy-id-value",
  "otherFields": "..."
}
```

This let us keep compatibility with Mongoose without touching too many parts of the system, while honoring the requirement to preserve the same identifier from the legacy system.

---

## Takeaways

💡 Cases like this are a good example of why people say MongoDB isn't built for complex relationships. It's easy to underestimate these details until you need to do something like `.populate()` with special conditions.

👀 Mongoose offers powerful tools, but it also has its limits once you step outside the standard path.

⚠️ It's important to think carefully about your data structure before migrating or integrating with existing systems. Mongo gives you flexibility, but that flexibility can work against you once you start to scale or have to coexist with relational systems.

---

## Solution

So, what now?
In our case, keeping both fields (`_id` and `id`) was an acceptable compromise. Ideal? No. Pragmatic? Absolutely.

🔧 If you find yourself in a similar situation:

Evaluate whether you can map the data before saving it.

Consider the limits of `.populate()` with non-conventional fields.

Use virtuals carefully, and document their purpose well.

And if you start writing a lot of `.aggregate()` calls to work around these problems… maybe Mongo isn't the right place.

---

Has something similar happened to you? Have you had to make Mongo coexist with legacy systems?

Let me know in the comments or share your experience. 🙌
