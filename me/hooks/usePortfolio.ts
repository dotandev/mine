import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { ComprehensiveData, ActivityStats, ContactInfo } from '@/types/portfolio';

export const useComprehensiveData = () => {
  const [data, setData] = useState<ComprehensiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getComprehensive();
        setData(response.data as ComprehensiveData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Error fetching comprehensive data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useActivityStats = () => {
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getActivityStats();
        setStats(response.data as ActivityStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
        console.error('Error fetching activity stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

export const useContactInfo = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getContact();
        setContact(response.data as ContactInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contact info');
        console.error('Error fetching contact info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  return { contact, loading, error };
};