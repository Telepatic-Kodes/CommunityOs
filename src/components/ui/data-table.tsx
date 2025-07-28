import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Input } from './input';
import { ChevronDown, ChevronUp, Search, MoreHorizontal } from 'lucide-react';

export interface Column<T> {
  key: string;
  title: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchable?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  className?: string;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  searchable = false,
  sortable = false,
  pagination = false,
  className
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Filtrado
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Ordenamiento
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginación
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, pagination]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-5 w-5" />
    ) : (
      <ChevronDown className="h-5 w-5" />
    );
  };

  return (
    <Card variant="editorial" className={cn('font-serif', className)}>
      {(title || searchable) && (
        <CardHeader>
          <div className="flex items-center justify-between">
            {title && <CardTitle className="text-2xl">{title}</CardTitle>}
            {searchable && (
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 w-80 text-base font-serif"
                />
              </div>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-neutral-200 bg-neutral-50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'px-8 py-4 text-left text-sm font-bold text-neutral-800 uppercase tracking-wider font-serif', // MEJORADO: text-neutral-800 para mejor contraste
                      column.sortable && sortable && 'cursor-pointer hover:text-neutral-900 transition-colors duration-300',
                      column.width
                    )}
                    onClick={() => column.sortable && sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.title}</span>
                      {column.sortable && sortable && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
                <th className="px-8 py-4 text-left text-sm font-bold text-neutral-800 uppercase tracking-wider font-serif"> {/* MEJORADO: text-neutral-800 para mejor contraste */}
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-neutral-50 transition-colors duration-300">
                  {columns.map((column) => (
                    <td key={column.key} className="px-8 py-6 whitespace-nowrap text-base text-neutral-900 font-medium">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                  <td className="px-8 py-6 whitespace-nowrap text-base text-neutral-900">
                    <Button variant="ghost" size="lg" className="hover:bg-neutral-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {pagination && totalPages > 1 && (
          <div className="flex items-center justify-between px-8 py-6 border-t-2 border-neutral-200 bg-neutral-50">
            <div className="text-base text-neutral-600 font-medium">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, sortedData.length)} de {sortedData.length} resultados
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="font-serif"
              >
                Anterior
              </Button>
              <span className="text-base text-neutral-600 font-semibold">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="font-serif"
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { DataTable }; 