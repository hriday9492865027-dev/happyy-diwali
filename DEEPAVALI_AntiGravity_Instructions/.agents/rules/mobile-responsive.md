---
trigger: always_on
---

# Mobile-First and Responsive Rules

Mobile quality is a P0 launch requirement.

- Design mobile-first, starting at 360 CSS px; also verify 320, 375/390, 412, 768, 1024, and wide desktop widths.
- No horizontal overflow, clipped actions, overlapping text, or controls hidden behind browser chrome.
- On phones, use a portrait-first composition. Keep the person central and position greeting copy where it does not cover the subject.
- On wider screens, use a cinematic wider composition where appropriate.
- Use `object-fit: contain` for person cutouts unless the user explicitly chooses a crop. Never unexpectedly crop the head, hands, or feet.
- Touch targets should be at least 44 × 44 CSS px where practical, with adequate spacing.
- Support touch input; never rely on hover as the only way to access an action.
- Account for safe-area insets, dynamic viewport height, mobile browser bars, and virtual keyboards.
- Test photo selection from both camera roll and file picker on Android Chrome and iOS Safari.
- Test portrait and landscape orientations.
- Reduce blur, shadow complexity, particle count, and concurrent animation layers on lower-powered devices.
- Ensure all core flows work on a mid-range Android phone, including Samsung Galaxy F15-class hardware.
- Record viewport/device results in the QA checklist. Do not mark mobile complete based only on desktop responsive emulation.
