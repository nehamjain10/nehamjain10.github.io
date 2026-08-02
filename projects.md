---
layout: page
permalink: /projects/index.html
title: Projects
description: Research and systems projects.
---

<div class="xp">
  <div class="xp-head">
    <h2>SmokeSeer</h2>
    <span class="xp-meta">CMU · 2023 – 2025</span>
  </div>
  <p class="xp-role">MS Thesis · 3D Gaussian splatting for wildfire scenes · <a href="https://imaging.cs.cmu.edu/smokeseer/">Project page</a> · 3DV 2026</p>
  <ul>
    <li>Decomposes wildfire scenes into smoke and surface Gaussians, rendering smoke-free views to assist firefighting.</li>
    <li>Integrates fluid particle hydrodynamics into the splatting pipeline to model the temporal behavior of smoke.</li>
    <li>Adapts Mast3r-SfM to localize RGB and thermal cameras in a shared coordinate frame.</li>
  </ul>
</div>

<div class="xp">
  <div class="xp-head">
    <h2>Needle: Deep Learning Framework</h2>
    <span class="xp-meta">CMU · Fall 2024</span>
  </div>
  <p class="xp-role">Deep Learning Systems course · <a href="https://colab.research.google.com/drive/13xndhmKBW1cjgtueA5-biCThGCdB6waA?usp=sharing">Report</a></p>
  <ul>
    <li>Differentiable-programming library from scratch with C and CUDA backends, gradient accumulation, and NCCL/Gloo distributed training.</li>
    <li>Trained a Llama-3 architecture on OpenWebText across <strong>8×4090</strong> nodes with the custom backend.</li>
  </ul>
</div>

<div class="xp">
  <div class="xp-head">
    <h2>Multiview Diffusion Models</h2>
    <span class="xp-meta">CMU · Spring 2024</span>
  </div>
  <p class="xp-role">Learning for 3D Vision course · Multiview image-to-image translation</p>
  <ul>
    <li>Multiview-aware diffusion model for domain translation (e.g. day-to-night) with a conditional U-Net aggregating features along epipolar constraints.</li>
  </ul>
</div>

<div class="xp">
  <div class="xp-head">
    <h2>RGB-Thermal Sensor Fusion</h2>
    <span class="xp-meta">CMU / IIT Madras · 2022 – 2023</span>
  </div>
  <p class="xp-role">ADAS research · Advisors: Prof. Aswin Sankaranarayanan, Prof. Kaushik Mitra</p>
  <ul>
    <li>Physics-based capture of aligned low-light RGB, well-lit RGB, and thermal images of the same scene.</li>
    <li>Cross-attention architecture that super-resolves thermal images using RGB guidance.</li>
  </ul>
</div>
