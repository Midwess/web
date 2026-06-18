const Policy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: February 6, 2025</p>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, such as your name, email address, and account details when you register. We also collect usage data, including how you interact with our services, device information, and log data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, communicate with you, and ensure the security of our platform. We may also use your information to personalize your experience and send you updates about our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our platform, subject to confidentiality agreements. We may also disclose information when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including encryption in transit and at rest. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information at any time. You may also request a copy of the data we hold about you or opt out of certain data processing activities by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience. You can manage your cookie preferences through your browser settings. Disabling cookies may affect the functionality of our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any significant changes by posting the updated policy on our website and updating the "Last updated" date above.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, please contact us at{" "}
              <a href="mailto:support@midwess.ai" className="text-primary hover:underline">
                support@midwess.ai
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Policy;
