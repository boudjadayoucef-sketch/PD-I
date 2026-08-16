/**
 * PD&I — Éditeur isométrique principal
 *
 * PATCH 006
 *
 * Le moteur V4.8d est conservé comme moteur d'édition existant.
 * Ce composant fournit une frontière stable pour le workspace SaaS ISO.
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
        minHeight: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <IsometrieModule />
    </div>
  );
}
