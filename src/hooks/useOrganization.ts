import { useState, useEffect } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { getCurrentUserWithOrg, isAdmin, isOwner } from '@/lib/clerk';

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
        
        const { organization } = await getCurrentUserWithOrg();
        
        if (organization) {
          const [adminStatus, ownerStatus] = await Promise.all([
            isAdmin(),
            isOwner()
          ]);

          const data: OrganizationData = {
            id: organization.id,
            name: organization.name,
            slug: organization.slug,
            imageUrl: organization.imageUrl,
            isAdmin: adminStatus,
            isOwner: ownerStatus,
            memberCount: 0, // TODO: Obtener de la base de datos
            createdAt: organization.createdAt,
            updatedAt: organization.updatedAt,
            stats: {
              members: 156,
              events: 12,
              payments: 89,
              voting: 3
            }
          };
          
          setOrganizationData(data);
        } else {
          setOrganizationData(null);
        }
      } catch (error) {
        console.error('Error loading organization data:', error);
        setOrganizationData(null);
      } finally {
        setLoading(false);
      }
    };

    loadOrganizationData();
  }, []);

  return {
    organization: organizationData,
    loading,
    isMember: !!organizationData,
    isAdmin: organizationData?.isAdmin || false,
    isOwner: organizationData?.isOwner || false,
    memberCount: organizationData?.memberCount || 0,
  };
} 