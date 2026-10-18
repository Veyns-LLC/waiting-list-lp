import { LegalDocument } from "./LegalDocument";
import termsMarkdown from "./terms-of-service.md?raw";

export default function TermsOfService() {
  return (
    <LegalDocument
      title="Terms of Service"
      description="Read the terms governing access to and use of the Veyns app, website, health-data features, integrations, and subscriptions."
      canonicalPath="/terms-of-service"
      markdown={termsMarkdown}
      articleLabel="Terms of Service"
    />
  );
}
