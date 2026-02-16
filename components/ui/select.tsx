import { cn } from '@/lib/utils';
import * as React from 'react';
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn('w-full rounded-md border border-input bg-white px-3 py-2 text-sm', props.className)} />;
}
