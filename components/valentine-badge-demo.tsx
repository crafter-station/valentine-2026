"use client";

import { AIBadge } from "./ai-badge";
import { useGenerateBadge, GenerateBadgeButton } from "./generate-badge";

interface ValentineBadgeDemoProps {
  name: string;
  petVibe: string;
}

export function ValentineBadgeDemo({ name, petVibe }: ValentineBadgeDemoProps) {
  const badge = useGenerateBadge();

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <AIBadge
        ref={badge.badgeRef}
        profilePictureUrl="/images/celebration-cat.jpg"
        badgeNumber="#2026"
        firstName={name}
        jobTitle={`Valentine ${new Date().getFullYear()}`}
        colors={{
          primary: "#ff6b9d",
          secondary: "#ffd1dc",
          accent: "#ff8fa3",
          text: "#ffffff",
        }}
        branding={{
          title: "Valentine 2026",
          subtitle: "Official Badge",
        }}
      />

      <GenerateBadgeButton
        badge={badge}
        filename={`valentine-${name.toLowerCase().replace(/\s+/g, '-')}`}
        className="w-full"
      >
        Download Badge
      </GenerateBadgeButton>
    </div>
  );
}
