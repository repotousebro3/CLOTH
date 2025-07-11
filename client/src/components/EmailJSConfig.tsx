import React, { useState } from 'react';
import { Settings, Save, Eye, EyeOff } from 'lucide-react';
import CustomAlert from './CustomAlert';

const EmailJSConfig = () => {
  const [config, setConfig] = useState({
    serviceId: localStorage.getItem('emailjs_service_id') || '',
    templateId: localStorage.getItem('emailjs_template_id') || '',
    publicKey: localStorage.getItem('emailjs_public_key') || ''
  });
  const [showKeys, setShowKeys] = useState(false);
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!config.serviceId || !config.templateId || !config.publicKey) {
      setAlert({
        isOpen: true,
        title: 'Missing Configuration',
        message: 'Please fill in all EmailJS configuration fields.',
        type: 'warning'
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('emailjs_service_id', config.serviceId);
    localStorage.setItem('emailjs_template_id', config.templateId);
    localStorage.setItem('emailjs_public_key', config.publicKey);

    setAlert({
      isOpen: true,
      title: 'Configuration Saved',
      message: 'EmailJS configuration has been saved successfully.',
      type: 'success'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <Settings className="w-6 h-6 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">EmailJS Configuration</h3>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Setup Instructions:</h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Create an account at <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="underline">emailjs.com</a></li>
            <li>Create an email service (Gmail, Outlook, etc.)</li>
            <li>Create an email template with the following variables:</li>
          </ol>
          <div className="mt-3 bg-blue-100 p-3 rounded text-xs font-mono">
            {`{{order_id}}, {{customer_name}}, {{customer_email}}, {{customer_phone}}, 
{{customer_address}}, {{payment_method}}, {{total_amount}}, {{order_date}}, 
{{items_list}}, {{items_count}}, {{total_items}}`}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service ID
            </label>
            <input
              type={showKeys ? 'text' : 'password'}
              name="serviceId"
              value={config.serviceId}
              onChange={handleInputChange}
              placeholder="service_xxxxxxx"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template ID
            </label>
            <input
              type={showKeys ? 'text' : 'password'}
              name="templateId"
              value={config.templateId}
              onChange={handleInputChange}
              placeholder="template_xxxxxxx"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Public Key
            </label>
            <input
              type={showKeys ? 'text' : 'password'}
              name="publicKey"
              value={config.publicKey}
              onChange={handleInputChange}
              placeholder="xxxxxxxxxxxxxxx"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowKeys(!showKeys)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            {showKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="text-sm">{showKeys ? 'Hide' : 'Show'} Keys</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      <CustomAlert
        isOpen={alert.isOpen}
        onClose={() => setAlert(prev => ({ ...prev, isOpen: false }))}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </div>
  );
};

export default EmailJSConfig;