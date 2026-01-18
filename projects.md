---
layout: archive
title: "Relevant Projects"
permalink: /projects/
author_profile: true
---

## Masters Thesis | 3D Gaussian splatting for reconstructions of wildfire scenes
**Fall 2023 - Present | Guide: Dr. Ioannis Gkioulekas**

*   [3DV 2026 Poster](https://imaging.cs.cmu.edu/smokeseer/)
*   Decomposed **wildfire scenes** into **smoke and surface Gaussians** for **smoke-free rendering** to assist firefighting.
*   Integrated **fluid particle hydrodynamics** into the **3D Gaussian Splatting** pipeline to accurately model the **temporal dependence of smoke**, resulting in more **realistic** and **artifact-free** reconstructions.
*   Adapted **Mast3r-SfM** to perform **localization** of the **RGB** and **thermal** cameras in the same coordinate frame.

## Needle - A Deep Learning Framework in Python
**Fall 2024 | Course Project for Deep Learning Systems**

*   [Report](https://colab.research.google.com/drive/13xndhmKBW1cjgtueA5-biCThGCdB6waA?usp=sharing)
*   Created a general purpose **library** for **differentiable programming** from scratch with support for **C** and **CUDA** backends.
*   Implemented features such as **gradient accumulation** and **distributed training (NCCL)** for training larger models.
*   Trained **Llama-3** architecture across **8 4090s** nodes on **OpenWebText** using custom **NCCL** and **Gloo** backend.

## Multiview Diffusion models for image to image translation
**Spring 2024 | Course Project for Learning for 3D Vision**

*   Developed a **multiview-aware diffusion model** for translating between domains, such as day-to-night.
*   Designed a **conditional U-Net architecture** with multiview feature aggregation using **epipolar constraints**.

## RGB-Thermal Sensor Fusion for ADAS Applications
**August 2022 - May 2023 | Guide: Prof. Aswin Sankaranarayanan (CMU), Prof. Kaushik Mitra (IIT Madras)**

*   Proposed a **physics based approach** to create a **low-light RGB, well-lit RGB** and **thermal image** of the same scene.
*   Implemented a novel **cross-attention architecture** to **super-resolve** thermal images using RGB as a **guide**.

## Physically Based Ray Tracer with Spectral Rendering
**Spring 2024 | Course Project for Physics Based Rendering**

*   Implemented a **path tracer** with **multiple importance sampling** achieving realistic global illumination.
*   Integrated **spectral rendering** using measured wavelength data to simulate accurate light dispersion and chromatic effects.

## Geometry Constrained Gaussian Splatting
**Fall 2023 | Course Project for Geometry-based Methods in Vision**

*   [Report](https://gcgsplatting.github.io/)
*   Incorporated geometric constraints such as **epipolar loss** and **depth loss** to improve **few-shot gaussian splatting**.
*   Achieved a performance boost of about **5%** across **PSNR, SSIM, LPIPS** on the NeRF LLFF dataset.
