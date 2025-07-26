'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

interface NotificationBellProps {
  unreadCount?: number;
  onClick?: () => void;
}

export function NotificationBell({ unreadCount = 0, onClick }: NotificationBellProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="relative p-2"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
} 