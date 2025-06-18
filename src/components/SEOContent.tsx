import React from 'react';
import { CheckCircle, Star, Users, Shield } from 'lucide-react';

interface SEOContentProps {
  t: (key: string) => string;
}

const SEOContent: React.FC<SEOContentProps> = ({ t }) => {
  return (
    <div className="mt-16 space-y-12">
      {/* Features Section */}
      <section className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t('seo.features.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('seo.features.interactive')}
              </h3>
              <p className="text-sm text-gray-600">
                Create dynamic project timelines with intuitive drag-and-drop functionality
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('seo.features.multiView')}
              </h3>
              <p className="text-sm text-gray-600">
                Switch between daily, weekly, and monthly views for optimal planning
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('seo.features.export')}
              </h3>
              <p className="text-sm text-gray-600">
                Export your charts as high-quality images or structured JSON data
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('seo.features.responsive')}
              </h3>
              <p className="text-sm text-gray-600">
                Works perfectly on desktop, tablet, and mobile devices
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('seo.features.free')}
              </h3>
              <p className="text-sm text-gray-600">
                No hidden costs, subscriptions, or feature limitations
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Privacy First
              </h3>
              <p className="text-sm text-gray-600">
                Your data stays in your browser - no server uploads required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t('seo.benefits.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <Star className="w-8 h-8 text-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('seo.benefits.professional')}
              </h3>
              <p className="text-gray-600">
                Enterprise-quality project management tools without the enterprise price tag. 
                Perfect for teams of all sizes.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Users className="w-8 h-8 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('seo.benefits.intuitive')}
              </h3>
              <p className="text-gray-600">
                Designed with user experience in mind. Start creating professional 
                Gantt charts in minutes, not hours.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('seo.benefits.noSignup')}
              </h3>
              <p className="text-gray-600">
                Jump right in without creating accounts or providing personal information. 
                Your productivity shouldn't wait.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-purple-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('seo.benefits.dataControl')}
              </h3>
              <p className="text-gray-600">
                Your project data remains completely under your control. 
                Export, backup, and manage as you see fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              What is a Gantt chart and why should I use one?
            </h3>
            <p className="text-gray-600">
              A Gantt chart is a visual project management tool that displays project schedules 
              in a timeline format. It helps you track project progress, identify dependencies, 
              and ensure deadlines are met.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Is this Gantt chart tool really free?
            </h3>
            <p className="text-gray-600">
              Yes! Our professional Gantt chart tool is completely free with no hidden costs, 
              subscriptions, or feature limitations. All functionality is available at no charge.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Can I use this tool for commercial projects?
            </h3>
            <p className="text-gray-600">
              Absolutely! You can use our Gantt chart tool for personal, educational, and 
              commercial projects without any restrictions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              How do I save my Gantt chart data?
            </h3>
            <p className="text-gray-600">
              Your data is automatically saved in your browser's local storage. You can also 
              export your projects as JSON files for backup or sharing purposes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEOContent;