import { useState, useEffect } from 'react';
import { useConfig } from '@/hooks/useConfig';

export interface OrganizationData {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  isAdmin: boolean;
  isOwner: boolean;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
  stats?: {
    members: number;
    events: number;
    payments: number;
    voting: number;
  };
}

export function useOrganization() {
  const { config } = useConfig();
  const [organizationData, setOrganizationData] = useState<OrganizationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrganizationData = async () => {
      try {
        setLoading(true);
        
        // Mock data para demo
        const data: OrganizationData = {
          id: 'org_123',
          name: config.organization.name,
          slug: 'demo-organization',
          imageUrl: '/api/placeholder/150/150',
          isAdmin: true,
          isOwner: true,
          memberCount: 1247,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-12-15T00:00:00Z',
          stats: {
            members: 1247,
            events: 45,
            payments: 89,
            voting: 12
          }
        };
        
        setOrganizationData(data);
      } catch (error) {
        console.error('Error loading organization data:', error);
        setOrganizationData(null);
      } finally {
        setLoading(false);
      }
    };

    loadOrganizationData();
  }, [config.organization.name]);

  return {
    organization: organizationData,
    loading,
    isMember: !!organizationData,
    isAdmin: organizationData?.isAdmin || false,
    isOwner: organizationData?.isOwner || false,
    memberCount: organizationData?.memberCount || 0,
  };
} 