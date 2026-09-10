/**
 * Continuity Chain Capsule — Demo Capsule (Lab Test Unit)
 * LAB-001 · version 0.1.0
 *
 * Objectif : observer comment le contexte, la provenance et l'état se dégradent
 * au passage d'un outil à un autre (handoff).
 *
 * Aucune donnée réelle, aucun secret, aucune dépendance privée.
 */

/** Statuts d'observation possibles pour un handoff. */
export const OBSERVATIONS = {
  CLEAN: "CLEAN_HANDOFF",
  CONTEXT_LOSS: "CONTEXT_LOSS",
  PROVENANCE_CHANGE: "PROVENANCE_CHANGE",
  STATE_DRIFT: "STATE_DRIFT",
  AUTHORIZED_DELTA: "AUTHORIZED_DELTA",
};

/** Crée un manifeste d'état minimal et déterministe. */
export function createManifest({ id, provenance, context, state, parent = null }) {
  if (!id) throw new Error("manifest.id requis");
  return { id, parent, provenance, context: [...context].sort(), state: { ...state } };
}

/** Empreinte déterministe (non cryptographique) d'un manifeste. */
export function fingerprint(manifest) {
  const canonical = JSON.stringify({
    provenance: manifest.provenance,
    context: manifest.context,
    state: Object.fromEntries(Object.entries(manifest.state).sort()),
  });
  let hash = 0;
  for (let i = 0; i < canonical.length; i += 1) {
    hash = (hash * 31 + canonical.charCodeAt(i)) | 0;
  }
  return `fp_${(hash >>> 0).toString(16)}`;
}

/**
 * Compare deux manifestes successifs et qualifie le handoff.
 * `authorizedDelta` déclare les clés d'état dont la modification est légitime,
 * à condition que le manifeste enfant référence bien son parent.
 */
export function evaluateHandoff(before, after, { authorizedDelta = [] } = {}) {
  const lostContext = before.context.filter((c) => !after.context.includes(c));
  const changedState = Object.keys(before.state).filter(
    (k) => JSON.stringify(before.state[k]) !== JSON.stringify(after.state[k]),
  );
  const unauthorized = changedState.filter((k) => !authorizedDelta.includes(k));
  const linkedToParent = after.parent === before.id;

  let observation = OBSERVATIONS.CLEAN;
  if (before.provenance !== after.provenance) observation = OBSERVATIONS.PROVENANCE_CHANGE;
  else if (lostContext.length > 0) observation = OBSERVATIONS.CONTEXT_LOSS;
  else if (unauthorized.length > 0) observation = OBSERVATIONS.STATE_DRIFT;
  else if (changedState.length > 0) {
    observation = linkedToParent ? OBSERVATIONS.AUTHORIZED_DELTA : OBSERVATIONS.STATE_DRIFT;
  }

  return {
    observation,
    lostContext,
    changedState,
    unauthorizedState: unauthorized,
    linkedToParent,
    fingerprintBefore: fingerprint(before),
    fingerprintAfter: fingerprint(after),
    continuityPreserved:
      observation === OBSERVATIONS.CLEAN || observation === OBSERVATIONS.AUTHORIZED_DELTA,
  };
}

/** Rejoue une chaîne complète de handoffs et retourne le journal d'observation. */
export function runChain(steps, options = {}) {
  const log = [];
  for (let i = 1; i < steps.length; i += 1) {
    log.push({ step: i, from: steps[i - 1].id, to: steps[i].id, ...evaluateHandoff(steps[i - 1], steps[i], options) });
  }
  return log;
}
