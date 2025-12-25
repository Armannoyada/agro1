import React from 'react';

const PrivacyPolicy = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-green-100 text-lg">Last updated: December 2024</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            AgroTech Solutions ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Services. By accessing and using AgroTech Solutions, you acknowledge that you have read, understood, and agree to be bound by all the provisions of this Privacy Policy.
          </p>
        </section>

        {/* Information Collection */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Information You Provide Directly</h3>
            <p className="text-gray-700 leading-relaxed mb-3">We collect information you voluntarily provide to us, including:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
              <li>Contact information (name, email, phone number, address)</li>
              <li>Account information (username, password, profile details)</li>
              <li>Investment and service inquiry details</li>
              <li>Payment information for transactions</li>
              <li>Communications and feedback you send us</li>
              <li>Newsletter subscription preferences</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2 Information Collected Automatically</h3>
            <p className="text-gray-700 leading-relaxed mb-3">We automatically collect certain information when you interact with our Services:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
              <li>Log data (IP address, browser type, pages visited, timestamps)</li>
              <li>Device information (device type, operating system, unique device identifiers)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Location information (with your consent)</li>
              <li>Usage patterns and analytics data</li>
            </ul>
          </div>
        </section>

        {/* Use of Information */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect for various purposes:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>To provide, operate, and improve our Services</li>
            <li>To process transactions and send transaction confirmations</li>
            <li>To respond to your inquiries and customer support requests</li>
            <li>To send promotional emails and marketing communications</li>
            <li>To analyze usage patterns and improve user experience</li>
            <li>To detect, prevent, and address fraud and security issues</li>
            <li>To comply with legal obligations and enforce our terms</li>
            <li>To personalize your experience on our platform</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">3. How We Share Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">We may share your information in the following circumstances:</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Providers</h3>
              <p className="text-gray-700 leading-relaxed">We share information with third-party service providers who assist us in operating our website and conducting our business, including hosting providers, payment processors, and analytics services.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Partners</h3>
              <p className="text-gray-700 leading-relaxed">We may share information with business partners for joint marketing initiatives or service offerings.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed">We may disclose your information if required by law or when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Transfers</h3>
              <p className="text-gray-700 leading-relaxed">In the event of a merger, acquisition, or bankruptcy, your information may be transferred as part of the business transaction.</p>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Data Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement comprehensive security measures to protect your personal information from unauthorized access, alteration, disclosure, and destruction. These measures include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>SSL/TLS encryption for data transmission</li>
            <li>Secure password hashing and storage</li>
            <li>Regular security audits and assessments</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Firewalls and intrusion detection systems</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            However, no method of transmission over the Internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies, web beacons, and similar technologies to enhance your user experience and analyze usage patterns. Cookies are small data files stored on your device that help us remember your preferences and track your activity.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You can control cookie settings through your browser preferences. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, blocking cookies may affect your ability to use certain features of our Services.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Depending on your location, you may have the following rights:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>Right to access and review your personal information</li>
            <li>Right to correct or update inaccurate information</li>
            <li>Right to request deletion of your information</li>
            <li>Right to opt-out of marketing communications</li>
            <li>Right to data portability</li>
            <li>Right to object to certain processing activities</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            To exercise any of these rights, please contact us at the information provided in the Contact Us section below.
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
          <p className="text-gray-700 leading-relaxed">
            We retain your personal information for as long as necessary to provide our Services and fulfill the purposes outlined in this Privacy Policy. The retention period may vary depending on the type of information and our legal obligations. When information is no longer needed, we securely delete or anonymize it. However, we may retain certain information for legal, accounting, or legitimate business purposes.
          </p>
        </section>

        {/* Third-Party Links */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party websites and services that are not operated by us. This Privacy Policy does not apply to third-party services, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party sites before providing your information.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our Services are not directed to children under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without proper parental consent, we will take steps to delete such information and terminate the child's account.
          </p>
        </section>

        {/* International Data Transfer */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
          <p className="text-gray-700 leading-relaxed">
            Your information may be transferred to, stored in, and processed in countries other than your country of residence, which may have different data protection laws. By using our Services, you consent to the transfer of your information to countries outside your country of residence.
          </p>
        </section>

        {/* Changes to Policy */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, and other factors. We will notify you of any material changes by updating the "Last updated" date at the top of this page and, when appropriate, by sending you an email notification or displaying a prominent notice on our website.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-10 bg-green-50 rounded-lg p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you have questions about this Privacy Policy, our privacy practices, or wish to exercise your rights, please contact us at:
          </p>
          <div className="space-y-3 text-gray-700">
            <p><span className="font-semibold">AgroTech Solutions</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">Email:</span> <span>privacy@agrotech.com</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">Phone:</span> <span>+91 (0) 9876543210</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">Address:</span> <span>Agricultural Innovation Hub, Tech Park, India</span></p>
          </div>
        </section>

        {/* Footer Note */}
        <section className="text-center text-gray-600 text-sm py-8 border-t border-gray-200 mt-10">
          <p>
            This Privacy Policy is subject to the terms and conditions of AgroTech Solutions. We appreciate your trust in us and our commitment to protecting your privacy.
          </p>
        </section>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        title="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
};

export default PrivacyPolicy;