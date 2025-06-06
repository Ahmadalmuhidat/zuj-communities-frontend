import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios_Client from '@/config/axios';

interface SocietyFormData {
  name: string;
  description: string;
  category: string;
  visibility: 'public' | 'private' | 'invite-only';
  image: string,
  joinApproval: boolean;
}

export default function New_Society() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [formData, setFormData] = useState<SocietyFormData>({
    name: '',
    description: '',
    category: '',
    visibility: 'public',
    image: '',
    joinApproval: true
  });

  const [errors, setErrors] = useState<Partial<SocietyFormData>>({});

  const categories = [
    'Technology',
    'Science',
    'Arts & Culture',
    'Sports & Recreation',
    'Academic',
    'Social',
    'Professional',
    'Community Service',
    'Religious',
    'Political',
    'Environmental',
    'Health & Wellness'
  ];

  const handleInputChange = (field: keyof SocietyFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SocietyFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Society name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await Axios_Client.post("/societies/create_society", {
        name: formData.name,
        description: formData.description,
        token: localStorage.getItem("token"),
        category: formData.category,
        visibilty: formData.visibility,
        image: formData.image
      })

      if (res.status == 201) {
        navigate('/societies/' + res.data.data);
      } else {
        throw ("Error creating society");
      }
    } catch (error) {
      console.error('Error creating society:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Society</h1>
            <p className="text-lg text-gray-600">
              Start building your community and connect with like-minded people
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Society Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your society name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Describe your society's purpose, activities, and goals"
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Society Image URL (Optional)
              </label>
              <input
                type="url"
                id="imageUrl"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="https://example.com/event-image.jpg"
              />
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
              <p className="mt-1 text-sm text-gray-500">
                Add an image URL to make your society more attractive. Recommended size: 1200x600px
              </p>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Society Visibility
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'public', label: 'Public', description: 'Anyone can find and view this society' },
                      { value: 'private', label: 'Private', description: 'Only members can view this society' },
                      { value: 'invite-only', label: 'Invite Only', description: 'Only invited users can join' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-start">
                        <input
                          type="radio"
                          name="visibility"
                          value={option.value}
                          checked={formData.visibility === option.value}
                          onChange={(e) => handleInputChange('visibility', e.target.value as 'public' | 'private' | 'invite-only')}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Require approval for new members</h4>
                    <p className="text-sm text-gray-600">New join requests must be approved by admins</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.joinApproval}
                      onChange={(e) => handleInputChange('joinApproval', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/societies')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Society...
                  </div>
                ) : (
                  'Create Society'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
