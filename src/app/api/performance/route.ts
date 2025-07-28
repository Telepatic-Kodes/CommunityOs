import { NextRequest, NextResponse } from 'next/server';
import { PerformanceData } from '@/lib/performance';

export async function POST(request: NextRequest) {
  try {
    const performanceData: PerformanceData = await request.json();
    
    // Aquí puedes implementar el almacenamiento de métricas
    // Por ejemplo, en una base de datos, servicio de analytics, etc.
    
    console.log('📊 Performance Metric Received:', {
      timestamp: new Date(performanceData.timestamp).toISOString(),
      url: performanceData.url,
      metrics: performanceData.metrics,
      userAgent: performanceData.userAgent,
      connection: performanceData.connection,
      deviceMemory: performanceData.deviceMemory,
      hardwareConcurrency: performanceData.hardwareConcurrency,
    });

    // En producción, aquí guardarías las métricas en una base de datos
    // await savePerformanceMetrics(performanceData);

    return NextResponse.json({ 
      success: true, 
      message: 'Performance metric recorded successfully' 
    });
  } catch (error) {
    console.error('Error recording performance metric:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record performance metric' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Aquí puedes implementar la recuperación de métricas históricas
    const mockHistoricalData = {
      averageScore: 85,
      totalMetrics: 1250,
      last24Hours: 45,
      trends: {
        fcp: { current: 1200, previous: 1400, improvement: 14 },
        lcp: { current: 1800, previous: 2200, improvement: 18 },
        fid: { current: 45, previous: 65, improvement: 31 },
        cls: { current: 0.08, previous: 0.12, improvement: 33 },
      }
    };

    return NextResponse.json(mockHistoricalData);
  } catch (error) {
    console.error('Error retrieving performance data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve performance data' },
      { status: 500 }
    );
  }
} 