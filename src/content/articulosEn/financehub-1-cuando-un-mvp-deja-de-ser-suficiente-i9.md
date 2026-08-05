---
title: 'FinanceHub #1: When an MVP Stops Being Enough'
description: What we learned migrating FinanceHub from a no-code platform to
  a backend of our own built with Spring Boot, and why the hard part wasn't
  writing code.
date: '2026-08-05'
tags:
  - architecture
  - programming
  - ai
  - discuss
devToUrl: https://dev.to/eduuu_dev/financehub-1-cuando-un-mvp-deja-de-ser-suficiente-i9
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fjwme82o2ksezps4y167p.png
---

## Introduction

A while ago, together with a colleague, we started building FinanceHub.

The idea was simple: build an app that would help us understand our personal finances better.

Like many projects, we wanted to validate the idea as fast as possible, so we decided to start with a no-code platform.

And it worked.

In no time we had a usable app. We could log income, log expenses, and see part of our financial picture.

For an MVP, it was exactly what we needed.

---

## But a question showed up

As time went on, we started imagining new features.

More business rules. More customization. Our own API. Integrations. Better security. More control over the infrastructure.

And then came a question that probably every developer has asked themselves at some point:

> Do we keep building on top of the current platform, or is it time to build our own technical foundation?

---

## The decision

We finally decided to take the leap.

Keep the idea. Keep the product. But rebuild the platform from the ground up.

My challenge was to lead that technical migration: moving from a no-code solution to a backend built with Spring Boot, PostgreSQL, and an architecture designed to grow.

---

## The funny thing

I thought the hard part would be writing the new system.

It wasn't.

The hard part was deciding how to build it.

Because once you stop depending on a platform, every decision becomes yours: authentication, architecture, infrastructure, security, contracts, the database, migrations, deployments, observability.

All of it.

---

## The first important decision

Before writing a single line of code, I decided to do something different.

Not start with the code. Start with the design.

That's how a spec-driven methodology was born. Before giving Claude Code any task, I defined:

- the architecture,
- the data model,
- the OpenAPI contract,
- the project's rules,
- and a plan broken down into small, verifiable phases.

That process ended up mattering far more than any single prompt.

---

## What surprised me the most

During this migration I understood something.

AI can write a huge amount of code. But it can't decide what system you actually want to build. That's still the engineer's job.

And the more complex the project, the more important it becomes to define clear rules before you start.

---

## What's next

In upcoming articles I want to share how we made those decisions. Not to teach a specific framework, but to show how we're approaching the construction of a real product from an engineering perspective.

Because in the end, FinanceHub stopped being just an app for managing finances.

It became a lab where we're learning about architecture, cloud, AI agents, and software design.
