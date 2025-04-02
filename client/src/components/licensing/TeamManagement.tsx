import React, { useState } from 'react';
import { License, LicenseUser } from '../../../shared/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FiUserPlus, FiSearch, FiUsers, FiUserCheck, FiUserX, FiSliders, FiMail } from 'react-icons/fi';

interface TeamManagementProps {
  license: License;
  users?: LicenseUser[];
}

export default function TeamManagement({ license, users = [] }: TeamManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<LicenseUser | null>(null);
  const [usersData, setUsersData] = React.useState<LicenseUser[]>([]);
  
  React.useEffect(() => {
    // If we have users data, use it, otherwise generate demo users
    if (users && users.length > 0) {
      setUsersData(users);
    } else {
      // Generate demo user data based on license properties
      const demoUsers: LicenseUser[] = [];
      
      // Always include an admin
      demoUsers.push({
        id: 1,
        licenseId: license.id,
        userId: 1,
        isAdmin: true,
        roleAssignment: {
          role: 'Administrator',
          permissions: ['user.add', 'user.edit', 'user.delete', 'system.configure', 'billing.manage']
        },
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        createdAt: new Date(license.activatedAt), 
        updatedAt: new Date()
      });
      
      // Generate other users
      const roles = ['Designer', 'Developer', 'Manager', 'Viewer', 'Supplier', 'Manufacturer'];
      const permissions = {
        'Designer': ['designs.create', 'designs.edit', 'designs.view', 'materials.view'],
        'Developer': ['code.edit', 'code.deploy', 'code.view', 'system.view'],
        'Manager': ['reports.view', 'user.view', 'designs.approve', 'billing.view'],
        'Viewer': ['designs.view', 'materials.view', 'reports.view'],
        'Supplier': ['materials.add', 'materials.edit', 'materials.view', 'pricing.edit'],
        'Manufacturer': ['production.manage', 'materials.view', 'designs.view', 'quality.manage']
      };
      
      // Create remaining users up to license.currentUsers
      for (let i = 2; i <= license.currentUsers; i++) {
        const roleIndex = Math.floor(Math.random() * roles.length);
        const role = roles[roleIndex];
        
        // Random date within the last year
        const randomDaysAgo = Math.floor(Math.random() * 365);
        const randomHoursAgo = Math.floor(Math.random() * 72);
        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - randomDaysAgo);
        
        const lastLoginDate = new Date();
        lastLoginDate.setHours(lastLoginDate.getHours() - randomHoursAgo);
        
        demoUsers.push({
          id: i,
          licenseId: license.id,
          userId: i,
          isAdmin: false,
          roleAssignment: {
            role: role,
            permissions: permissions[role as keyof typeof permissions] || []
          },
          lastLogin: lastLoginDate,
          createdAt: createdDate,
          updatedAt: new Date()
        });
      }
      
      setUsersData(demoUsers);
    }
  }, [license, users]);
  
  // Filter users based on search term
  const filteredUsers = usersData.filter(user => {
    // This would need to be updated with real user data
    const userName = `User ${user.userId}`;
    const userEmail = `user${user.userId}@example.com`;
    const role = user.roleAssignment.role;
    
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Split users by role for the tabs
  const admins = filteredUsers.filter(u => u.isAdmin);
  const designers = filteredUsers.filter(u => u.roleAssignment.role === 'Designer');
  const developers = filteredUsers.filter(u => u.roleAssignment.role === 'Developer');
  const managers = filteredUsers.filter(u => u.roleAssignment.role === 'Manager');
  const suppliers = filteredUsers.filter(u => u.roleAssignment.role === 'Supplier');
  const manufacturers = filteredUsers.filter(u => u.roleAssignment.role === 'Manufacturer');
  const viewers = filteredUsers.filter(u => u.roleAssignment.role === 'Viewer');
  
  const handleAddUser = () => {
    // This would typically be a form submission to add a new user
    setIsAddUserDialogOpen(false);
  };
  
  const handleUpdateRole = () => {
    // This would typically update the selected user's role
    setIsRoleDialogOpen(false);
  };
  
  const openRoleDialog = (user: LicenseUser) => {
    setSelectedUser(user);
    setIsRoleDialogOpen(true);
  };
  
  const renderUserItem = (user: LicenseUser) => {
    // Demo user data (would be replaced with real user data)
    const userName = `User ${user.userId}`;
    const userEmail = `user${user.userId}@example.com`;
    const lastLoginFormatted = user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never';
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
    const colorIndex = user.userId % 5; // 5 different colors
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500'];
    const avatarColor = colors[colorIndex];
    
    return (
      <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.userId}`} />
            <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{userName}</div>
            <div className="text-xs text-gray-500 flex items-center">
              <FiMail className="mr-1" size={12} />
              {userEmail}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-right mr-4">
            <Badge variant="outline" className={`${user.isAdmin ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
              {user.roleAssignment.role}
            </Badge>
            <div className="text-xs text-gray-500 mt-1">Last login: {lastLoginFormatted}</div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => openRoleDialog(user)}>
            <FiSliders size={16} />
          </Button>
        </div>
      </div>
    );
  };
  
  const getSeatsStatus = () => {
    const used = usersData.length;
    const total = license.maxUsers;
    const available = Math.max(0, total - used);
    const percentUsed = Math.round((used / total) * 100);
    
    let statusColor = 'text-green-600';
    if (percentUsed > 90) {
      statusColor = 'text-red-600';
    } else if (percentUsed > 75) {
      statusColor = 'text-amber-600';
    }
    
    return (
      <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md mb-4">
        <div>
          <span className="text-sm font-medium">License Seats:</span>
          <span className={`ml-2 ${statusColor} font-medium`}>
            {used} of {total} used
          </span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Available: </span>
          <span className="font-medium">{available}</span>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Team Management</CardTitle>
            <CardDescription>Manage user access and permissions</CardDescription>
          </div>
          <Button 
            onClick={() => setIsAddUserDialogOpen(true)} 
            disabled={usersData.length >= license.maxUsers}
            className="flex items-center"
          >
            <FiUserPlus className="mr-1" />
            Add User
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {getSeatsStatus()}
        
        <div className="flex items-center mb-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all" className="flex items-center">
              <FiUsers className="mr-2" size={14} />
              All Users ({filteredUsers.length})
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center">
              <FiUserCheck className="mr-2" size={14} />
              Admins ({admins.length})
            </TabsTrigger>
            <TabsTrigger value="inactive" className="flex items-center">
              <FiUserX className="mr-2" size={14} />
              Inactive 
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-1">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(renderUserItem)
            ) : (
              <div className="text-center py-8 text-gray-500">
                No users found matching your search.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="admins" className="space-y-1">
            {admins.length > 0 ? (
              admins.map(renderUserItem)
            ) : (
              <div className="text-center py-8 text-gray-500">
                No admin users found.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="inactive" className="space-y-1">
            <div className="text-center py-8 text-gray-500">
              No inactive users found.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Add a new user to your license. This will count towards your seat allocation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter user's full name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="user@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage User Role</DialogTitle>
            <DialogDescription>
              Update the role and permissions for {selectedUser ? `User ${selectedUser.userId}` : 'user'}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select defaultValue={selectedUser?.roleAssignment.role.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="block mb-2">Permissions</Label>
              <div className="grid grid-cols-2 gap-2">
                {selectedUser?.roleAssignment.permissions.map((perm, i) => (
                  <div key={i} className="flex items-center">
                    <input type="checkbox" id={`perm-${i}`} defaultChecked className="mr-2" />
                    <Label htmlFor={`perm-${i}`} className="text-sm">{perm}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRole}>
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}