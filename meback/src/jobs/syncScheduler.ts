import cron from 'node-cron';
import { DataSyncService } from '../services/DataSyncService';

export class SyncScheduler {
  private dataSyncService: DataSyncService;

  constructor() {
    this.dataSyncService = new DataSyncService();
  }

  start(): void {
    // Default: every 6 hours
    const cronExpression = process.env.GITHUB_SYNC_CRON || '0 */6 * * *';
    
    console.log(`📅 Scheduling GitHub data sync with cron: ${cronExpression}`);
    
    cron.schedule(cronExpression, async () => {
      console.log('🔄 Starting scheduled GitHub data sync...');
      
      try {
        await this.dataSyncService.syncAllData();
        console.log('✅ Scheduled sync completed successfully');
      } catch (error) {
        console.error('❌ Scheduled sync failed:', error);
      }
    }, {
      scheduled: true,
      timezone: 'UTC'
    });

    // Also run an initial sync on startup if data is stale
    this.initialSync();
  }

  private async initialSync(): Promise<void> {
    try {
      const isStale = await this.dataSyncService.isDataStale(1); // Check if data is older than 1 hour
      
      if (isStale) {
        console.log('🔄 Data is stale, running initial sync...');
        await this.dataSyncService.syncAllData();
        console.log('✅ Initial sync completed');
      } else {
        console.log('✅ Data is fresh, skipping initial sync');
      }
    } catch (error) {
      console.error('❌ Initial sync failed:', error);
    }
  }
}