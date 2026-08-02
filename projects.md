---
layout: page
permalink: /projects/index.html
title: Projects
---

# Research Projects

<div class="xp">
  <div class="xp-head">
    <h2>SmokeSeer</h2>
    <span class="xp-meta">Pittsburgh, PA · Fall 2023 – 2025</span>
  </div>
  <p class="xp-role">Masters Thesis · 3D Gaussian Splatting for Reconstruction of Wildfire Scenes · <a href="https://imaging.cs.cmu.edu/smokeseer/">[Project Page]</a> · 3DV 2026 Poster</p>
  <ul>
    <li>Decomposed <strong>wildfire scenes</strong> into <strong>smoke and surface Gaussians</strong> for <strong>smoke-free rendering</strong> to assist firefighting.</li>
    <li>Integrated <strong>fluid particle hydrodynamics</strong> into the <strong>3D Gaussian Splatting</strong> pipeline to accurately model the <strong>temporal dependence of smoke</strong>, resulting in more <strong>realistic</strong> and <strong>artifact-free</strong> reconstructions.</li>
    <li>Adapted <strong>Mast3r-SfM</strong> to perform <strong>localization</strong> of the <strong>RGB</strong> and <strong>thermal</strong> cameras in the same coordinate frame.</li>
  </ul>
</div>

<div class="xp">
  <div class="xp-head">
    <h2>Needle: Deep Learning Framework</h2>
    <span class="xp-meta">Pittsburgh, PA · Fall 2024</span>
  </div>
  <p class="xp-role">Course Project, Deep Learning Systems · <a href="https://colab.research.google.com/drive/13xndhmKBW1cjgtueA5-biCThGCdB6waA?usp=sharing">[Report]</a></p>
  <ul>
    <li>Created a general purpose <strong>library</strong> for <strong>differentiable programming</strong> from scratch with support for <strong>C</strong> and <strong>CUDA</strong> backends.</li>
    <li>Implemented features such as <strong>gradient accumulation</strong> and <strong>distributed training (NCCL)</strong> for training larger models.</li>
    <li>Trained <strong>Llama-3</strong> architecture across <strong>8 4090s</strong> nodes on <strong>OpenWebText</strong> using custom <strong>NCCL</strong> and <strong>Gloo</strong> backend.</li>
  </ul>
</div>

<div class="xp">
  <div class="xp-head">
    <h2>Multiview Diffusion Models</h2>
    <span class="xp-meta">Pittsburgh, PA · Spring 2024</span>
  </div>
  <p class="xp-role">Course Project, Learning for 3D Vision · Multiview Diffusion Models for Image-to-Image Translation</p>
  <ul>
    <li>Developed a <strong>multiview-aware diffusion model</strong> for translating between domains, such as day-to-night.</li>
    <li>Designed a <strong>conditional U-Net architecture</strong> with multiview feature aggregation using <strong>epipolar constraints</strong>.</li>
  </ul>
</div>

<div class="xp">
  <div class="xp-head">
    <h2>RGB-Thermal Sensor Fusion</h2>
    <span class="xp-meta">Aug 2022 – May 2023</span>
  </div>
  <p class="xp-role">RGB-Thermal Sensor Fusion for ADAS Applications · Guides: Prof. Aswin Sankaranarayanan (CMU), Prof. Kaushik Mitra (IIT Madras)</p>
  <ul>
    <li>Proposed a <strong>physics-based approach</strong> to create a <strong>low-light RGB, well-lit RGB</strong> and <strong>thermal image</strong> of the same scene.</li>
    <li>Implemented a novel <strong>cross-attention architecture</strong> to <strong>super-resolve</strong> thermal images using RGB as a <strong>guide</strong>.</li>
  </ul>
</div>
