import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createManifest, evaluateHandoff, runChain, OBSERVATIONS } from "../src/capsule.mjs";

const fixtures = JSON.parse(
  readFileSync(fileURLToPath(new URL("../fixtures/handoffs.json", import.meta.url)), "utf8"),
);

const m = (o) => createManifest(o);

test("clean handoff: contexte, provenance et état préservés", () => {
  const r = evaluateHandoff(m(fixtures.base), m({ ...fixtures.base, id: "step-2", parent: "step-1" }));
  assert.equal(r.observation, OBSERVATIONS.CLEAN);
  assert.equal(r.continuityPreserved, true);
  assert.equal(r.fingerprintBefore, r.fingerprintAfter);
});

test("context loss: un élément de contexte disparaît au passage d'outil", () => {
  const after = m({ ...fixtures.base, id: "step-2", parent: "step-1", context: ["mission"] });
  const r = evaluateHandoff(m(fixtures.base), after);
  assert.equal(r.observation, OBSERVATIONS.CONTEXT_LOSS);
  assert.deepEqual(r.lostContext, ["contraintes", "source"]);
  assert.equal(r.continuityPreserved, false);
});

test("provenance change: l'origine déclarée n'est plus la même", () => {
  const after = m({ ...fixtures.base, id: "step-2", parent: "step-1", provenance: "outil-inconnu" });
  const r = evaluateHandoff(m(fixtures.base), after);
  assert.equal(r.observation, OBSERVATIONS.PROVENANCE_CHANGE);
  assert.equal(r.continuityPreserved, false);
});

test("state drift: état modifié sans autorisation ni lien au parent", () => {
  const after = m({ ...fixtures.base, id: "step-2", parent: null, state: { ...fixtures.base.state, budget: 999 } });
  const r = evaluateHandoff(m(fixtures.base), after);
  assert.equal(r.observation, OBSERVATIONS.STATE_DRIFT);
  assert.deepEqual(r.unauthorizedState, ["budget"]);
});

test("authorized delta: modification déclarée et rattachée au manifeste parent", () => {
  const chain = fixtures.chain.map(m);
  const log = runChain(chain, { authorizedDelta: ["etape"] });
  assert.equal(log.length, 2);
  assert.equal(log[0].observation, OBSERVATIONS.AUTHORIZED_DELTA);
  assert.equal(log[0].linkedToParent, true);
  assert.equal(log[1].observation, OBSERVATIONS.CONTEXT_LOSS);
});
