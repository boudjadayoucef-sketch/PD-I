/**
 * PD&I — Éditeur isométrique principal
 *
 * PATCH 006
 *
 * Le moteur V4.8d est volontairement conservé intact.
 * Ce composant ne fait qu'exposer directement son workspace.
 */

import React from "react";
import IsometrieModule from "./engine/IsometrieModuleV48d";

export default function PdiIsometricEditor() {
  return (
    <div
      className="pdi-v48d-primary-workspace"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <IsometrieModule />
    </div>
  );
}
