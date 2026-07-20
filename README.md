# SILLY CATS

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)
[![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white)](#)
[![semantic-release](https://img.shields.io/badge/semantic--release-494949?style=for-the-badge&logo=semanticrelease&logoColor=white)](#)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](#)

A static frontend application that displays random silly cats, packaged as a
multi-platform Docker image and served by an unprivileged Nginx runtime.

## Overview

This repository manages:

- Static HTML, CSS and JavaScript source code
- Images and audio assets
- Unprivileged Nginx runtime configuration
- Multi-platform Docker image
- Automated semantic versioning
- GitHub Releases
- Container image publishing to GitHub Container Registry
- Automatic GitOps update pull requests

Kubernetes manifests, Helm charts and Argo CD configuration are maintained in
the [Silly Cats GitOps repository](https://github.com/oLuqueJs/SILLY-CATS-GITOPS).

## Environments

| Environment | URL |
|---|---|
| Production | `https://desafio.bonam.cc/` |
| Development | `https://desafio.bonam.cc/dev/` |

The environment configuration and deployed image digests are managed by the
GitOps repository.

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

For a reproducible local environment, use a versioned tag:

```bash
docker run --rm \
  -p 127.0.0.1:8080:8080 \
  ghcr.io/oluquejs/silly-cats:1.1.0
```

## Build Locally

Clone the repository:

```bash
git clone https://github.com/oLuqueJs/SILLY-CATS.git
cd SILLY-CATS
```

Build the image:

```bash
docker build -t silly-cats:local .
```

Run the local image:

```bash
docker run --rm \
  -p 127.0.0.1:8080:8080 \
  silly-cats:local
```

Open:

```text
http://localhost:8080
```

## Container Image

The public container image is available at:

```text
ghcr.io/oluquejs/silly-cats
```

The release workflow publishes images for:

- `linux/amd64`
- `linux/arm64`

The container listens on port `8080` and runs using an unprivileged Nginx
runtime.

## Release and Delivery Flow

Changes merged into the `main` branch are analyzed by semantic-release.

When a new version is created, GitHub Actions:

1. Creates a semantic version and GitHub Release.
2. Builds the Docker image.
3. Publishes versioned and `latest` tags to GHCR.
4. Captures the immutable image digest.
5. Updates the image tag and digest in the GitOps repository.
6. Opens an automatic GitOps pull request.
7. Waits for the GitOps pull request to be reviewed and merged.
8. Allows Argo CD to deploy the new version.

Publishing a container image does not deploy it directly.

The deployment happens only after the GitOps pull request is reviewed and
merged.

## Repository Structure

- `index.html`: application entry point
- `css/`: application styles
- `js/`: application behavior
- `images/`: cat images
- `assets/`: audio and additional static assets
- `nginx.conf`: unprivileged Nginx server configuration
- `Dockerfile`: container image definition
- `.releaserc.json`: semantic-release configuration
- `.github/workflows/release.yaml`: release, image publishing and GitOps update workflow

## Repository Boundaries

This repository owns:

- Application source code
- Static assets
- Nginx configuration
- Container image definition
- Release automation
- Container image publishing

The GitOps repository owns:

- Helm charts
- Kubernetes resources
- Environment-specific values
- Container image tag and digest references
- Argo CD Applications
- Ingress and TLS configuration

## Security

Secrets, tokens, credentials and private keys must never be committed to this
repository.

The `GITOPS_TOKEN` used by GitHub Actions must be stored as a GitHub Actions
Secret.
