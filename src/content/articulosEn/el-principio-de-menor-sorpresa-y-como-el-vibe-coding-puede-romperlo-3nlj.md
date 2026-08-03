---
title: The Principle of Least Surprise and How Vibe Coding Can Break It
description: Looking at the principle of least surprise in software development and how vibe coding can affect the user experience.
date: '2025-07-19'
tags:
  - programming
  - coding
  - vibecoding
  - discuss
devToUrl: https://dev.to/eduuu_dev/el-principio-de-menor-sorpresa-y-como-el-vibe-coding-puede-romperlo-3nlj
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fym4te4u1rwk9i4ez6u8x.png
---

> The best code is the code that doesn't surprise you.

---

When we talk about good software development practices, one of the most important — and sometimes ignored — principles is the **Principle of Least Surprise**. This principle states that your code's behavior should be what any reasonable developer would expect.

In other words: _your code should behave predictably._

**What does this mean in practice?**
Let's look at a simple example:

```
// What does this function do?
function getUser(id: string): any {
  return fetch(`/api/users/${id}`);
}

```

If you read this code for the first time, you might think `getUser` returns a user. But it actually returns a promise, not a `User` object.

An approach more aligned with the principle of least surprise would be:

```
async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return await response.json();
}

```
Or even naming the function `fetchUser` or `getUserAsync`, if you want to further emphasize the asynchronous behavior.

---

Breaking this principle creates friction between the developer and the system. When you run into code that doesn't do what you expect, it forces you to waste time reading the implementation instead of focusing on solving the actual business problem.

This can turn into a domino effect: wasted time, hard-to-find bugs, or worse... errors in production.

---

**What does vibe coding have to do with this?**

With the rise of AI tools that can generate code automatically from prompts or general ideas, many developers are adopting a new way of coding: writing on impulse, without thinking too much about intent or design, and letting the AI make decisions for them.

This way of working can be productive in the short term, but it can also completely break the Principle of Least Surprise.

**Why can code generated impulsively by AI be surprising?**

1. Inconsistent style or paradigms:
Sometimes the AI generates functional code, other times imperative, other times reactive... all in the same project. This confuses whoever reads or maintains the code afterward.

2. Magic decisions that go undocumented:
The developer using AI may not fully understand what was generated. The code works, but its intent and context remain hidden.

3. Abstractions that don't align with the problem domain:
It's common to see classes, functions, or structures without a clear name or defined responsibility, simply because the AI responded to a poorly framed prompt.

4. Loss of team or language conventions:
What used to be an internal team convention can now break with a simple "copy and paste" from the AI.

**How do you respect the Principle of Least Surprise while using AI?**

- It's not about not using AI. On the contrary, it's a powerful tool. But we need to use it with intention, judgment, and responsibility:
- Be the designer, not just the consumer: guide the AI with clear prompts and critically evaluate what it produces.
- Refactor what's generated: add your own touch, adapt it to your team's style, and make sure it won't surprise whoever reads it.
- Prefer familiar structures: variable, function, and class names that reflect the problem domain.
- Avoid magic: if something seems to work "just because," it probably deserves a review.

---

**Conclusion**

Code that surprises you is hard to maintain, test, and scale. And that's exactly what we want to avoid.

No matter how advanced AI-generated code is, it's still our responsibility to guarantee its clarity, consistency, and predictability.

So next time you generate code with the help of AI, remember:
The best code isn't the most creative one… it's the one that surprises the least.
