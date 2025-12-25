import React from 'react';

const TermsOfService = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-green-100 text-lg">Last updated: December 2024</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to AgroTech Solutions ("Company," "we," "us," "our," or "AgroTech"). These Terms of Service ("Terms") govern your access to and use of our website, mobile application, and all related services (collectively, the "Services").
          </p>
          <p className="text-gray-700 leading-relaxed">
            By accessing, browsing, and using our Services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these Terms, you must not use our Services. We reserve the right to modify these Terms at any time, and your continued use of the Services constitutes your acceptance of those modifications.
          </p>
        </section>

        {/* Acceptance of Terms */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By creating an account, accessing the website, or using any of our Services, you represent and warrant that:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>You are at least 18 years of age and have the legal capacity to enter into a binding agreement</li>
            <li>You are not a prohibited party under applicable sanctions laws or regulations</li>
            <li>You agree to provide accurate, current, and complete information</li>
            <li>You will comply with all applicable laws and regulations</li>
            <li>You accept all risks associated with your use of our Services</li>
          </ul>
        </section>

        {/* Services Description */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Services Description</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            AgroTech Solutions provides a platform for connecting agricultural investors with farming opportunities. Our Services include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>Access to information about agricultural investment opportunities</li>
            <li>Ability to submit service inquiries and investment applications</li>
            <li>Newsletters and updates about farming services and opportunities</li>
            <li>Administrative tools for managing agricultural operations (admin users)</li>
            <li>Contact and consultation services for investment guidance</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Our Services are provided "as is" without any warranties or representations. We do not guarantee investment returns, profit, or success in any agricultural venture.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
          <p className="text-gray-700 leading-relaxed mb-4">As a user of our Services, you agree to:</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1 Account Security</h3>
              <p className="text-gray-700 leading-relaxed">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.2 Prohibited Conduct</h3>
              <p className="text-gray-700 leading-relaxed mb-2">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Engage in fraud, deception, or misrepresentation</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Disrupt or interfere with the operation of our Services</li>
                <li>Transmit malware, viruses, or any harmful code</li>
                <li>Harass, abuse, or threaten other users or staff</li>
                <li>Engage in any form of harassment or discrimination</li>
                <li>Spam or send unsolicited communications</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.3 Accurate Information</h3>
              <p className="text-gray-700 leading-relaxed">You agree to provide accurate, current, and complete information in all forms, applications, and communications. You are responsible for keeping your information updated.</p>
            </div>
          </div>
        </section>

        {/* Payments and Refunds */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Payments and Refunds</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Any investment amounts, fees, or payments made through our Services are subject to the following terms:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>All investment amounts are non-refundable once committed to a service</li>
            <li>Payment processing fees, if applicable, are non-refundable</li>
            <li>We are not responsible for any losses incurred through investments</li>
            <li>Refund requests must be submitted within 30 days of the transaction</li>
            <li>Refunds are subject to our verification and approval process</li>
            <li>Refunds will be processed to the original payment method within 7-10 business days</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            All prices are in INR and are subject to applicable taxes. We reserve the right to change prices at any time with notice.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All content on our website, including text, graphics, logos, images, videos, and software, is the property of AgroTech Solutions or our content providers and is protected by international copyright laws.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>You may view and download content for personal, non-commercial use only</li>
            <li>You may not reproduce, distribute, or transmit any content without written permission</li>
            <li>You may not use our trademarks, logos, or brand names without authorization</li>
            <li>You retain ownership of any content you submit through our Services</li>
            <li>By submitting content, you grant us a license to use it for service improvement</li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To the fullest extent permitted by law, AgroTech Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>Loss of profits, revenue, or data</li>
            <li>Business interruption or loss of business opportunity</li>
            <li>Investment losses or poor investment performance</li>
            <li>Unauthorized access to your information</li>
            <li>Service interruptions or delays</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Our total liability for any claim shall not exceed the amount you paid for the Services in the past 12 months.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Termination</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may suspend or terminate your account and access to our Services at any time, with or without notice, for the following reasons:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>Violation of these Terms of Service</li>
            <li>Engaging in fraudulent or illegal activity</li>
            <li>Repeated violations of our policies</li>
            <li>Non-payment of fees or charges</li>
            <li>Threat to the security or integrity of our Services</li>
            <li>Your request for account termination</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Upon termination, your right to use the Services ceases immediately. We may retain your data as required by law or for legitimate business purposes.
          </p>
        </section>

        {/* Disclaimer of Warranties */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Services are provided "as is" and "as available" without any warranties, express or implied. We disclaim all warranties including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>Warranties of merchantability or fitness for a particular purpose</li>
            <li>Warranties of non-infringement or title</li>
            <li>Warranties of accuracy, completeness, or reliability of content</li>
            <li>Warranties regarding uninterrupted service or error-free operation</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            We do not warrant that our Services will meet your expectations or that any defects will be corrected.
          </p>
        </section>

        {/* Indemnification */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify, defend, and hold harmless AgroTech Solutions, its officers, directors, employees, and agents from any and all claims, damages, losses, liabilities, and expenses arising from your use of our Services, violation of these Terms, or infringement of any third-party rights.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Governing Law and Jurisdiction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms of Service are governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You agree to submit to the exclusive jurisdiction of the courts located in India for any disputes or legal proceedings arising from these Terms or your use of our Services. You waive any objections to venue or inconvenient forum.
          </p>
        </section>

        {/* Modifications to Terms */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Modifications to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. Material changes will be notified by email or prominent notice on our website. Your continued use of the Services following any modifications constitutes your acceptance of the updated Terms.
          </p>
        </section>

        {/* Severability */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Severability</h2>
          <p className="text-gray-700 leading-relaxed">
            If any provision of these Terms is found to be invalid, illegal, or unenforceable, that provision shall be modified to the minimum extent necessary to make it valid, or if not possible, severed from these Terms. The remaining provisions shall continue in full force and effect.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-10 bg-green-50 rounded-lg p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you have questions about these Terms of Service or need to contact us, please use the following information:
          </p>
          <div className="space-y-3 text-gray-700">
            <p><span className="font-semibold">AgroTech Solutions</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">Email:</span> <span>legal@agrotech.com</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">Phone:</span> <span>+91 (0) 9876543210</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">Address:</span> <span>Agricultural Innovation Hub, Tech Park, India</span></p>
          </div>
        </section>

        {/* Footer Note */}
        <section className="text-center text-gray-600 text-sm py-8 border-t border-gray-200 mt-10">
          <p>
            These Terms of Service are binding and enforceable. Your use of AgroTech Solutions constitutes your acceptance of these Terms in their entirety.
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

export default TermsOfService;
