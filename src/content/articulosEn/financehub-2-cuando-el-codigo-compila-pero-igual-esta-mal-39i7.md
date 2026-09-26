---
title: 'FinanceHub #2: When the Code Compiles but Is Still Wrong'
description: How we directed an AI agent with a specification-driven
  methodology to build FinanceHub's backend, and the bugs that only a
  verification discipline managed to catch.
date: '2026-09-26'
tags:
  - architecture
  - programming
  - ai
  - discuss
devToUrl: https://dev.to/eduuu_dev/financehub-2-cuando-el-codigo-compila-pero-igual-esta-mal-39i7
---

## Introduction

In the previous article I talked about how we decided to migrate FinanceHub from a no-code platform to a backend of our own, and that the hard part wasn't writing code: it was deciding how to build it.

I mentioned that before assigning any task to an AI agent, we defined the architecture, the data model, the API contract, and a phased plan.

This is the part about how that held up in practice, and what we found when we actually put it to the test.

---

## Start from the spec, not the code

The underlying rule was simple to state and hard to respect under pressure: the API contract (`openapi.yml`) and the database schema were treated as fixed inputs, not something to improvise around when hitting a gap.

Specifically:

- **If a field isn't in the contract, it doesn't exist in the DTO.**
- **Contract-first protocol:** any shape change to an endpoint updates `openapi.yml` first, gets explicitly flagged, and only then gets code written for it. Never the other way around.
- **The full plan was written upfront**, broken down into numbered phases and tasks, each one scoped to roughly one domain entity and its CRUD, with its own verification step decided *before* starting.
- **Living rules** in their own files (`.claude/rules/*.md`) covering everything a newcomer to the code would get wrong if not told explicitly: which fields are trigger-computed and must never be accepted in a request, the exact shape of pagination (not the one that seems obvious at first glance), the standard error envelope.

None of this is exotic. It's basically spec-driven development, applied intuitively before I knew there was a name for it. What actually changed the rules of the game was who executed the plan: an AI agent, task by task, against that fixed contract.

---

## "It compiles and the tests pass" was never the bar

With an agent writing most of the code, the question stopped being "does it work?" and became "how do I know?"

The answer was a 6-step verification per task, always in the same order:

1. Compile clean.
2. Run the test suite against Postgres — the stack uses `citext`, row-level security, and Supabase's `auth` schema, so it never ran against an in-memory H2.
3. Spin up the full app.
4. Get a JWT issued by Supabase, never a synthetic stub.
5. Manually test the endpoint: happy path, validation, ownership, 401/404.
6. Clean up the test data.

That step 4 in particular looks like a minor detail. It wasn't.

---

## What showed up when testing against the running system

In every one of these cases the code compiled, the agent's explanation sounded reasonable, and it was still wrong.

**The login that failed silently.** Supabase signs its JWTs with ES256. Spring Security Resource Server's default decoder only trusts RS256. Every token issued by Supabase was rejected with a silent 401 — nothing crashed, nothing turned red, nobody could simply log in. It was caught because step 4 required that specific token, not a synthetic one crafted just to make the test pass.

**The PATCH that wiped data.** A partial update overwrote any optional field the client omitted from the body with `null`. It's the kind of bug that never shows up in a test that sends the full object, and only manifests when a client sends a partial payload — like any edit form does.

**Twenty-four security policies that protected nothing.** The project had row-level security enabled on 20 tables, with 24 well-written policies. All of them were dead code: Postgres denies access at the schema/table GRANT level *before* evaluating any policy, and none of the custom schemas had that GRANT given to the low-privilege roles RLS was supposed to protect. None of this shows up in a unit test, in `mvn test`, or by reading the policies one by one — it took actually connecting as the restricted role and confirming that even a user's own data came back "permission denied" instead of leaking through correctly.

**The report that lied depending on the time zone.** A monthly summary view grouped rows with `date_trunc('month', timestamptz_column)`. In UTC, that's invisible. In the time zone the project actually uses, every transaction was silently reported under the *previous* month. It looked correct reading the SQL. It looked correct in the code. It only stopped looking correct when the numbers were compared against an already-known result.

---

## What this means

None of these bugs was exotic or hard to explain once found. What made them dangerous is that each one passed any surface-level review: the code compiled, the logic sounded fine on a read-through, and in more than one case it even "looked correct."

An AI agent can write a huge amount of code, and it can sound convincing explaining why that code is fine. But "the agent says it's fine" was never treated as enough — nor was "the tests are green," if those tests ran against a stub instead of the running system.

The verification discipline didn't replace the agent. It decided what evidence counted as proof that something worked, and what didn't.

---

## What's next

With the backend built and verified, the frontend brought a different kind of problem: there was no longer a new spec to follow at each step, just an existing system that had to be kept honest as new facts kept surfacing. That's where, among other things, a billing bug showed up — one that no green test suite could have caught by design — and that's what I want to talk about in the next installment.
