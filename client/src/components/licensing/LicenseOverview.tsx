import React from 'react';
import { License } from '../../../shared/schema';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { FiCalendar, FiUsers, FiCheckCircle, FiAlertTriangle, FiClock } from 'react-icons/fi';
import { Progress } from '../ui/progress';

interface LicenseOverviewProps {
  license: License;
}

export default function LicenseOverview({ license }: LicenseOverviewProps) {
  const getDaysRemaining = () => {
    const now = new Date();
    const expiry = new Date(license.expiresAt);
    const diffTime = Math.abs(expiry.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTotalLicenseDuration = () => {
    const activation = new Date(license.activatedAt);
    const expiry = new Date(license.expiresAt);
    const diffTime = Math.abs(expiry.getTime() - activation.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysUsed = () => {
    const now = new Date();
    const activation = new Date(license.activatedAt);
    const diffTime = Math.abs(now.getTime() - activation.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const progress = Math.round((getDaysUsed() / getTotalLicenseDuration()) * 100);
  const daysRemaining = getDaysRemaining();
  
  // License status color mapping
  const statusColors = {
    'active': 'bg-green-500',
    'expired': 'bg-red-500',
    'trial': 'bg-amber-500',
    'suspended': 'bg-orange-500',
    'cancelled': 'bg-gray-500'
  };
  
  // License type color mapping
  const typeColors = {
    'basic': 'bg-blue-500',
    'professional': 'bg-purple-500',
    'enterprise': 'bg-indigo-500',
    'supplier': 'bg-teal-500',
    'manufacturer': 'bg-cyan-500',
    'academic': 'bg-emerald-500'
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1">License Overview</CardTitle>
            <CardDescription>Summary of your current license</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className={`${statusColors[license.status as keyof typeof statusColors]} text-white`}>
              {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
            </Badge>
            <Badge variant="outline" className={`${typeColors[license.licenseType as keyof typeof typeColors]} text-white`}>
              {license.licenseType.charAt(0).toUpperCase() + license.licenseType.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-full mr-4">
              <FiCalendar className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">Expiration Date</p>
              <p className="text-lg">{new Date(license.expiresAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-green-50 p-2 rounded-full mr-4">
              <FiUsers className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">User Access</p>
              <p className="text-lg">{license.currentUsers} / {license.maxUsers} seats</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-purple-50 p-2 rounded-full mr-4">
              <FiCheckCircle className="text-purple-500" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">Features</p>
              <p className="text-lg">{license.features.length} enabled</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <FiClock className="text-gray-500 mr-2" />
              <span className="text-sm font-medium">License Period</span>
            </div>
            <span className="text-sm">
              {daysRemaining <= 30 ? (
                <span className="text-amber-500 flex items-center">
                  <FiAlertTriangle className="mr-1" size={16} />
                  {daysRemaining} days remaining
                </span>
              ) : (
                `${daysRemaining} days remaining`
              )}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Activated: {new Date(license.activatedAt).toLocaleDateString()}</span>
            <span>Expires: {new Date(license.expiresAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 rounded-b-lg pt-3 pb-3 flex flex-col items-start">
        <div className="text-sm text-gray-700 mb-1">
          <strong>License Key:</strong> {license.licenseKey.substring(0, 8)}...{license.licenseKey.substring(license.licenseKey.length - 8)}
        </div>
        <div className="text-sm text-gray-700">
          <strong>Organization:</strong> {license.organizationName}
        </div>
      </CardFooter>
    </Card>
  );
}