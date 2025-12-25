import React from 'react';

const RefundPolicy = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund Policy</h1>
          <p className="text-green-100 text-lg">Last updated: December 2024</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            AgroTech Solutions is committed to ensuring customer satisfaction with our agricultural investment services and solutions. This Refund Policy outlines the terms and conditions under which refunds may be requested and processed.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Please read this policy carefully to understand your rights and obligations regarding refunds. If you have questions about our refund policy, please contact our support team using the information provided at the end of this document.
          </p>
        </section>

        {/* Eligibility for Refunds */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Eligibility for Refunds</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You may be eligible for a refund under the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>Service inquiry submission fees paid but service not activated within 30 days</li>
            <li>Technical errors in service setup that prevent access to the platform</li>
            <li>Duplicate payment transactions (within 7 days of transaction)</li>
            <li>Service not matching the description provided at the time of purchase</li>
            <li>Cancellation requests made within the specified cancellation window</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            All refund requests must include valid documentation and proof of payment. Refund eligibility is determined at the sole discretion of AgroTech Solutions.
          </p>
        </section>

        {/* Non-Refundable Items */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Non-Refundable Items</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The following items and services are non-refundable under any circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>Agricultural investment amounts once committed to an active service</li>
            <li>Subscription fees for completed billing cycles</li>
            <li>Administrative and processing fees</li>
            <li>Penalties or late fees</li>
            <li>Services already delivered or rendered</li>
            <li>Promotional discounts or special offers applied to purchases</li>
            <li>Digital content or materials already downloaded</li>
            <li>Services accessed or partially used beyond the cancellation period</li>
            <li>Currency conversion fees or bank transfer charges</li>
          </ul>
        </section>

        {/* Refund Process */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Refund Process</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To request a refund, please follow these steps:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Submit Refund Request</h3>
              <p className="text-gray-700 leading-relaxed">Contact our support team at refunds@agrotech.com with your request. Include your account information, transaction ID, and reason for requesting a refund.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Provide Documentation</h3>
              <p className="text-gray-700 leading-relaxed">Attach proof of payment (transaction receipt, bank statement, or email confirmation) and any supporting documentation relevant to your refund request.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Review and Verification</h3>
              <p className="text-gray-700 leading-relaxed">Our team will review your request and supporting documentation. We may contact you for additional information if necessary.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: Decision and Processing</h3>
              <p className="text-gray-700 leading-relaxed">We will notify you of our decision via email. If approved, the refund will be processed to your original payment method.</p>
            </div>
          </div>
        </section>

        {/* Refund Timeline */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Refund Timeline</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Please note the following timeline for refund requests and processing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>Refund requests must be submitted within 30 days of the transaction date</li>
            <li>Initial review of your request: 3-5 business days</li>
            <li>Additional information request (if needed): 2-3 business days for response</li>
            <li>Final decision notification: 5-7 business days</li>
            <li>Refund processing to original payment method: 7-10 business days after approval</li>
            <li>Bank processing time: 2-5 business days (varies by financial institution)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Total refund timeline from initial request to bank deposit: approximately 3-4 weeks. We are not responsible for delays caused by your financial institution.
          </p>
        </section>

        {/* Cancellation Policy */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Cancellation Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cancellation policies vary depending on the service type:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Inquiries</h3>
              <p className="text-gray-700 leading-relaxed">Service inquiry submissions may be cancelled within 7 days of submission. Cancellation after 7 days will not result in a refund.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Services</h3>
              <p className="text-gray-700 leading-relaxed">Once an investment service is activated and funds are committed, cancellations are generally not permitted. Special circumstances may be reviewed on a case-by-case basis.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Subscription Services</h3>
              <p className="text-gray-700 leading-relaxed">Subscription services can be cancelled anytime, but refunds are only issued for unused portions of the billing cycle if cancelled within the first 14 days.</p>
            </div>
          </div>
        </section>

        {/* Late or Missing Refunds */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Late or Missing Refunds</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have been approved for a refund but have not received it within the stated timeline:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>First, check with your financial institution to confirm the refund has not been received</li>
            <li>Check your spam or junk email folder for our communications</li>
            <li>Contact our support team with your refund request number and transaction ID</li>
            <li>Provide your bank statement showing the refund has not been deposited</li>
            <li>We will investigate the issue and issue a replacement refund if necessary</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            We are not responsible for refunds delayed by your bank or financial institution. Contact your bank if the refund does not appear after 10 business days.
          </p>
        </section>

        {/* Partial Refunds */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Partial Refunds</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In some cases, partial refunds may be issued:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>When service has been partially used or accessed</li>
            <li>When administrative or processing fees apply</li>
            <li>When only portions of a service are being cancelled</li>
            <li>When refund eligibility criteria are partially met</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Partial refund amounts are calculated based on services provided, fees incurred, and other applicable factors. Our team will provide a detailed breakdown of the partial refund calculation.
          </p>
        </section>

        {/* Changes to Refund Policy */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Changes to Refund Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            AgroTech Solutions reserves the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. Material changes will be communicated via email notification to all registered users.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Your continued use of our services following notification of changes constitutes your acceptance of the updated Refund Policy. We encourage you to review this policy periodically to stay informed of any updates.
          </p>
        </section>

        {/* Dispute Resolution */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you disagree with our refund decision, you have the right to dispute it:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li>Submit a written dispute to disputes@agrotech.com within 14 days of our decision</li>
            <li>Include your refund request number and detailed explanation of your dispute</li>
            <li>Provide any additional supporting documentation</li>
            <li>Our management team will review your dispute within 10 business days</li>
            <li>We will notify you of the final decision in writing</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            For disputes related to payment transactions, you may also file a chargeback with your credit card company or financial institution, subject to their terms and conditions.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-10 bg-green-50 rounded-lg p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            For questions about our Refund Policy or to submit a refund request, please contact us:
          </p>
          <div className="space-y-3 text-gray-700">
            <p><span className="font-semibold">AgroTech Solutions</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">Refund Requests:</span> <span>refunds@agrotech.com</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">General Support:</span> <span>support@agrotech.com</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">Disputes:</span> <span>disputes@agrotech.com</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">Phone:</span> <span>+91 (0) 9876543210</span></p>
            <p className="flex items-start"><span className="font-semibold mr-2">Address:</span> <span>Agricultural Innovation Hub, Tech Park, India</span></p>
          </div>
        </section>

        {/* Footer Note */}
        <section className="text-center text-gray-600 text-sm py-8 border-t border-gray-200 mt-10">
          <p>
            This Refund Policy is binding and is part of our Terms of Service. Refunds are processed at the sole discretion of AgroTech Solutions management.
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

export default RefundPolicy;
