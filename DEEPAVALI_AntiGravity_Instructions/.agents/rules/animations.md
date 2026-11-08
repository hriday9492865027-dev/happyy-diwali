---
trigger: model_decision
description: Apply when implementing the greeting scene, portrait reveal, fireworks, cracker bursts, particles, transitions, or audio.
---

# Animation and Signature Scene Rules

## Portrait layers
- Use one processed transparent human cutout for both portrait layers.
- Ghost portrait sits behind the main portrait, subtly offset or scaled, initially around 5–12% opacity as a design starting range.
- Main portrait gradually becomes recognizable through opacity and warm illumination / rim light.
- Preserve the person's original proportions and appearance. Never warp facial features.
- Do not attempt spark-based face reconstruction or facial recognition.

## Cracker burst particles
- Each burst is a distinct event: launch/flash cue, bright burst core, outward particle emission, drift/arc, glow, and natural fade.
- Vary particle size, brightness, direction, velocity, lifetime, and drag/gravity so bursts do not look like identical rings.
- Some particles may leave short tapering trails that fade.
- Keep face and greeting safe zones clear.
- Use adaptive particle budgets for mobile and low-performance devices.
- Use requestAnimationFrame for Canvas animation and cancel loops/listeners on cleanup.
- Pause or reduce work when the document is hidden.
- Avoid rapid strobing or intense full-screen flashes.

## Motion accessibility
- Respect `prefers-reduced-motion`.
- Provide skip/replay controls where relevant.
- Reduced-motion mode should show the final composition with minimal transitions and no repeated bursts.
- Animation must never block navigation or access to the greeting.
- If audio exists, it must be user-controlled and muted by default where browser policy requires.

## QA
- Test the scene with short, tall, landscape, and full-body portrait cutouts.
- Verify layering, no image stretching, no edge halos, particle clipping, and mobile frame rate.
