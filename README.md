# Silly Cats



A static frontend application for silly cats, packaged as a multi-platform container image and served by an unprivileged Nginx runtime.

## Overview

This repository owns:

- the frontend source code
- the container image definition
- the Nginx runtime configuration
- automated versioning and releases
- container image publishing to GitHub Container Registry

Kubernetes manifests, Helm charts and Argo CD configuration are maintained separately in a GitOps repository.

## Run with Docker

Run the latest published image:

```bash
docker run --rm \
  -p 127.0.0.1:8080:8080 \
  ghcr.io/oluquejs/silly-cats:latest
```

Open:

```text
http://localhost:8080
```

For reproducible environments, use a versioned tag instead of `latest`:

```bash
docker run --rm \
  -p 127.0.0.1:8080:8080 \
  ghcr.io/oluquejs/silly-cats:1.0.0
```

## Build locally

Clone the repository:

```bash
git clone https://github.com/oLuqueJs/SILLY-CATS.git
cd SILLY-CATS
```

Build and run the image:

```bash
docker build -t silly-cats:local .

docker run --rm \
  -p 127.0.0.1:8080:8080 \
  silly-cats:local
```

## Container image

Published images are available at:

```text
ghcr.io/oluquejs/silly-cats
```

| Property | Value |
|---|---|
| Registry | GitHub Container Registry |
| Platforms | `linux/amd64`, `linux/arm64` |
| Container port | `8080` |
| Runtime | Unprivileged Nginx |
| Versioning | Semantic Versioning |
| Visibility | Public |

### Image tags

| Tag | Purpose |
|---|---|
| `1.0.0` | Versioned and reproducible release |
| `latest` | Most recently published release |

Versioned tags should be used by GitOps and production-like environments. The `latest` tag is mutable and intended only for convenience.

## Release model

Changes merged into `main` are analyzed by Semantic Release.

- `fix`: creates a patch release
- `feat`: creates a minor release
- `BREAKING CHANGE`: creates a major release

A successful release creates:

- a Git tag in the `vX.Y.Z` format
- a GitHub Release
- `linux/amd64` and `linux/arm64` container images
- `X.Y.Z` and `latest` image tags in GHCR
- build provenance metadata

See [Delivery and release](docs/delivery.md) for the complete flow.

## Repository boundaries

This repository owns:

- application source code
- container image definition
- release automation
- container image publishing

Kubernetes deployments are maintained in the
[SILLY-CATS-GITOPS](https://github.com/oLuqueJs/SILLY-CATS-GITOPS) repository, which owns:

- Helm charts
- environment-specific values
- Kubernetes resources
- deployed image tag and digest references

Argo CD applications will also be maintained there.