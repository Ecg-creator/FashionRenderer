import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export const ArchitectureDiagram = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Virtual Silk Road Architecture
      </h1>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="modules">Functional Modules</TabsTrigger>
          <TabsTrigger value="apis">API Connections</TabsTrigger>
          <TabsTrigger value="licenses">License Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Architecture Overview</CardTitle>
              <CardDescription>
                The core components that make up the Virtual Silk Road ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-white">
                <svg viewBox="0 0 800 600" className="w-full h-auto">
                  {/* Background */}
                  <rect
                    x="0"
                    y="0"
                    width="800"
                    height="600"
                    fill="#f9fafb"
                    rx="10"
                    ry="10"
                  />

                  {/* Empire OS - Central Core */}
                  <rect
                    x="320"
                    y="50"
                    width="160"
                    height="80"
                    rx="10"
                    ry="10"
                    fill="#4f46e5"
                    className="drop-shadow-lg"
                  />
                  <text
                    x="400"
                    y="90"
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    Empire OS
                  </text>
                  <text
                    x="400"
                    y="110"
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                  >
                    Central Governance
                  </text>

                  {/* License Hub */}
                  <rect
                    x="320"
                    y="160"
                    width="160"
                    height="60"
                    rx="8"
                    ry="8"
                    fill="#6366f1"
                  />
                  <text
                    x="400"
                    y="195"
                    textAnchor="middle"
                    fill="white"
                    fontSize="16"
                  >
                    License Hub
                  </text>

                  {/* Four Primary Networks */}
                  {/* Woven Supply */}
                  <rect
                    x="100"
                    y="260"
                    width="140"
                    height="60"
                    rx="8"
                    ry="8"
                    fill="#0ea5e9"
                  />
                  <text
                    x="170"
                    y="295"
                    textAnchor="middle"
                    fill="white"
                    fontSize="16"
                  >
                    Woven Supply
                  </text>

                  {/* Commune Connect */}
                  <rect
                    x="260"
                    y="260"
                    width="140"
                    height="60"
                    rx="8"
                    ry="8"
                    fill="#10b981"
                  />
                  <text
                    x="330"
                    y="295"
                    textAnchor="middle"
                    fill="white"
                    fontSize="16"
                  >
                    Commune Connect
                  </text>

                  {/* Last Smile */}
                  <rect
                    x="420"
                    y="260"
                    width="140"
                    height="60"
                    rx="8"
                    ry="8"
                    fill="#f59e0b"
                  />
                  <text
                    x="490"
                    y="295"
                    textAnchor="middle"
                    fill="white"
                    fontSize="16"
                  >
                    Last Smile
                  </text>

                  {/* SyncUp */}
                  <rect
                    x="580"
                    y="260"
                    width="140"
                    height="60"
                    rx="8"
                    ry="8"
                    fill="#ec4899"
                  />
                  <text
                    x="650"
                    y="295"
                    textAnchor="middle"
                    fill="white"
                    fontSize="16"
                  >
                    SyncUp
                  </text>

                  {/* Functional Modules */}
                  {/* Manufacturing */}
                  <rect
                    x="60"
                    y="360"
                    width="120"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#93c5fd"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                  />
                  <text
                    x="120"
                    y="390"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="14"
                  >
                    Manufacturing
                  </text>

                  {/* Materials */}
                  <rect
                    x="60"
                    y="430"
                    width="120"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#93c5fd"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                  />
                  <text
                    x="120"
                    y="460"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="14"
                  >
                    Materials
                  </text>

                  {/* Brands */}
                  <rect
                    x="260"
                    y="360"
                    width="120"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#86efac"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <text
                    x="320"
                    y="390"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="14"
                  >
                    Brands
                  </text>

                  {/* Retail */}
                  <rect
                    x="260"
                    y="430"
                    width="120"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#86efac"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <text
                    x="320"
                    y="460"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="14"
                  >
                    Retail
                  </text>

                  {/* Logistics */}
                  <rect
                    x="450"
                    y="360"
                    width="120"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#fcd34d"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <text
                    x="510"
                    y="390"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="14"
                  >
                    Delivery
                  </text>

                  {/* Warehouse */}
                  <rect
                    x="450"
                    y="430"
                    width="120"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#fcd34d"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <text
                    x="510"
                    y="460"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="14"
                  >
                    Warehouse
                  </text>

                  {/* App Marketplace */}
                  <rect
                    x="640"
                    y="360"
                    width="120"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#f9a8d4"
                    stroke="#ec4899"
                    strokeWidth="2"
                  />
                  <text
                    x="700"
                    y="390"
                    textAnchor="middle"
                    fill="#9d174d"
                    fontSize="14"
                  >
                    App Marketplace
                  </text>

                  {/* API Layer */}
                  <rect
                    x="60"
                    y="520"
                    width="680"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#e5e7eb"
                    stroke="#9ca3af"
                    strokeWidth="2"
                  />
                  <text
                    x="400"
                    y="550"
                    textAnchor="middle"
                    fill="#374151"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    API Layer
                  </text>

                  {/* Connect lines from Empire OS to License Hub */}
                  <line
                    x1="400"
                    y1="130"
                    x2="400"
                    y2="160"
                    stroke="#4f46e5"
                    strokeWidth="3"
                  />

                  {/* Connect lines from License Hub to networks */}
                  <line
                    x1="400"
                    y1="220"
                    x2="170"
                    y2="260"
                    stroke="#6366f1"
                    strokeWidth="2"
                  />
                  <line
                    x1="400"
                    y1="220"
                    x2="330"
                    y2="260"
                    stroke="#6366f1"
                    strokeWidth="2"
                  />
                  <line
                    x1="400"
                    y1="220"
                    x2="490"
                    y2="260"
                    stroke="#6366f1"
                    strokeWidth="2"
                  />
                  <line
                    x1="400"
                    y1="220"
                    x2="650"
                    y2="260"
                    stroke="#6366f1"
                    strokeWidth="2"
                  />

                  {/* Connect lines from networks to modules */}
                  <line
                    x1="170"
                    y1="320"
                    x2="120"
                    y2="360"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                  />
                  <line
                    x1="170"
                    y1="320"
                    x2="120"
                    y2="430"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                  />

                  <line
                    x1="330"
                    y1="320"
                    x2="320"
                    y2="360"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <line
                    x1="330"
                    y1="320"
                    x2="320"
                    y2="430"
                    stroke="#10b981"
                    strokeWidth="2"
                  />

                  <line
                    x1="490"
                    y1="320"
                    x2="510"
                    y2="360"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <line
                    x1="490"
                    y1="320"
                    x2="510"
                    y2="430"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />

                  <line
                    x1="650"
                    y1="320"
                    x2="700"
                    y2="360"
                    stroke="#ec4899"
                    strokeWidth="2"
                  />

                  {/* Connect all modules to API Layer */}
                  <line
                    x1="120"
                    y1="480"
                    x2="120"
                    y2="520"
                    stroke="#9ca3af"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                  <line
                    x1="320"
                    y1="480"
                    x2="320"
                    y2="520"
                    stroke="#9ca3af"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                  <line
                    x1="510"
                    y1="480"
                    x2="510"
                    y2="520"
                    stroke="#9ca3af"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                  <line
                    x1="700"
                    y1="410"
                    x2="700"
                    y2="520"
                    stroke="#9ca3af"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                </svg>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-indigo-50">
                  <h3 className="font-medium text-indigo-900 mb-2">
                    Empire OS (Core)
                  </h3>
                  <p className="text-sm text-indigo-700">
                    The central governance system that manages licenses, user
                    roles, and overall system integrity. It serves as the brain
                    of the entire ecosystem.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-indigo-50">
                  <h3 className="font-medium text-indigo-900 mb-2">
                    License Hub
                  </h3>
                  <p className="text-sm text-indigo-700">
                    Manages all license types (Manufacturer, Brand, Retailer)
                    and their associated permissions, capabilities, and pricing
                    tiers.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Woven Supply
                  </h3>
                  <p className="text-sm text-blue-700">
                    The pre-retail network focused on manufacturing, material
                    sourcing, and production management.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-green-50">
                  <h3 className="font-medium text-green-900 mb-2">
                    Commune Connect
                  </h3>
                  <p className="text-sm text-green-700">
                    The retail and customer-facing network that handles brands,
                    storefronts, and consumer interactions.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-amber-50">
                  <h3 className="font-medium text-amber-900 mb-2">
                    Last Smile
                  </h3>
                  <p className="text-sm text-amber-700">
                    The logistics and fulfillment network handling delivery,
                    warehousing, and last-mile operations.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-pink-50">
                  <h3 className="font-medium text-pink-900 mb-2">SyncUp</h3>
                  <p className="text-sm text-pink-700">
                    The app marketplace and extension ecosystem that allows for
                    third-party integrations and customizations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Functional Modules</CardTitle>
              <CardDescription>
                Detailed breakdown of the components within each network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-white">
                <svg viewBox="0 0 800 700" className="w-full h-auto">
                  {/* Background */}
                  <rect
                    x="0"
                    y="0"
                    width="800"
                    height="700"
                    fill="#f9fafb"
                    rx="10"
                    ry="10"
                  />

                  {/* Woven Supply Network */}
                  <rect
                    x="50"
                    y="50"
                    width="700"
                    height="150"
                    rx="8"
                    ry="8"
                    fill="#dbeafe"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <text
                    x="400"
                    y="80"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    Woven Supply Network
                  </text>

                  {/* Woven Supply Modules */}
                  <rect
                    x="70"
                    y="100"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#bfdbfe"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                  <text
                    x="145"
                    y="140"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Manufacturing
                  </text>
                  <text
                    x="145"
                    y="160"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="12"
                  >
                    Production Tracking
                  </text>

                  <rect
                    x="240"
                    y="100"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#bfdbfe"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                  <text
                    x="315"
                    y="140"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Material Library
                  </text>
                  <text
                    x="315"
                    y="160"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="12"
                  >
                    HSN Code Integration
                  </text>

                  <rect
                    x="410"
                    y="100"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#bfdbfe"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                  <text
                    x="485"
                    y="140"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Vendor Management
                  </text>
                  <text
                    x="485"
                    y="160"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="12"
                  >
                    Supplier Tracking
                  </text>

                  <rect
                    x="580"
                    y="100"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#bfdbfe"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                  <text
                    x="655"
                    y="140"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    BOM Builder
                  </text>
                  <text
                    x="655"
                    y="160"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="12"
                  >
                    Automated Costing
                  </text>

                  {/* Commune Connect Network */}
                  <rect
                    x="50"
                    y="220"
                    width="700"
                    height="150"
                    rx="8"
                    ry="8"
                    fill="#dcfce7"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                  <text
                    x="400"
                    y="250"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    Commune Connect Network
                  </text>

                  {/* Commune Connect Modules */}
                  <rect
                    x="70"
                    y="270"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#bbf7d0"
                    stroke="#22c55e"
                    strokeWidth="1"
                  />
                  <text
                    x="145"
                    y="310"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Virtual Showroom
                  </text>
                  <text
                    x="145"
                    y="330"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    3D Collections
                  </text>

                  <rect
                    x="240"
                    y="270"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#bbf7d0"
                    stroke="#22c55e"
                    strokeWidth="1"
                  />
                  <text
                    x="315"
                    y="310"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Marketplace
                  </text>
                  <text
                    x="315"
                    y="330"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    Multi-Brand Retail
                  </text>

                  <rect
                    x="410"
                    y="270"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#bbf7d0"
                    stroke="#22c55e"
                    strokeWidth="1"
                  />
                  <text
                    x="485"
                    y="310"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Order Management
                  </text>
                  <text
                    x="485"
                    y="330"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    Sales & Returns
                  </text>

                  <rect
                    x="580"
                    y="270"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#bbf7d0"
                    stroke="#22c55e"
                    strokeWidth="1"
                  />
                  <text
                    x="655"
                    y="310"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Brand Analytics
                  </text>
                  <text
                    x="655"
                    y="330"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    Performance Metrics
                  </text>

                  {/* Last Smile Network */}
                  <rect
                    x="50"
                    y="390"
                    width="700"
                    height="150"
                    rx="8"
                    ry="8"
                    fill="#fef3c7"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <text
                    x="400"
                    y="420"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    Last Smile Network
                  </text>

                  {/* Last Smile Modules */}
                  <rect
                    x="70"
                    y="440"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#fde68a"
                    stroke="#f59e0b"
                    strokeWidth="1"
                  />
                  <text
                    x="145"
                    y="480"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Logistics Hub
                  </text>
                  <text
                    x="145"
                    y="500"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    Delivery Management
                  </text>

                  <rect
                    x="240"
                    y="440"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#fde68a"
                    stroke="#f59e0b"
                    strokeWidth="1"
                  />
                  <text
                    x="315"
                    y="480"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Warehousing
                  </text>
                  <text
                    x="315"
                    y="500"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    Inventory Control
                  </text>

                  <rect
                    x="410"
                    y="440"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#fde68a"
                    stroke="#f59e0b"
                    strokeWidth="1"
                  />
                  <text
                    x="485"
                    y="480"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Sample Management
                  </text>
                  <text
                    x="485"
                    y="500"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    Request Tracking
                  </text>

                  <rect
                    x="580"
                    y="440"
                    width="150"
                    height="80"
                    rx="6"
                    ry="6"
                    fill="#fde68a"
                    stroke="#f59e0b"
                    strokeWidth="1"
                  />
                  <text
                    x="655"
                    y="480"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Route Optimization
                  </text>
                  <text
                    x="655"
                    y="500"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    AI Delivery Planning
                  </text>

                  {/* SyncUp Network */}
                  <rect
                    x="50"
                    y="560"
                    width="700"
                    height="120"
                    rx="8"
                    ry="8"
                    fill="#fce7f3"
                    stroke="#ec4899"
                    strokeWidth="2"
                  />
                  <text
                    x="400"
                    y="590"
                    textAnchor="middle"
                    fill="#9d174d"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    SyncUp Network
                  </text>

                  {/* SyncUp Modules */}
                  <rect
                    x="155"
                    y="610"
                    width="150"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#fbcfe8"
                    stroke="#ec4899"
                    strokeWidth="1"
                  />
                  <text
                    x="230"
                    y="640"
                    textAnchor="middle"
                    fill="#9d174d"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    App Marketplace
                  </text>

                  <rect
                    x="325"
                    y="610"
                    width="150"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#fbcfe8"
                    stroke="#ec4899"
                    strokeWidth="1"
                  />
                  <text
                    x="400"
                    y="640"
                    textAnchor="middle"
                    fill="#9d174d"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Integration Tools
                  </text>

                  <rect
                    x="495"
                    y="610"
                    width="150"
                    height="50"
                    rx="6"
                    ry="6"
                    fill="#fbcfe8"
                    stroke="#ec4899"
                    strokeWidth="1"
                  />
                  <text
                    x="570"
                    y="640"
                    textAnchor="middle"
                    fill="#9d174d"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Developer SDK
                  </text>
                </svg>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-3">
                  HSN Code Integration
                </h3>
                <div className="border rounded-lg p-4 bg-blue-50">
                  <p className="text-sm text-blue-800 mb-2">
                    The Material Library module within Woven Supply includes
                    comprehensive HSN (Harmonized System Nomenclature) code
                    integration, providing:
                  </p>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    <li>
                      Automated tax calculation based on current GST rates
                    </li>
                    <li>
                      Proper classification for each material and finished
                      product
                    </li>
                    <li>Documentation for export/import procedures</li>
                    <li>Compliance with taxation regulations</li>
                    <li>Real-time updates to HSN codes and tax rates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apis" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Connections</CardTitle>
              <CardDescription>
                The interconnected API framework that powers the Virtual Silk
                Road
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-white">
                <svg viewBox="0 0 800 600" className="w-full h-auto">
                  {/* Background */}
                  <rect
                    x="0"
                    y="0"
                    width="800"
                    height="600"
                    fill="#f9fafb"
                    rx="10"
                    ry="10"
                  />

                  {/* Empire OS in center */}
                  <circle cx="400" cy="300" r="80" fill="#4f46e5" />
                  <text
                    x="400"
                    y="290"
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    Empire OS
                  </text>
                  <text
                    x="400"
                    y="310"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                  >
                    API Hub
                  </text>

                  {/* Authentication API */}
                  <circle cx="400" cy="120" r="50" fill="#6366f1" />
                  <text
                    x="400"
                    y="120"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Auth API
                  </text>
                  <line
                    x1="400"
                    y1="170"
                    x2="400"
                    y2="220"
                    stroke="#6366f1"
                    strokeWidth="3"
                  />

                  {/* License API */}
                  <circle cx="220" cy="200" r="50" fill="#3b82f6" />
                  <text
                    x="220"
                    y="200"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    License API
                  </text>
                  <line
                    x1="270"
                    y1="200"
                    x2="328"
                    y2="265"
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />

                  {/* KYC API */}
                  <circle cx="220" cy="400" r="50" fill="#2563eb" />
                  <text
                    x="220"
                    y="400"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    KYC API
                  </text>
                  <line
                    x1="270"
                    y1="400"
                    x2="328"
                    y2="335"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  {/* Financial API */}
                  <circle cx="400" cy="480" r="50" fill="#10b981" />
                  <text
                    x="400"
                    y="480"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Financial API
                  </text>
                  <line
                    x1="400"
                    y1="430"
                    x2="400"
                    y2="380"
                    stroke="#10b981"
                    strokeWidth="3"
                  />

                  {/* Manufacturing API */}
                  <circle cx="580" cy="200" r="50" fill="#f59e0b" />
                  <text
                    x="580"
                    y="190"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Production
                  </text>
                  <text
                    x="580"
                    y="210"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    API
                  </text>
                  <line
                    x1="530"
                    y1="200"
                    x2="472"
                    y2="265"
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />

                  {/* Logistics API */}
                  <circle cx="580" cy="400" r="50" fill="#ec4899" />
                  <text
                    x="580"
                    y="390"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Logistics
                  </text>
                  <text
                    x="580"
                    y="410"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    API
                  </text>
                  <line
                    x1="530"
                    y1="400"
                    x2="472"
                    y2="335"
                    stroke="#ec4899"
                    strokeWidth="3"
                  />

                  {/* Connecting lines between APIs */}
                  <path
                    d="M220,250 C220,300 350,300 400,350 C450,300 580,300 580,250"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M220,350 C220,300 350,300 400,250 C450,300 580,300 580,350"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M450,120 C550,120 600,200 600,300 C600,400 550,480 450,480"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M350,120 C250,120 200,200 200,300 C200,400 250,480 350,480"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />

                  {/* Smaller API circles around the perimeter */}
                  <circle cx="310" cy="100" r="30" fill="#8b5cf6" />
                  <text
                    x="310"
                    y="100"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    User API
                  </text>
                  <line
                    x1="328"
                    y1="125"
                    x2="350"
                    y2="230"
                    stroke="#8b5cf6"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  <circle cx="490" cy="100" r="30" fill="#8b5cf6" />
                  <text
                    x="490"
                    y="100"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    Role API
                  </text>
                  <line
                    x1="472"
                    y1="125"
                    x2="450"
                    y2="230"
                    stroke="#8b5cf6"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  <circle cx="150" cy="150" r="30" fill="#3b82f6" />
                  <text
                    x="150"
                    y="150"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    Tier API
                  </text>
                  <line
                    x1="175"
                    y1="165"
                    x2="195"
                    y2="180"
                    stroke="#3b82f6"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  <circle cx="150" cy="300" r="30" fill="#3b82f6" />
                  <text
                    x="150"
                    y="300"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    Contract API
                  </text>
                  <line
                    x1="180"
                    y1="300"
                    x2="195"
                    y2="300"
                    stroke="#3b82f6"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  <circle cx="150" cy="450" r="30" fill="#2563eb" />
                  <text
                    x="150"
                    y="450"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    Compliance API
                  </text>
                  <line
                    x1="175"
                    y1="435"
                    x2="195"
                    y2="420"
                    stroke="#2563eb"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  <circle cx="310" cy="500" r="30" fill="#10b981" />
                  <text
                    x="310"
                    y="500"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    Escrow API
                  </text>
                  <line
                    x1="328"
                    y1="475"
                    x2="350"
                    y2="370"
                    stroke="#10b981"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  <circle cx="490" cy="500" r="30" fill="#10b981" />
                  <text
                    x="490"
                    y="500"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    Tax API
                  </text>
                  <line
                    x1="472"
                    y1="475"
                    x2="450"
                    y2="370"
                    stroke="#10b981"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  <circle cx="650" cy="150" r="30" fill="#f59e0b" />
                  <text
                    x="650"
                    y="150"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    MES API
                  </text>
                  <line
                    x1="625"
                    y1="165"
                    x2="605"
                    y2="180"
                    stroke="#f59e0b"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  <circle cx="650" cy="300" r="30" fill="#ec4899" />
                  <text
                    x="650"
                    y="300"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    BOM API
                  </text>
                  <line
                    x1="620"
                    y1="300"
                    x2="605"
                    y2="300"
                    stroke="#ec4899"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  <circle cx="650" cy="450" r="30" fill="#ec4899" />
                  <text
                    x="650"
                    y="450"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    Tracking API
                  </text>
                  <line
                    x1="625"
                    y1="435"
                    x2="605"
                    y2="420"
                    stroke="#ec4899"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  {/* HSN Code API */}
                  <circle
                    cx="400"
                    cy="570"
                    r="40"
                    fill="#8b5cf6"
                    strokeWidth="2"
                    stroke="#4f46e5"
                  />
                  <text
                    x="400"
                    y="570"
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    HSN Code API
                  </text>
                  <line
                    x1="400"
                    y1="530"
                    x2="400"
                    y2="480"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="mt-6 space-y-4">
                <div className="border rounded-lg p-4 bg-indigo-50">
                  <h3 className="font-medium text-indigo-900 mb-2">
                    Empire OS API Hub
                  </h3>
                  <p className="text-sm text-indigo-700">
                    The central API orchestration layer that manages all API
                    requests, authentication, and routing between different
                    modules and networks.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Authentication & License APIs
                  </h3>
                  <p className="text-sm text-blue-700">
                    The fundamental APIs that handle user authentication, role
                    assignments, and license validation for access to various
                    modules.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-purple-50">
                  <h3 className="font-medium text-purple-900 mb-2">
                    HSN Code Integration API
                  </h3>
                  <p className="text-sm text-purple-700">
                    A specialized API service that manages:
                    <ul className="list-disc list-inside mt-1">
                      <li>
                        Automatic HSN code assignment to materials and products
                      </li>
                      <li>
                        Tax calculation based on current GST rates for each HSN
                        code
                      </li>
                      <li>Export/import documentation requirements</li>
                      <li>Legal compliance with taxation rules</li>
                    </ul>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>License Structure</CardTitle>
              <CardDescription>
                How licenses are deployed and managed across the ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-white">
                <svg viewBox="0 0 800 600" className="w-full h-auto">
                  {/* Background */}
                  <rect
                    x="0"
                    y="0"
                    width="800"
                    height="600"
                    fill="#f9fafb"
                    rx="10"
                    ry="10"
                  />

                  {/* Empire OS License Manager */}
                  <rect
                    x="300"
                    y="40"
                    width="200"
                    height="60"
                    rx="8"
                    ry="8"
                    fill="#4f46e5"
                  />
                  <text
                    x="400"
                    y="75"
                    textAnchor="middle"
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    Empire OS License Manager
                  </text>

                  {/* License Types */}
                  <rect
                    x="50"
                    y="150"
                    width="220"
                    height="400"
                    rx="8"
                    ry="8"
                    fill="#dbeafe"
                  />
                  <text
                    x="160"
                    y="180"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    Manufacturer Licenses
                  </text>

                  <rect
                    x="290"
                    y="150"
                    width="220"
                    height="400"
                    rx="8"
                    ry="8"
                    fill="#dcfce7"
                  />
                  <text
                    x="400"
                    y="180"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    Brand Licenses
                  </text>

                  <rect
                    x="530"
                    y="150"
                    width="220"
                    height="400"
                    rx="8"
                    ry="8"
                    fill="#fef3c7"
                  />
                  <text
                    x="640"
                    y="180"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    Retailer Licenses
                  </text>

                  {/* License models for Manufacturers */}
                  <rect
                    x="70"
                    y="210"
                    width="180"
                    height="90"
                    rx="6"
                    ry="6"
                    fill="#bfdbfe"
                  />
                  <text
                    x="160"
                    y="235"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    FOB Model
                  </text>
                  <text
                    x="160"
                    y="260"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="12"
                  >
                    ₹50,000/month
                  </text>
                  <text
                    x="160"
                    y="280"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="12"
                  >
                    Complete manufacturing control
                  </text>

                  <rect
                    x="70"
                    y="310"
                    width="180"
                    height="90"
                    rx="6"
                    ry="6"
                    fill="#bfdbfe"
                  />
                  <text
                    x="160"
                    y="335"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    CMP Model
                  </text>
                  <text
                    x="160"
                    y="360"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="12"
                  >
                    ₹30,000/month
                  </text>
                  <text
                    x="160"
                    y="380"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="12"
                  >
                    Cut, Make, Pack operations
                  </text>

                  <rect
                    x="70"
                    y="410"
                    width="180"
                    height="90"
                    rx="6"
                    ry="6"
                    fill="#bfdbfe"
                  />
                  <text
                    x="160"
                    y="435"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    White-Label Model
                  </text>
                  <text
                    x="160"
                    y="460"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="12"
                  >
                    ₹40,000/month
                  </text>
                  <text
                    x="160"
                    y="480"
                    textAnchor="middle"
                    fill="#1e40af"
                    fontSize="12"
                  >
                    Private labeling production
                  </text>

                  {/* License models for Brands */}
                  <rect
                    x="310"
                    y="210"
                    width="180"
                    height="140"
                    rx="6"
                    ry="6"
                    fill="#bbf7d0"
                  />
                  <text
                    x="400"
                    y="235"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Brand License
                  </text>
                  <text
                    x="400"
                    y="260"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    ₹45,000/month
                  </text>
                  <text
                    x="400"
                    y="280"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    • Procurement & Buying
                  </text>
                  <text
                    x="400"
                    y="300"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    • Model Builder
                  </text>
                  <text
                    x="400"
                    y="320"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    • Smart Contract Engine
                  </text>
                  <text
                    x="400"
                    y="340"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    • Commune Connect Access
                  </text>

                  <rect
                    x="310"
                    y="360"
                    width="180"
                    height="140"
                    rx="6"
                    ry="6"
                    fill="#bbf7d0"
                  />
                  <text
                    x="400"
                    y="385"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Public/Freelance License
                  </text>
                  <text
                    x="400"
                    y="410"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    ₹5,000/month
                  </text>
                  <text
                    x="400"
                    y="430"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    • Limited marketplace access
                  </text>
                  <text
                    x="400"
                    y="450"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    • Basic design tools
                  </text>
                  <text
                    x="400"
                    y="470"
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="12"
                  >
                    • Public API access
                  </text>

                  {/* License models for Retailers */}
                  <rect
                    x="550"
                    y="210"
                    width="180"
                    height="140"
                    rx="6"
                    ry="6"
                    fill="#fde68a"
                  />
                  <text
                    x="640"
                    y="235"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Retailer License
                  </text>
                  <text
                    x="640"
                    y="260"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    ₹25,000/month
                  </text>
                  <text
                    x="640"
                    y="280"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    • Sales & Distribution
                  </text>
                  <text
                    x="640"
                    y="300"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    • Last Smile Logistics
                  </text>
                  <text
                    x="640"
                    y="320"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    • Virtual Mall
                  </text>
                  <text
                    x="640"
                    y="340"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    • Sales Analytics
                  </text>

                  <rect
                    x="550"
                    y="360"
                    width="180"
                    height="140"
                    rx="6"
                    ry="6"
                    fill="#fde68a"
                  />
                  <text
                    x="640"
                    y="385"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Logistics Provider
                  </text>
                  <text
                    x="640"
                    y="410"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    ₹15,000/month
                  </text>
                  <text
                    x="640"
                    y="430"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    • Logistics dashboard
                  </text>
                  <text
                    x="640"
                    y="450"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    • Route optimization
                  </text>
                  <text
                    x="640"
                    y="470"
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="12"
                  >
                    • Delivery management
                  </text>

                  {/* Connecting lines */}
                  <line
                    x1="400"
                    y1="100"
                    x2="160"
                    y2="150"
                    stroke="#4f46e5"
                    strokeWidth="2"
                  />
                  <line
                    x1="400"
                    y1="100"
                    x2="400"
                    y2="150"
                    stroke="#4f46e5"
                    strokeWidth="2"
                  />
                  <line
                    x1="400"
                    y1="100"
                    x2="640"
                    y2="150"
                    stroke="#4f46e5"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Manufacturer Licensing
                  </h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p className="mb-2">
                      Three primary license models that determine functionality
                      access:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        <strong>FOB Model:</strong> Complete manufacturing
                        control from materials to shipping
                      </li>
                      <li>
                        <strong>CMP Model:</strong> Focused on production
                        execution with limited procurement
                      </li>
                      <li>
                        <strong>White-Label:</strong> Specialized model for
                        unbranded production
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-green-50">
                  <h3 className="font-medium text-green-900 mb-2">
                    Brand Licensing
                  </h3>
                  <div className="text-sm text-green-700 space-y-1">
                    <p className="mb-2">
                      Full-featured brand management license that provides:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Procurement and vendor management</li>
                      <li>Supply chain modeling and optimization</li>
                      <li>Smart contract governance</li>
                      <li>Multi-channel retail capabilities</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-amber-50">
                  <h3 className="font-medium text-amber-900 mb-2">
                    Retailer Licensing
                  </h3>
                  <div className="text-sm text-amber-700 space-y-1">
                    <p className="mb-2">Retail-focused licenses that enable:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Virtual storefronts and marketplaces</li>
                      <li>Order and inventory management</li>
                      <li>Last-mile logistics integration</li>
                      <li>Sales analytics and reporting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArchitectureDiagram;
