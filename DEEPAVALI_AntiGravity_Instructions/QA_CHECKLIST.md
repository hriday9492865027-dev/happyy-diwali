# DEEPAVALI QA Checklist

## Core flow
- [ ] Landing page loads and start action works.
- [ ] Intro can be skipped.
- [ ] No-photo greeting path works.
- [ ] Upload works from mobile camera roll and file picker.
- [ ] Invalid file type and oversized file are rejected with clear messages.
- [ ] Processing progress and retry states work.
- [ ] Preview clearly shows transparent background.
- [ ] Original scenery is absent from accepted cutout.
- [ ] Failed extraction never displays the full original photo in the scene.

## Signature visual
- [ ] Ghost and main portrait use the same cutout and align.
- [ ] Ghost opacity is subtle and adjustable.
- [ ] Main portrait gradually becomes visible with golden illumination.
- [ ] Cracker burst has a launch / flash cue and outward-moving sparks.
- [ ] Sparks drift, glow, trail briefly, and fade.
- [ ] Effects do not persistently cover face or greeting.
- [ ] Final greeting is readable.
- [ ] Replay works.

## Mobile
- [ ] 320 px, 360 px, 390 px, 412 px widths checked.
- [ ] No horizontal overflow.
- [ ] Touch targets and controls are usable.
- [ ] No content hidden by browser bars or safe areas.
- [ ] Portrait framing does not unexpectedly crop the subject.
- [ ] Android Chrome tested on a real device.
- [ ] iOS Safari tested where available.
- [ ] Portrait and landscape orientations checked.
- [ ] Low-effects mode is usable.

## Accessibility and performance
- [ ] Reduced-motion preference respected.
- [ ] Intro can be skipped.
- [ ] No rapid strobing.
- [ ] Keyboard focus visible.
- [ ] Contrast and labels checked.
- [ ] Animation loops stop on unmount and pause when tab is hidden.
- [ ] Performance checked on mid-range mobile hardware.

## Privacy and security
- [ ] Original and processed images are private.
- [ ] Cross-user media access is denied.
- [ ] Uploads validated server-side.
- [ ] Secrets are not exposed in client bundles or repository.
- [ ] Retention and deletion remove blobs and metadata.
- [ ] Admin operations are server-authorized and audited.

## Release
- [ ] Lint passes.
- [ ] Type-check passes.
- [ ] Tests pass.
- [ ] Production build passes.
- [ ] Deployment environment variables verified.
- [ ] No sample/private images accidentally committed.
