import React from "react";
import IsoProfessionalWorkspace from "./IsoProfessionalWorkspace";

export interface IsoWorkspaceProps {
  projectName?: string;
}

/** SaaS entry point for the professional ISO drawing experience. */
export default function IsoWorkspace({ projectName = "Nouveau projet" }: IsoWorkspaceProps) {
  return <IsoProfessionalWorkspace projectName={projectName} />;
}
