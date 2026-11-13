---
title: "Building My First Home Server"
description: "My experience experimenting with self-hosting, hardware selection, and Linux server management."
pubDate: 2026-11-13
tags:
  - linux
  - self-hosting
  - hardware
category: Projects
draft: false
---

# Building My First Home Server

For years, I relied entirely on third-party cloud providers for everything: file storage, personal experiments, development containers, and ad-blocking. While platforms like AWS, Fly.io, and Cloudflare are incredible engineering feats, there is something deeply rewarding about owning physical computing infrastructure sitting in your own living space.

This post documents the journey of building my first dedicated home server from spare parts, choosing the operating system, and deploying the initial set of baseline services.

## Why Self-Host?

The modern internet has become increasingly centralized. While outsourcing compute is convenient, self-hosting provides several tangible advantages:

1. **Data Sovereignty:** My backups and personal photos remain under my physical control.
2. **Learning by Doing:** Troubleshooting ZFS pool degradation or network bridge routing on bare metal teaches fundamentals that high-level cloud abstractions conceal.
3. **Low Cost Over Time:** For sustained storage loads and homelab experimentation, a modest energy-efficient mini-PC pays for itself rapidly compared to continuous cloud egress and storage charges.

## Hardware Choices

I opted for an energy-efficient compact form factor rather than a loud, power-hungry rackmount chassis:

```bash
# System specs overview
CPU: Intel Core i5-12400 (6 cores, 12 threads)
RAM: 32GB DDR4 3200MHz ECC (non-registered)
Storage: 2x 1TB NVMe Gen4 (Mirror for OS/Containers)
Bulk Storage: 2x 8TB SATA HDDs (ZFS Mirror for Media & Backups)
Idle Power: ~18 Watts
```

The idle power consumption was a critical constraint. Keeping the server under 20W idle means the running cost is only a few dollars a month.

## Operating System & Tooling

I selected **Debian 12 Bookworm** for rock-solid stability and minimal overhead. For container orchestration, instead of a heavy Kubernetes cluster, I opted for lightweight **Docker Compose** paired with a reverse proxy.

```yaml
# docker-compose.yml example snippet
services:
  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - internal

networks:
  internal:
    driver: bridge

volumes:
  caddy_data:
  caddy_config:
```

## Key Takeaways

Setting up a home server isn't just about saving money on cloud storage subscriptions. It is an ongoing playground for systems engineering, network security, and intentional software selection.

In upcoming posts, I will dive into my automated backup strategy using Restic and off-site encrypted snapshots.
