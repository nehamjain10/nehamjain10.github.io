---
layout: page
permalink: /projects/index.html
title: Projects
---

# Research Projects

---

## Masters Thesis: SmokeSeer
**3D Gaussian Splatting for Reconstruction of Wildfire Scenes** [[Project Page]](https://imaging.cs.cmu.edu/smokeseer/)

*Guide: Dr. Ioannis Gkioulekas* | Pittsburgh, PA | Fall 2023 - Present

**3DV 2026 Poster**

- Decomposed **wildfire scenes** into **smoke and surface Gaussians** for **smoke-free rendering** to assist firefighting.
- Integrated **fluid particle hydrodynamics** into the **3D Gaussian Splatting** pipeline to accurately model the **temporal dependence of smoke**, resulting in more **realistic** and **artifact-free** reconstructions.
- Adapted **Mast3r-SfM** to perform **localization** of the **RGB** and **thermal** cameras in the same coordinate frame.

---

## Needle: Deep Learning Framework
**A Deep Learning Framework in Python** [[Report]](https://colab.research.google.com/drive/13xndhmKBW1cjgtueA5-biCThGCdB6waA?usp=sharing)

*Course Project for Deep Learning Systems* | Pittsburgh, PA | Fall 2024

- Created a general purpose **library** for **differentiable programming** from scratch with support for **C** and **CUDA** backends.
- Implemented features such as **gradient accumulation** and **distributed training (NCCL)** for training larger models.
- Trained **Llama-3** architecture across **8 4090s** nodes on **OpenWebText** using custom **NCCL** and **Gloo** backend.

---

## Multiview Diffusion Models
**Multiview Diffusion Models for Image-to-Image Translation**

*Course Project for Learning for 3D Vision* | Pittsburgh, PA | Spring 2024

- Developed a **multiview-aware diffusion model** for translating between domains, such as day-to-night.
- Designed a **conditional U-Net architecture** with multiview feature aggregation using **epipolar constraints**.

---

## RGB-Thermal Sensor Fusion
**RGB-Thermal Sensor Fusion for ADAS Applications**

*Guide: Prof. Aswin Sankaranarayanan (CMU), Prof. Kaushik Mitra (IIT Madras)* | August 2022 - May 2023

- Proposed a **physics-based approach** to create a **low-light RGB, well-lit RGB** and **thermal image** of the same scene.
- Implemented a novel **cross-attention architecture** to **super-resolve** thermal images using RGB as a **guide**.

---

<br>
