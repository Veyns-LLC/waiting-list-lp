import { LegalDocument } from "./LegalDocument";
import policyMarkdown from "./privacy-policy.md?raw";

export default function PrivacyPolicy() {
  return (
    <LegalDocument
      title="Privacy Policy"
      description="Learn how Veyns LLC collects, processes, uses, and protects personal information, including laboratory reports, biomarkers, and health data."
      canonicalPath="/privacy-policy"
      markdown={policyMarkdown}
      articleLabel="Privacy Policy"
    />
  );
}
