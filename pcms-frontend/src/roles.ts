export const roles = {
    ADMIN: 'admin',
    USER: 'user',
  };
  
  export const permissions = {
    VIEW_PLANS: 'view_plans',
    APPROVE_REGISTRATIONS: 'approve_registrations',
    APPROVE_REQUESTED_PLAN: 'approve_requested_plan',
  };
  
  export const rolePermissions = {
    [roles.ADMIN]: [
      permissions.VIEW_PLANS,
      permissions.APPROVE_REGISTRATIONS,
      permissions.APPROVE_REQUESTED_PLAN,
    ],
    [roles.USER]: [permissions.VIEW_PLANS],
  };