import React from "react";
import IsoProfessionalWorkspace from "./IsoProfessionalWorkspace";

export interface IsoWorkspaceProps {
  projectName?: string;
  onHome?: () => void;
}

/** SaaS entry point for the professional ISO drawing experience. */
export default function IsoWorkspace({ projectName = "Nouveau projet", onHome }: IsoWorkspaceProps) {
  return <IsoProfessionalWorkspace projectName={projectName} onHome={onHome} />;
}
